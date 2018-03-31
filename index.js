/*

var eles = fetch('./data/sample.json')
.then(response => {
  if (response.status !== 200) {
    throw response.status;
  }
  return response.json();
})
.then(file_content => {
  console.log(file_content);
})

*/

var element_json = {};
var graph_data = {};
var node_info = {};

const request = async () => {
  const elements_response = await fetch('./data/elements.json');
  element_json = await elements_response.json();

  const graph_data_response = await fetch('./data/dataset_shell.json');
  graph_data = await graph_data_response.json();

  const node_info_response = await fetch('./data/node_info.json');
  node_info = await node_info_response.json();

  console.log(element_json);
  console.log(node_info);

var cy = cytoscape({
  container: document.getElementById('cy'), // container to render in

  //elements: fetch('./data/sample.json').then(response => {
  elements: element_json['all'],

  style: [ // the stylesheet for the graph
    {
      selector: 'node',
      style: {
        'background-color': 'data(color)',
        'label': 'data(id)'
      }
    },
    {
      selector: 'node.highlight',
      style: {
        'border-color': '#DC143C',
        'border-width': '5px'
      }
    },
    {
      selector: 'edge',
      style: {
        'width': 1,
        'line-color': 'red',
        'target-arrow-color': '#ccc',
        'target-arrow-shape': 'none',
        'curve-style': 'unbundled-bezier',
        'control-point-distance': '30px',
        'control-point-weight': '0.5'
      }
    }
  ],

  layout: {
    //name: 'preset'
    name: 'grid'
  }

});



var prev_node;
var node;
var selected

cy.on('tap', 'node', function(e) {
  if( typeof prev_node !== 'undefined' ) {
    prev_node.removeClass('highlight');
  }
  prev_node = node;
  node = e.target;
  if( typeof node !== 'undefined' ) {
    node.addClass('highlight');
  }
  console.log(node);
  console.log(prev_node);
});


$('#outcome-form input').on('change', function() {
  console.log($('input[name=outcome-radio]:checked', '#outcome-form').val());
  cy.autolock(false);
  cy.elements().remove();
  switch($('input[name=outcome-radio]:checked', '#outcome-form').val()) {
    case 'stress-ui':
      console.log(element_json['stress']);
      cy.add(element_json['stress']);
    break;

    case 'urge-ui':
      cy.add(element_json['urge']);
    break;

    case 'older-women':
      cy.add(element_json['older_women']);
    break;

    default:
      cy.add(element_json['all']);
  }
  
  //position nodes
  cy.nodes().positions( function( node, i ) {
    return { x: node_info[node.id()]["x"], y: node_info[node.id()]["y"] }; 
  });

  //lock node positions
  cy.autolock(true);
});

//position nodes
cy.nodes().positions( function( node, i ) {
  return { x: node_info[node.id()]["x"], y: node_info[node.id()]["y"] }; 
});

//lock node positions
cy.autolock(true);
}

request();
