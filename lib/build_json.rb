#!/Users/jensjap/.rbenv/shims/ruby -w

require 'rubygems'
require 'bundler/setup'
require 'rubyXL'
require 'json'
require 'byebug'

# CONSTANTS
PATH_COORDINATES = './data/coordinates_coarse.json'
PATH_INPUT  = './data/NMA_Tool.xlsx'
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
  'N+T' => '#a5d4ec',
  'E' => '#b77597'
}

#position_hash
p_list = JSON.parse(File.read(PATH_COORDINATES))
position_dict = {}
for p in p_list
  position_dict[ p["id"] ] = { "x" => 300*p["X"].to_f, "y" => 300*p["Y"].to_f }
end

#position_dict = {
#  "H+N+T" => {"x" => -100, "y" => -440 },
#  "H+T" => {"x" => -180, "y" => -420 },
#  "B" => {"x" => -20, "y" => -400 },
#  "C" => {"x" => 200, "y" => -320 },
#  "C+T" => {"x" => 410, "y" => -280 },
#  "C+U" => {"x" => -300, "y" => -350 },
#  "C+H" => {"x" => -360, "y" => -360 },
#  "H" => {"x" => -280, "y" => -300 },
#  "A" => {"x" => -420, "y" => 10 },
#  "P" => {"x" => 0, "y" => 0 },
#  "V" => {"x" => 420, "y" => 10 },
#  "N" => {"x" => -400, "y" => 120 },
#  "U" => {"x" => 380, "y" => 100 },
#  "T" => {"x" => -160, "y" => 200 },
#  "N+T" => {"x" => -360, "y" => 28 }
#}

# Iterate over data rows and build elements array
element_dict = {}
for type in [ 'all', 'stress', 'urge' ]
  element_dict[type] = {}
  for ow in [ 1, 0 ]
    element_dict[type][ow] = {}
    for outcome in ['cure', 'improvement', 'satisfaction', 'ui', 'QoL']
      element_dict[type][ow][outcome] = { nodes: [], edges: [] }
    end
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
      when 'Older_women'
        older_women = row.cells[idx].value
      when 'UI_type'
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

  if source > target
    temp = target
    target = source
    source = temp
  end

  if type != 0
    element_dict[type][older_women][outcome][:nodes] << { data: { id: target, color: color_dict[target] }, position: position_dict[target] }
    element_dict[type][older_women][outcome][:nodes] << { data: { id: source, color: color_dict[source] }, position: position_dict[source] }
    if target != source then element_dict[type][older_women][outcome][:edges] << { data: { id: "#{source}-#{target}", source: source, target: target } } end
  end

  #all
  element_dict['all'][older_women][outcome][:nodes] << { data: { id: target, color: color_dict[target] }, position: position_dict[target] }
  element_dict['all'][older_women][outcome][:nodes] << { data: { id: source, color: color_dict[source] }, position: position_dict[source] }
  if target != source then element_dict['all'][older_women][outcome][:edges] << { data: { id: "#{source}-#{target}", source: source, target: target } } end
end

#deduplicate edges and nodes
for type in [ 'all', 'stress', 'urge' ]
  for ow in [ 1, 0 ]
    for outcome in ['cure', 'improvement', 'satisfaction', 'ui', 'QoL' ]
      if !element_dict[type][ow][outcome][:nodes].nil?
          element_dict[type][ow][outcome][:nodes] = element_dict[type][ow][outcome][:nodes].uniq
          element_dict[type][ow][outcome][:edges] = element_dict[type][ow][outcome][:edges].uniq 
      end
    end
  end
end

element_dict['options'] = { "style": [
    {
      "selector": "node",
      "style": {
        "background-color": "data(color)",
        "label": "data(id)"
      }
    },
    {
      "selector": "node.highlight",
      "style": {
        "border-color": "#DC143C",
        "border-width": "5px"
      }
    },
    {
      "selector": "edge",
      "style": {
        "width": "1px",
        "line-color": "black",
        "target-arrow-color": "#ccc",
        "target-arrow-shape": "none",
        "curve-style": "unbundled-bezier",
        "control-point-distances": "30",
        "control-point-weights": "0.5"
      }
    }
  ],
  "zoomingEnabled": true,
  "userZoomingEnabled": true,
  "zoom": 0.8,
  "minZoom": 1e-50,
  "maxZoom": 1e+50,
  "panningEnabled": true,
  "userPanningEnabled": true,
  "pan": {
    "x": 400,
    "y": 350
  },
  "boxSelectionEnabled": true,
  "renderer": {
    "name": "canvas"
  }
}

File.open(PATH_OUTPUT,"w") do |f|
  f.write(element_dict.to_json)
end
