#!/Users/jensjap/.rbenv/shims/ruby -w

require 'rubygems'
require 'bundler/setup'
require 'rubyXL'
require 'json'

# CONSTANTS
PATH_INPUT  = './data/Dataset Shell.xlsx'
PATH_OUTPUT = './data/output.json'

# Excel workbook
wb = RubyXL::Parser.parse(PATH_INPUT)

# Worksheet
ws = wb['Sheet1'] || wb[0]  # Grab worksheet named 'Sheet1' or first worksheet in workbook.

# List of column headers
header_row = ws[0]  # Array of column headers.
lsof_headers = header_row.cells.map(&:value)

# Iterate over data rows and build elements array
elements = { nodes: [], edges: [] }
ws[1..-1].each do |row|
  source = ''
  target = ''

  # Nodes
  lsof_headers.each_with_index do |title, idx|
    case title
    when 'coarse_trt_code1'
      source = row.cells[idx].value
      elements[:nodes] << { data: { id: source, color: '#fee4c6' } }
    when 'coarse_trt_code2'
      target = row.cells[idx].value
      elements[:nodes] << { data: { id: target, color: '#fee4c6' } }
    end
  end

  # Edges
  elements[:edges] << { data: { id: "#{source}-#{target}", source: source, target: target } }
end

File.open(PATH_OUTPUT,"w") do |f|
  f.write(elements.to_json)
end
