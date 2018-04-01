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
    //initial viewport

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
          'line-color': 'black',
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
      zoom: 0.8,
      pan: { x: 400, y: 350 },
      name: 'grid'
    }

  });

  //helper method for repositioning nodes
  const reposition = () => {
    //position nodes
    cy.nodes().positions( function( node, i ) {
      return { x: node_info[node.id()]["x"], y: node_info[node.id()]["y"] };
    });

    //lock node positions
    cy.autolock(true);
  }

  const get_studies = ( node1, node2 ) => {
    node1_id = node1.id();
    node2_id = node2.id();
    pmid_list = [];
    jQuery.each(graph_data, function() {
      if ( this['coarse_trt_code1'] == node1_id ||
        this['coarse_trt_code2'] == node1_id ||
        this['coarse_trt_code1'] == node2_id ||
        this['coarse_trt_code2'] == node2_id ) {
          console.log('node1', node1_id);
          console.log('node2', node2_id);
          console.log('study_node1', this['coarse_trt_code1']);
          console.log('study_node2', this['coarse_trt_code2']);
          console.log(this['PMID']);
      }
    });
  }

  var prev_node = null;
  var node = null;

  cy.on('tap', 'node', function(e) {
    if ( e.target == prev_node ) {
      prev_node.removeClass('highlight');
      prev_node = null;
      console.log("node: ", node);
      console.log("prev_node: ", prev_node);
      return;
    }

    if ( e.target == node ) {
      node.removeClass('highlight');
      node = prev_node;
      prev_node = null;
      console.log("node: ", node);
      console.log("prev_node: ", prev_node);
      return;
    }

    if ( prev_node !== null ) {
      prev_node.removeClass('highlight');
    }

    prev_node = node;
    node = e.target;

    if ( node !== null ) {
      node.addClass('highlight');
    }

    console.log("node: ", node);
    console.log("prev_node: ", prev_node);
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
    reposition();
  });

  //button that pulls the studies for nodes
  $('#get-studies-button').on('click', function() {
    get_studies(prev_node, node);
  });
  reposition();
}

request();
