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

# Color dictionary to hold my node colors
color_dict = {
  'H+N+T' => '#e0dfe0',
  'H+T' => '#fee4c6',
  'B' => '#fedabb',
  'C' => '#fff595',
  'C+T' => '#ccb28d',
  'C+U' => '#808000',
  'C+H' => '#cdcdb5',
  'H' => '#ffeb91',
  'A' => '#cbf978',
  'P' => '#fdaeba',
  'V' => '#dca2dc',
  'N' => '#9bfdfe',
  'U' => '#dbd1d4',
  'T' => '#d2eeee',
  'N+T' => '#a5d4ec'
}

#position_dict
position_dict = {
  "H+N+T" => {"x" => -100, "y" => -440 },
  "H+T" => {"x" => -180, "y" => -420 },
  "B" => {"x" => -20, "y" => -400 },
  "C" => {"x" => 200, "y" => -320 },
  "C+T" => {"x" => 410, "y" => -280 },
  "C+U" => {"x" => -300, "y" => -350 },
  "C+H" => {"x" => -360, "y" => -360 },
  "H" => {"x" => -280, "y" => -300 },
  "A" => {"x" => -420, "y" => 10 },
  "P" => {"x" => 0, "y" => 0 },
  "V" => {"x" => 420, "y" => 10 },
  "N" => {"x" => -400, "y" => 120 },
  "U" => {"x" => 380, "y" => 100 },
  "T" => {"x" => -160, "y" => 200 },
  "N+T" => {"x" => -360, "y" => 28 }
}

# Iterate over data rows and build elements array
element_dict = {}
for name in [ 'all', 'stress', 'UI' ]
  element_dict[name] = {}
  for ow in [ 1, 0 ]
    element_dict[name][ow] = { 'cure' => { nodes: [], edges: [] },
                               'improvement' => { nodes: [], edges: [] },
                               'satisfaction' => { nodes: [], edges: [] } }
  end
end

ws[1..-1].each do |row|
  source = ''
  target = ''
  type = ''
  older_women = ''
  outcome = ''

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
      when 'Outcome'
        outcome = row.cells[idx].value
    end
  end

  if type != ''
    element_dict[type][older_women][outcome][:nodes] << { data: { id: target, color: color_dict[target], position: position_dict[target] } }
    element_dict[type][older_women][outcome][:nodes] << { data: { id: source, color: color_dict[source], position: position_dict[source] } }
    element_dict[type][older_women][outcome][:edges] << { data: { id: "#{source}-#{target}", source: source, target: target } }
  end

  #all
  element_dict['all'][older_women][outcome][:nodes] << { data: { id: target, color: color_dict[target], position: position_dict[source] } }
  element_dict['all'][older_women][outcome][:nodes] << { data: { id: source, color: color_dict[source], position: position_dict[source] } }
  element_dict['all'][older_women][outcome][:edges] << { data: { id: "#{source}-#{target}", source: source, target: target } }
end

#deduplicate edges and nodes
for name in [ 'all', 'stress', 'UI' ]
  for ow in [ 1, 0 ]
    if !element_dict[name][ow][:nodes].nil?
      element_dict[name][ow][:nodes] = element_dict[name][ow][:nodes].uniq 
      element_dict[name][ow][:edges] = element_dict[name][ow][:edges].uniq 
    end
  end
end

File.open(PATH_OUTPUT,"w") do |f|
  f.write(element_dict.to_json)
end
