#!/Users/jensjap/.rbenv/shims/ruby -w

require 'rubygems'
require 'bundler/setup'
require 'rubyXL'
require 'json'
require 'byebug'

# CONSTANTS
PATH_INPUT  = './data/Dataset Shell.xlsx'
PATH_OUTPUT = './data/elements.json'

# Excel workbook
wb = RubyXL::Parser.parse(PATH_INPUT)

# Worksheet
ws = wb['Sheet1'] || wb[0]  # Grab worksheet named 'Sheet1' or first worksheet in workbook.

# List of column headers
header_row = ws[0]  # Array of column headers.
lsof_headers = header_row.cells.map(&:value)

#this stupid dict maps column titles to my preferred dictionary keys
stupid_dict = { '' => :all, 'stress' => :stress, 'UI' => :urge}

# Color dictionary to hold my node colors
color_dict = { :all => '#0000FF', 
               :stress =>  '#8A2BE2', 
               :urge =>  '#7FFF00', 
               :older_women =>  '#00FFFF' }

# Iterate over data rows and build elements array
element_dict = {}
for name in [ :all, :stress, :urge, :older_women ]
  element_dict[name] = { nodes: [], edges: [] }
end

ws[1..-1].each do |row|
  source = ''
  target = ''
  type = ''
  older_women = ''

  #collect the info from rows
  lsof_headers.each_with_index do |title, idx|
    case title
      when 'Older women'
        older_women = row.cells[idx].value
      when 'UI type'
        if !row.cells[idx].nil?
          type = row.cells[idx].value
        end
      when 'coarse_trt_code1'
        source = row.cells[idx].value
      when 'coarse_trt_code2'
        target = row.cells[idx].value
    end
  end

  type_key = stupid_dict[type]

  if !type_key.nil?
    element_dict[type_key][:nodes] << { data: { id: target, color: color_dict[type_key] } }
    element_dict[type_key][:nodes] << { data: { id: source, color: color_dict[type_key] } }
    element_dict[type_key][:edges] << { data: { id: "#{source}-#{target}", source: source, target: target } }
  end

  if older_women == 1
    element_dict[:older_women][:nodes] << { data: { id: target, color: color_dict[:older_women] } }
    element_dict[:older_women][:nodes] << { data: { id: source, color: color_dict[:older_women] } }
    element_dict[:older_women][:edges] << { data: { id: "#{source}-#{target}", source: source, target: target } }
  end
end

#deduplicate edges and nodes
element_dict.each do |key, elements|
  elements[:nodes] = elements[:nodes].uniq
  elements[:edges] = elements[:edges].uniq
end

File.open(PATH_OUTPUT,"w") do |f|
  f.write(element_dict.to_json)
end
