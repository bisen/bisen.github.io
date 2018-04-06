var element_json = {};
var graph_data = {};
var node_info = {};

const request = async () => {
  const graph_data_response = await fetch('./data/studies.json');
  graph_data = await graph_data_response.json();

  const node_info_response = await fetch('./data/node_info.json');
  node_info = await node_info_response.json();

  const elements_response = await fetch('./data/elements.json');
  elements = await elements_response.json();

  var cy = cytoscape({
    container: document.getElementById('cy'), // container to render in
  });

  //state variables
  var prev_node = null;
  var node = null;
  var ow = [ '0', '1' ];
  var type = 'all';
  var outcome = [ 'cure', 'improvement', 'satisfaction' ];

  const update_nodes = () => {
    var new_nodes = [];
    var new_edges = [];
    console.log(type);
    jQuery.each(outcome, function() {
      var o = this;
      jQuery.each(ow, function() {
        var w = this;
        new_nodes = new_nodes.concat(elements[type][w][o]['nodes']);
        new_edges = new_edges.concat(elements[type][w][o]['edges']);
      });
    });
    cy.json( { elements: { nodes: new_nodes, edges: new_edges }, style: elements['style'] } );
  }
  cy.json(node_info['all']);
  update_nodes();

  const get_studies_2 = ( node1, node2 ) => {
    node1_id = node1.id();
    node2_id = node2.id();
    var study_list = [];
    jQuery.each(graph_data, function() {
      if ((this['coarse_trt_code1'] == node1_id &&
        this['coarse_trt_code2'] == node2_id) ||
        (this['coarse_trt_code1'] == node2_id &&
        this['coarse_trt_code2'] == node1_id )) {
          study_list.push(this);
      }
    });
    return study_list;
  }

  const get_studies_1 = ( node ) => {
    node_id = node.id();
    var study_list = [];
    jQuery.each(graph_data, function() {
      if ( this['coarse_trt_code1'] == node_id ||
        this['coarse_trt_code2'] == node_id ) {
          study_list.push(this);
      }
    });
    return study_list;
  }



  cy.on('tap', 'node', function(e) {
    if ( e.target == prev_node ) {
      prev_node.removeClass('highlight');
      prev_node = null;
      return;
    }

    if ( e.target == node ) {
      node.removeClass('highlight');
      node = prev_node;
      prev_node = null;
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
  });


  $('#type-form input').on('change', function() {
    node = null;
    prev_node = null;

    switch($('input[name=type-radio]:checked', '#type-form').val()) {
      case 'stress-ui':
        type = 'stress';
      break;

      case 'urge-ui':
        type = 'urge';
      break;

      default:
        type = 'all';
    }
    update_nodes();
  });

  $('#ow-form input').on('change', function() {
    node = null;
    prev_node = null;

    switch($('input[name=ow-radio]:checked', '#ow-form').val()) {
      case 'older-women':
        ow = ['1'];
      break;

      default:
        ow = ['0', '1'];
    }
    update_nodes();
  });

  const handleOutcome = ( value ) => {
    console.log(value);
  }

  $('input[name=outcome-checkbox]').change(
    function(){
      if ($(this).is(':checked')) {
        outcome.push($(this).val());
      } else {
        outcome.splice(outcome.indexOf($(this).val()),1);
      }
      if (outcome.length > 1) {
        $('#summary-button').attr('disabled', true); 
        $('#absolute-effects-button').attr('disabled', true); 
        $('#relative-effects-button').attr('disabled', true); 
      } else {
        $('#summary-button').attr('disabled', false); 
        $('#absolute-effects-button').attr('disabled', false); 
        $('#relative-effects-button').attr('disabled', false); 
      }
      update_nodes();
    });

  //button that pulls the studies for nodes
  $('#get-studies-button').on('click', function() {
    var study_list;
    if (prev_node == null) {
      study_list = get_studies_1(node);
    } else {
      study_list = get_studies_2(prev_node, node);
    }

    $('#studies-modal-content').empty();
    content = "<table>";
    content += "<tr>";
    content += "<th> PMID </th>";
    content += "<th> Study_Author </th>";
    content += "<th> Year </th>";
    content += "<th> Age </th>";
    content += "<th> Older_women </th>";
    content += "<th> UI_type </th>";
    content += "<th> followup </th>";
    content += "<th> n1 </th>";
    content += "<th> n2 </th>";
    content += "<th> N1 </th>";
    content += "<th> N2 </th>";
    content += "<th> granular_trt_code1 </th>";
    content += "<th> granular_trt_code2 </th>";
    content += "<th> coarse_trt_code1 </th>";
    content += "<th> coarse_trt_code2 </th>";
    content += "<th> trt_description1 </th>";
    content += "<th> trt_description2 </th>";
    content += "<th> OR12 </th>";
    content += "<th> OR21 </th>";
    content += "<th> Outcome </th>";
    content += "<th> combined </th>";
    content += "<th> Blinding_of_Patients </th>";
    content += "<th> Blinding_of_Assessors </th>";
    content += "<th> Intention_to_Treat </th>";
    content += "<th> Attrition_Bias </th>";
    content += "<th> Selection_Bias </th>";
    content += "<th> Interventions_Described </th>";
    content += "<th> Intervention_Compliance </th>";
    content += "<th> Other_Issues </th>";
    content += "<th> Allocation_Concealment </th>";
    content += "</tr>";
    jQuery.each(study_list, function() {
      content += '<tr>';
      content += '<td>' + this['PMID'] + '</td>';
      content += '<td>' + this['Study_Author'] + '</td>';
      content += '<td>' + this['Year'] + '</td>';
      content += '<td>' + this['Age'] + '</td>';
      content += '<td>' + this['Older_women'] + '</td>';
      content += '<td>' + this['UI_type'] + '</td>';
      content += '<td>' + this['followup'] + '</td>';
      content += '<td>' + this['n1'] + '</td>';
      content += '<td>' + this['n2'] + '</td>';
      content += '<td>' + this['N1'] + '</td>';
      content += '<td>' + this['N2'] + '</td>';
      content += '<td>' + this['granular_trt_code1'] + '</td>';
      content += '<td>' + this['granular_trt_code2'] + '</td>';
      content += '<td>' + this['coarse_trt_code1'] + '</td>';
      content += '<td>' + this['coarse_trt_code2'] + '</td>';
      content += '<td>' + this['trt_description1'] + '</td>';
      content += '<td>' + this['trt_description2'] + '</td>';
      content += '<td>' + this['OR12'] + '</td>';
      content += '<td>' + this['OR21'] + '</td>';
      content += '<td>' + this['Outcome'] + '</td>';
      content += '<td>' + this['combined'] + '</td>';
      content += '<td>' + this['Randomization_Sequence'] + '</td>';
      content += '<td>' + this['Blinding_of_Assessors'] + '</td>';
      content += '<td>' + this['Intention_to_Treat'] + '</td>';
      content += '<td>' + this['Attrition_Bias'] + '</td>';
      content += '<td>' + this['Selection_Bias'] + '</td>';
      content += '<td>' + this['Interventions_Described'] + '</td>';
      content += '<td>' + this['Intervention_Compliance'] + '</td>';
      content += '<td>' + this['Other_Issues'] + '</td>';
      content += '<td>' + this['Allocation_Concealment'] + '</td>';
      content += '</tr>';
    });
    content += '</table>';
    $('#studies-modal-content').append(content);
    $('#cy').hide();
    $('#navbar').hide();
    $('#sidebar').hide();
    $('#legend').hide();
    $('#studies-modal').show();
  });
  $('#close-studies-modal').on('click', function() {
    $('#cy').show();
    $('#navbar').show();
    $('#sidebar').show();
    $('#legend').show();
    $('#studies-modal').hide();
  });
  $('#key-messages-button').on('click', function() {
    $('#cy').hide();
    $('#navbar').hide();
    $('#sidebar').hide();
    $('#legend').hide();
    $('#key-messages').show();
  });
  $('#close-key-messages').on('click', function() {
    $('#cy').show();
    $('#navbar').show();
    $('#sidebar').show();
    $('#legend').show();
    $('#key-messages').hide();
  });
  $('#overview-button').on('click', function() {
    $('#cy').hide();
    $('#navbar').hide();
    $('#sidebar').hide();
    $('#legend').hide();
    $('#overview-dummy').show();
  });
  $('#close-overview').on('click', function() {
    $('#cy').show();
    $('#navbar').show();
    $('#sidebar').show();
    $('#legend').show();
    $('#overview-dummy').hide();
  });
}

request();
