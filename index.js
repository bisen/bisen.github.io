var element_json = {};
var graph_data = {};
var node_info = {};
var relative_effectiveness_dict = { 'all': {}, 'stress': {}, 'urge': {}, 'ow': {} };
var league_dict = { 'all': {}, 'stress': {}, 'urge': {}, 'ow': {} };
var guide_page_3;
var guide_page_4;

const request = async () => {
  var response = await fetch('./data/studies.json');
  graph_data = await response.json();

  response = await fetch('./data/style.json');
  node_info = await response.json();

  response = await fetch('./data/elements.json');
  elements = await response.json();

  //get relative effectiveness tables
  response = await fetch('./data/tables/relative-cure.html');
  relative_effectiveness_dict['all']['cure'] = await response.text();

  response = await fetch('./data/tables/relative-improvement.html');
  relative_effectiveness_dict['all']['improvement'] = await response.text();

  response = await fetch('./data/tables/relative-satisfaction.html');
  relative_effectiveness_dict['all']['satisfaction'] = await response.text();

  response = await fetch('./data/tables/relative-cure-stress.html');
  relative_effectiveness_dict['stress']['cure'] = await response.text();

  response = await fetch('./data/tables/relative-cure-urge.html');
  relative_effectiveness_dict['urge']['cure'] = await response.text();

  response = await fetch('./data/tables/relative-cure-ow.html');
  relative_effectiveness_dict['ow']['cure'] = await response.text();

  response = await fetch('./data/tables/relative-improvement-stress.html');
  relative_effectiveness_dict['stress']['improvement'] = await response.text();

  response = await fetch('./data/tables/relative-improvement-urge.html');
  relative_effectiveness_dict['urge']['improvement'] = await response.text();

  response = await fetch('./data/tables/relative-improvement-ow.html');
  relative_effectiveness_dict['ow']['improvement'] = await response.text();

  response = await fetch('./data/tables/relative-satisfaction-stress.html');
  relative_effectiveness_dict['all']['satisfaction'] = await response.text();

  response = await fetch('./data/tables/relative-satisfaction-urge.html');
  relative_effectiveness_dict['urge']['satisfaction'] = await response.text();

  response = await fetch('./data/tables/relative-satisfaction-ow.html');
  relative_effectiveness_dict['ow']['satisfaction'] = await response.text();

  //get league tables
  response = await fetch('./data/tables/league-cure.html');
  league_dict['all']['cure'] = await response.text();

  response = await fetch('./data/tables/league-improvement.html');
  league_dict['all']['improvement'] = await response.text();

  response = await fetch('./data/tables/league-satisfaction.html');
  league_dict['all']['satisfaction'] = await response.text();

  response = await fetch('./data/tables/league-cure-stress.html');
  league_dict['stress']['cure'] = await response.text();

  response = await fetch('./data/tables/league-cure-urge.html');
  league_dict['urge']['cure'] = await response.text();

  response = await fetch('./data/tables/league-cure-ow.html');
  league_dict['ow']['cure'] = await response.text();

  response = await fetch('./data/tables/league-improvement-stress.html');
  league_dict['stress']['improvement'] = await response.text();

  response = await fetch('./data/tables/league-improvement-urge.html');
  league_dict['urge']['improvement'] = await response.text();

  response = await fetch('./data/tables/league-improvement-ow.html');
  league_dict['ow']['improvement'] = await response.text();

  response = await fetch('./data/tables/league-satisfaction-stress.html');
  league_dict['all']['satisfaction'] = await response.text();

  response = await fetch('./data/tables/league-satisfaction-urge.html');
  league_dict['urge']['satisfaction'] = await response.text();

  response = await fetch('./data/tables/league-satisfaction-ow.html');
  league_dict['ow']['satisfaction'] = await response.text();

  // tables forguide pages
  response = await fetch('./data/tables/TO1-guide-page-3.html');
  guide_page_3 = await response.text();

  response = await fetch('./data/tables/TO1-guide-page-4.html');
  guide_page_4 = await response.text();
  

  var cy = cytoscape({
    container: document.getElementById('cy'), // container to render in
  });

  //state variables
  var prev_node = null;
  var node = null;
  var ow = [ '0', '1' ];
  var type = 'all';
  var outcome = [ 'cure', 'improvement', 'satisfaction' ];

  //update cy elements from the elements dictionary
  const update_nodes = () => {
    var new_nodes = [];
    var new_edges = [];
    jQuery.each(outcome, function() {
      var o = this;
      jQuery.each(ow, function() {
        var w = this;
        new_nodes = new_nodes.concat(elements[type][w][o]['nodes']);
        new_edges = new_edges.concat(elements[type][w][o]['edges']);
      });
    });
    cy.json( { elements: { nodes: new_nodes, edges: new_edges } } );
  }
  cy.json(node_info);
  update_nodes();

  //returns the studies for 2 nodes
  const get_studies_2 = ( node1, node2 ) => {
    a_dict = { "stress": ["sui"], "urge": ["uui"], "all": ["sui","uui","0"] }
    node1_id = node1.id();
    node2_id = node2.id();
    var study_list = [];
    jQuery.each(graph_data, function() {
      if ((this['coarse_trt_code1'] == node1_id &&
        this['coarse_trt_code2'] == node2_id) ||
        (this['coarse_trt_code1'] == node2_id &&
        this['coarse_trt_code2'] == node1_id) &&
        ( a_dict[type].indexOf(this['ui_type'].toString()) >= 0 ) &&
        ( ow.indexOf(this['older_women'].toString()) >= 0 ) &&
        ( outcome.indexOf(this['outcome'].toString()) >= 0 )) {
          study_list.push(this);
      }
    });
    return study_list;
  }

  //returns the studies for a single node
  const get_studies_1 = ( node ) => {
    a_dict = { "stress": ["sui"], "urge": ["uui"], "all": ["sui","uui","0"] }
    node_id = node.id();
    var study_list = [];
    jQuery.each(graph_data, function() {
      if (( this['coarse_trt_code1'] == node_id ||
        this['coarse_trt_code2'] == node_id ) &&
        ( a_dict[type].indexOf(this['ui_type'].toString()) >= 0 ) &&
        ( ow.indexOf(this['older_women'].toString()) >= 0 ) &&
        ( outcome.indexOf(this['outcome'].toString()) >= 0 )) {
          study_list.push(this);
      }    });
    return study_list;
  }

  //returns the studies for the whole graph
  const get_studies_0 = () => {
    a_dict = { "stress": ["sui"], "urge": ["uui"], "all": ["sui","uui","0"] }
    var study_list = [];
    jQuery.each(graph_data, function() {
      if (( a_dict[type].indexOf(this['ui_type'].toString()) >= 0 ) &&
        ( ow.indexOf(this['older_women'].toString()) >= 0 ) &&
        ( outcome.indexOf(this['outcome'].toString()) >= 0 )) {
          study_list.push(this);
      }else{
        console.log(this);
      }
    });
    console.log(graph_data.length, study_list.length);
    return study_list;
  }

  //get guide working
  const guide_1 = () => {
    window.location.hash = '#guide';
    $('#cy').hide();
    $('#navbar').hide();
    $('#sidebar').hide();
    $('#legend').hide();
    $('#guide-page-1').show();
    $('#guide-page-2').hide();
    $('#guide-page-3').hide();
    $('#guide-page-4').hide();
    $('#guide-modal').show();
  }

  const guide_2 = () => {
    $('#guide-page-1').hide();
    $('#guide-page-2').show();
  }

  const guide_3 = () => {
    $('#guide-page-2').hide();
    $('#guide-page-3-table').html(guide_page_3);
    $('#guide-page-3').show();
  }

  const guide_4 = () => {
    $('#guide-page-3').hide();
    $('#guide-page-4-table').html(guide_page_4);
    $('#guide-page-4').show();
  }

  $('#guide-button-1').on('click', function() {
    guide_2();
  });

  $('#guide-button-2').on('click', function() {
    guide_3();
  });

  $('#guide-button-3').on('click', function() {
    guide_4();
  });

  $('#close-guide, #guide-button-4').on('click', function() {
    window.location.hash = '#index';
    $('#guide-modal').hide();
    $('#cy').show();
    $('#navbar').show();
    $('#sidebar').show();
    $('#legend').show();
  });

  //when a node is clicked on, update the current and previous nodes
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


  //update the cy elements array when filtering settings are changed
  $('#type-form input').on('change', function() {
    if (prev_node != null) {
      prev_node.removeClass('highlight');
    }
    if (node != null) {
      node.removeClass('highlight');
    }

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

  //update the cy elements array when filtering settings are changed
  $('#ow-form input').on('change', function() {
    if (prev_node != null) {
      prev_node.removeClass('highlight');
    }
    if (node != null) {
      node.removeClass('highlight');
    }

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

  $('input[name="outcome-checkbox"]').change(
    function(){
      if (prev_node != null) {
        prev_node.removeClass('highlight');
      }
      if (node != null) {
        node.removeClass('highlight');
      }

      node = null;
      prev_node = null;

      if ($(this).is(':checked')) {
        outcome.push($(this).val());
      } else {
        outcome.splice(outcome.indexOf($(this).val()),1);
      }
      update_nodes();
    });

  //disable buttons for filters without corresponding tables
  $('input[name=outcome-checkbox], input[name=type-radio], input[name=ow-radio]').change(
    function(){
      if (!( ow.length == 1 && type != 'all' ) && (outcome.length == 1)){
        $('#summary-button').attr('disabled', true);
        $('#league-button').attr('disabled', false);
        $('#relative-button').attr('disabled', false);
      } else {
        $('#summary-button').attr('disabled', true);
        $('#league-button').attr('disabled', true);
        $('#relative-button').attr('disabled', true);
      }
  });

  //button that pulls the studies for nodes
  $('#get-studies-button').on('click', function() {
    window.location.hash = '#studies';
    var study_list;
    if (node == null) {
      study_list = get_studies_0();
    } else if (prev_node == null) {
      study_list = get_studies_1(node);
    } else {
      study_list = get_studies_2(prev_node, node);
    }

    $('#studies-modal-content').empty();
    content = "<table id='studies-table' class='display nowrap'>";
    content += "<thead><tr align='left'>";
    content += "<th> PMID </th>";
    content += "<th> Study Author </th>";
    content += "<th> Year </th>";
    content += "<th> Age </th>";
    content += "<th> Older_women </th>";
    content += "<th> UI type </th>";
    content += "<th> Followup </th>";
    content += "<th> Counts </th>";
    content += "<th> Coarse trt </th>";
    content += "<th> Granular trt </th>";
    content += "<th> trt description1 </th>";
    content += "<th> trt description2 </th>";
    content += "<th> OR </th>";
    content += "<th> Outcome </th>";
    content += "<th> Combined </th>";
    content += "<th> Blinding of Patients </th>";
    content += "<th> Blinding of Assessors </th>";
    content += "<th> Intention to Treat </th>";
    content += "<th> Attrition Bias </th>";
    content += "<th> Selection Bias </th>";
    content += "<th> Intervention Described </th>";
    content += "<th> Intervention Compliance </th>";
    content += "<th> Other Issues </th>";
    content += "<th> Allocation Concealment </th>";
    content += "</tr></thead>";
    content += "<tbody>"
    jQuery.each(study_list, function() {
      content += '<tr>';
      content += '<td>' + this['pmid'] + '</td>';
      content += '<td>' + this['study_author'] + '</td>';
      content += '<td>' + this['year'] + '</td>';
      content += '<td>' + this['age'] + '</td>';
      content += '<td>' + this['older_women'] + '</td>';
      content += '<td>' + this['ui_type'] + '</td>';
      content += '<td>' + this['followup'] + '</td>';
      content += '<td>' + this['counts_string'] + '</td>';
      content += '<td>' + this['coarse_comparison_string'] + '</td>';
      content += '<td>' + this['granular_comparison_string'] + '</td>';
      content += '<td>' + this['trt_description1'] + '</td>';
      content += '<td>' + this['trt_description2'] + '</td>';
      content += '<td>' + this['or_string'] + '</td>';
      content += '<td>' + this['outcome'] + '</td>';
      content += '<td>' + this['combined'] + '</td>';
      content += '<td>' + this['randomization_sequence'] + '</td>';
      content += '<td>' + this['blinding_of_assessors'] + '</td>';
      content += '<td>' + this['intention_to_treat'] + '</td>';
      content += '<td>' + this['attrition_bias'] + '</td>';
      content += '<td>' + this['selection_bias'] + '</td>';
      content += '<td>' + this['interventions_described'] + '</td>';
      content += '<td>' + this['intervention_compliance'] + '</td>';
      content += '<td>' + this['other_issues'] + '</td>';
      content += '<td>' + this['allocation_concealment'] + '</td>';
      content += '</tr>';
    });
    content += '</tbody>';
    content += '</table>';
    $('#studies-modal-content').html(content);
    $('#cy').hide();
    $('#navbar').hide();
    $('#sidebar').hide();
    $('#legend').hide();
    $('#studies-modal').show();
    $('#studies-table').DataTable({
        autoWidth: true,
        pageLength: 15,
        scrollX: true,
        dom: 'Bfrtip',
        buttons: [ 'colvis' ]
      });
  });

  // button events
  $('#close-studies-modal').on('click', function() {
    window.location.hash = '#index';
    $('#cy').show();
    $('#navbar').show();
    $('#sidebar').show();
    $('#legend').show();
    $('#studies-modal').hide();
  });
  $('#key-messages-button').on('click', function() {
    window.location.hash = '#key-messages';
    $('#cy').hide();
    $('#navbar').hide();
    $('#sidebar').hide();
    $('#legend').hide();
    $('#key-messages').show();
  });
  $('#close-key-messages').on('click', function() {
    window.location.hash = '#index';
    $('#cy').show();
    $('#navbar').show();
    $('#sidebar').show();
    $('#legend').show();
    $('#key-messages').hide();
  });
  $('#overview-button').on('click', function() {
    window.location.hash = '#overview';
    $('#cy').hide();
    $('#navbar').hide();
    $('#sidebar').hide();
    $('#legend').hide();
    $('#overview-dummy').show();
  });
  $('#close-overview').on('click', function() {
    window.location.hash = '#index';
    $('#cy').show();
    $('#navbar').show();
    $('#sidebar').show();
    $('#legend').show();
    $('#overview-dummy').hide();
  });
  $('#close-table').on('click', function() {
    window.location.hash = '#index';
    $('#cy').show();
    $('#navbar').show();
    $('#sidebar').show();
    $('#legend').show();
    $('#table-div').hide();
  });
  $('#league-button').on('click', function() {
    window.location.hash = '#table';
    $('#table-content').html(league_dict[type][outcome[0]]);
    $('#cy').hide();
    $('#navbar').hide();
    $('#sidebar').hide();
    $('#legend').hide();
    $('#table-div').show();
  });

  $('#relative-button').on('click', function() {
    window.location.hash = '#table';
    if ( ow == ['1'] && type == 'all' && outcome == ['all'] ){
      $('#table-content').html(relative_effectiveness_dict['ow']['all']);
    } else {
      $('#table-content').html(relative_effectiveness_dict[type][outcome[0]]);
    }

    $('#cy').hide();
    $('#navbar').hide();
    $('#sidebar').hide();
    $('#legend').hide();
    $('#table-div').show();
  });

  //guided tour via IntroJs
  $('#welcome-button, #guide-button').on('click', function() {
    $('#welcome-modal').hide();
    introJs().start();
  });

  //guided tour via IntroJs
  $('#about-button').on('click', function() {
    guide_1();
  });

  $('#welcome-checkbox').on('change', function() {
    if ($('#welcome-checkbox').is(':checked')) {
      document.cookie = "show-welcome=false";
    } else {
      document.cookie = "show-welcome=true";
    }
  });

  $('#close-welcome-button').on('click', function() {
    window.location.hash = '#index';
    $('#welcome-modal').hide();
  });

  //First time check with cookie
  if (document.cookie != "show-welcome=false") {
    $('#welcome-modal').show();
  }

  var hash = window.location.hash;
  setInterval(function(){
    if (window.location.hash != hash) {
      hash = window.location.hash;
      switch (hash) {
        case '#studies':
          introJs().exit();
          $('#cy').hide();
          $('#navbar').hide();
          $('#sidebar').hide();
          $('#legend').hide();
          $('#studies-modal').show();
          $('#key-messages').hide();
          $('#table-div').hide();
          $('#guide-modal').hide();
          $('#overview-dummy').hide();
          break;
        case '#key-messages':
          introJs().exit();
          $('#cy').hide();
          $('#navbar').hide();
          $('#sidebar').hide();
          $('#legend').hide();
          $('#studies-modal').hide();
          $('#key-messages').show();
          $('#table-div').hide();
          $('#guide-modal').hide();
          $('#overview-dummy').hide();
          break;
        case '#table':
          introJs().exit();
          $('#cy').hide();
          $('#navbar').hide();
          $('#sidebar').hide();
          $('#legend').hide();
          $('#studies-modal').hide();
          $('#key-messages').hide();
          $('#table-div').show();
          $('#guide-modal').hide();
          $('#overview-dummy').hide();
          break;
        case '#overview':
          introJs().exit();
          $('#cy').hide();
          $('#navbar').hide();
          $('#sidebar').hide();
          $('#legend').hide();
          $('#studies-modal').hide();
          $('#key-messages').hide();
          $('#table-div').hide();
          $('#guide-modal').hide();
          $('#overview-dummy').show();
          break;
        case '#guide':
          introJs().exit();
          $('#cy').hide();
          $('#navbar').hide();
          $('#sidebar').hide();
          $('#legend').hide();
          $('#studies-modal').hide();
          $('#key-messages').hide();
          $('#table-div').hide();
          $('#guide-modal').show();
          $('#overview-dummy').hide();
          break;
        default:
          $('#cy').show();
          $('#navbar').show();
          $('#sidebar').show();
          $('#legend').show();
          $('#studies-modal').hide();
          $('#key-messages').hide();
          $('#table-div').hide();
          $('#guide-modal').hide();
          $('#overview-dummy').hide();
      }
    }
  }, 100);

  window.location.hash = '#index';

}

request();
