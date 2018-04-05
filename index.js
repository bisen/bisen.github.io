var element_json = {};
var graph_data = {};
var node_info = {};

const request = async () => {
  const graph_data_response = await fetch('./data/dataset_shell.json');
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
      if ( this['coarse_trt_code1'] == node1_id ||
        this['coarse_trt_code2'] == node1_id ||
        this['coarse_trt_code1'] == node2_id ||
        this['coarse_trt_code2'] == node2_id ) {
          study_list.push(this);
      }
    });
    $('#cy').hide();
    $('#navbar').hide();
    $('#studies-modal').show();
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
    $('#cy').hide();
    $('#navbar').hide();
    $('#studies-modal').show();
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
      update_nodes();
    });

  //button that pulls the studies for nodes
  $('#get-studies-button').on('click', function() {
    var study_list
    if (prev_node == null) {
      study_list = get_studies_1(node);
    } else {
      study_list = get_studies_2(prev_node, node);
    }

    $('#studies-modal-content').empty();
    content = "<table>"
    content += "<tr>";
    content += "<th> PMID </th>";
    content += "<th> Study Author </th>";
    content += "<th> Year </th>";
    content += "<th> Age </th>";
    content += "<th> Older women </th>";
    content += "<th> UI type </th>";
    content += "<th> dose1 </th>";
    content += "<th> dose2 </th>";
    content += "<th> followup </th>";
    content += "<th> n1 </th>";
    content += "<th> n2 </th>";
    content += "<th> granular_trt_code1 </th>";
    content += "<th> granular_trt_code2 </th>";
    content += "<th> coarse_trt_code1 </th>";
    content += "<th> coarse_trt_code2 </th>";
    content += "<th> trt_description1 </th>";
    content += "<th> trt_description2 </th>";
    content += "<th> OR12 </th>";
    content += "<th> OR21 </th>";
    content += "<th> Outcome </th>";
    content += "<th> Adequate generation of a randomized sequence </th>";
    content += "<th> Allocation concealment </th>";
    content += "<th> Blinding of patients </th>";
    content += "<th> Blinding of outcome assessors (or \"double blind\") </th>";
    content += "<th> Intention-to-treat-analysis </th>";
    content += "<th> Incomplete results data (attrition bias) </th>";
    content += "<th> Group similarity at baseline (selection bias) </th>";
    content += "<th> Were interventions adequately described? </th>";
    content += "<th> Compliance with interventions </th>";
    content += "<th> Other issues </th>";
    content += "</tr>";
    jQuery.each(study_list, function() {
      content += '<tr>';
      content += '<td>' + this['PMID'] + '</td>';
      content += '<td>' + this['Study Author'] + '</td>';
      content += '<td>' + this['Year'] + '</td>';
      content += '<td>' + this['Age'] + '</td>';
      content += '<td>' + this['Older women'] + '</td>';
      content += '<td>' + this['UI type'] + '</td>';
      content += '<td>' + this['dose1'] + '</td>';
      content += '<td>' + this['dose2'] + '</td>';
      content += '<td>' + this['followup'] + '</td>';
      content += '<td>' + this['n1'] + '</td>';
      content += '<td>' + this['n2'] + '</td>';
      content += '<td>' + this['granular_trt_code1'] + '</td>';
      content += '<td>' + this['granular_trt_code2'] + '</td>';
      content += '<td>' + this['coarse_trt_code1'] + '</td>';
      content += '<td>' + this['coarse_trt_code2'] + '</td>';
      content += '<td>' + this['trt_description1'] + '</td>';
      content += '<td>' + this['trt_description2'] + '</td>';
      content += '<td>' + this['OR12'] + '</td>';
      content += '<td>' + this['OR21'] + '</td>';
      content += '<td>' + this['Outcome'] + '</td>';
      content += '<td>' + this['Adequate generation of a randomized sequence'] + '</td>';
      content += '<td>' + this['Allocation concealment'] + '</td>';
      content += '<td>' + this['Blinding of patients'] + '</td>';
      content += '<td>' + this['Blinding of outcome assessors (or \"double blind\"'] + '</td>';
      content += '<td>' + this['Intention-to-treat-analysis'] + '</td>';
      content += '<td>' + this['Incomplete results data (attrition bias)'] + '</td>';
      content += '<td>' + this['Group similarity at baseline (selection bias)'] + '</td>';
      content += '<td>' + this['Were interventions adequately described?'] + '</td>';
      content += '<td>' + this['Compliance with interventions'] + '</td>';
      content += '<td>' + this['Other issues'] + '</td>';
      content += '</tr>';
    });
    content += '</table>';
    $('#studies-modal-content').append(content);
  });
  $('#close-studies-modal').on('click', function() {
    $('#cy').show();
    $('#navbar').show();
    $('#studies-modal').hide();
  });
}

request();
