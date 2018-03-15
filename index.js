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

var cy = cytoscape({
  container: document.getElementById('cy'), // container to render in

  //elements: fetch('./data/sample.json').then(response => {
  elements: fetch('./data/output.json').then(response => {
    return response.json();
  }),

  style: [ // the stylesheet for the graph
    {
      selector: 'node',
      style: {
        'background-color': 'data(color)',
        'label': 'data(id)'
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

cy.on('tap', 'node, edge', function(e) {
  var node = e.target;
  var link = node.data('link');
  var r = confirm('Follow the link to: ' + link + '?');

  if (r == true) {
    window.open(link);
  }

});
