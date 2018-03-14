var cy = cytoscape({
  container: document.getElementById('cy'), // container to render in

  elements: [ // list of graph elements to start with
    // NODES
      {
      group: 'nodes',
      data: {
        id: 'H+N+T',
        color: '#e0dfe0'
      },
      position: {
        x: -100,
        y: -440
      }
    }
    , {
      group: 'nodes',
      data: {
        id: 'H+T',
        color: '#fee4c6'
      },
      position: {
        x: -180,
        y: -420
      }
    }
    , {
      group: 'nodes',
      data: {
        id: 'B',
        color: '#fedabb'
      },
      position: {
        x: -20,
        y: -400
      }
    }
    , {
      group: 'nodes',
      data: {
        id: 'C',
        color: '#fff595'
      },
      position: {
        x: 200,
        y: -320
      }
    }
    , {
      group: 'nodes',
      data: {
        id: 'C+T',
        color: '#ccb28d'
      },
      position: {
        x: 410,
        y: -280
      }
    }
    , {
      group: 'nodes',
      data: {
        id: 'C+H',
        color: '#cdcdb5',
        link: 'https://brown.edu/'
      },
      position: {
        x: -360,
        y: -360
      }
    }
    , {
      group: 'nodes',
      data: {
        id: 'H',
        color: '#ffeb91'
      },
      position: {
        x: -280,
        y: -300
      }
    }
    , {
      group: 'nodes',
      data: {
        id: 'A',
        color: '#cbf978'
      },
      position: {
        x: -420,
        y: 10
      }
    }
    , {
      group: 'nodes',
      data: {
        id: 'P',
        color: '#fdaeba'
      },
      position: {
        x: 0,
        y: 0
      }
    }
    , {
      group: 'nodes',
      data: {
        id: 'V',
        color: '#dca2dc'
      },
      position: {
        x: 420,
        y: 10
      }
    }
    , {
      group: 'nodes',
      data: {
        id: 'N',
        color: '#9bfdfe'
      },
      position: {
        x: -400,
        y: 120
      }
    }
    , {
      group: 'nodes',
      data: {
        id: 'U',
        color: '#dbd1d4'
      },
      position: {
        x: 380,
        y: 100
      }
    }
    , {
      group: 'nodes',
      data: {
        id: 'T',
        color: '#d2eeee'
      },
      position: {
        x: -160,
        y: 200
      }
    }
    , {
      group: 'nodes',
      data: {
        id: 'N+T',
        color: '#a5d4ec'
      },
      position: {
        x: -360,
        y: 280
      }
    }
    // EDGES
    , {
      data: { id: 'C+H-H', source: 'C+H', target: 'H', link: 'https://brown.edu/' }
    }
    , {
      data: { id: 'H-H+T', source: 'H', target: 'H+T' }
    }
    , {
      data: { id: 'H-H+N+T', source: 'H', target: 'H+N+T' }
    }
    , {
      data: { id: 'H-P', source: 'H', target: 'P' }
    }
    , {
      data: { id: 'H+T-T', source: 'H+T', target: 'T' }
    }
    , {
      data: { id: 'H+N+T-P', source: 'H+N+T', target: 'P' }
    }
    , {
      data: { id: 'B-N', source: 'B', target: 'N' }
    }
    , {
      data: { id: 'B-P', source: 'B', target: 'P' }
    }
    , {
      data: { id: 'B-C', source: 'B', target: 'C' }
    }
    , {
      data: { id: 'H+N+T-P', source: 'H+N+T', target: 'P' }
    }
    , {
      data: { id: 'C-N', source: 'C', target: 'N' }
    }
    , {
      data: { id: 'C-P', source: 'C', target: 'P' }
    }
    , {
      data: { id: 'C-T', source: 'C', target: 'T' },
      style: {
        'curve-style': 'unbundled-bezier',
        'control-point-distance': '-140px',
        'control-point-weight': '0.5'
      }
    }
    , {
      data: { id: 'C-C+T', source: 'C', target: 'C+T' }
    }
    , {
      data: { id: 'A-N', source: 'A', target: 'N' }
    }
    , {
      data: { id: 'A-P', source: 'A', target: 'P' }
    }
    , {
      data: { id: 'N-P', source: 'N', target: 'P' }
    }
    , {
      data: { id: 'N-T', source: 'N', target: 'T' }
    }
    , {
      data: { id: 'N-N+T', source: 'N', target: 'N+T' }
    }
    , {
      data: { id: 'N+T-P', source: 'N+T', target: 'P' }
    }
    , {
      data: { id: 'N+T-T', source: 'N+T', target: 'T' }
    }
    , {
      data: { id: 'T-P', source: 'T', target: 'P' }
    }
    , {
      data: { id: 'P-U', source: 'P', target: 'U' }
    }
    , {
      data: { id: 'P-V', source: 'P', target: 'V' },
      style: {
        'curve-style': 'unbundled-bezier',
        'control-point-distance': '-40px',
        'control-point-weight': '0.5'
      }
    }
  ],

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
    name: 'preset'
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
