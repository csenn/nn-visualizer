import React from 'react';
import d3 from 'd3';
// import NeuralNetwork from './neuralNetwork';

// import math from 'mathjs'

// import json from './data.json'

const graph = [
  [
    {
      label: 'c'
    },
    {
      label: 'd'
    },
    {
      label: 'c'
    },
    {
      label: 'd'
    },
// {
//     label: 'c'
// },
// {
//     label: 'd'
// },
// {
//     label: 'c'
// },
// {
//     label: 'd'
// },
// {
//     label: 'c'
// },
// {
//     label: 'd'
// },
// {
//     label: 'c'
// },
// {
//     label: 'd'
// },
// {
//     label: 'c'
// },
// {
//     label: 'd'
// },
// {
//     label: 'c'
// },
// {
//     label: 'd'
// },
// {
//     label: 'c'
// },
// {
//     label: 'd'
// },
  ],
  [
    {
      label: 'a'
    },
    {
      label: 'b'
    },
    {
      label: 'e'
    },
    {
      label: 'f'
    }
  ],
  [
    {
      label: 'g'
    },
    {
      label: 'h'
    },
    {
      label: 'i'
    }
  ],
  [
    {
      label: 'j'
    },
  ]
];

const edges = [
  {
    source: {
      layer: 0,
      index: 0
    },
    target: {
      layer: 1,
      index: 0
    }
  },
  {
    source: {
      layer: 0,
      index: 0
    },
    target: {
      layer: 1,
      index: 1
    }
  },
  {
    source: {
      layer: 0,
      index: 1
    },
    target: {
      layer: 1,
      index: 0
    }
  },
  {
    source: {
      layer: 0,
      index: 1
    },
    target: {
      layer: 1,
      index: 1
    }
  },
  {
    source: {
      layer: 2,
      index: 0
    },
    target: {
      layer: 3,
      index: 0
    }
  },
  {
    source: {
      layer: 2,
      index: 1
    },
    target: {
      layer: 3,
      index: 0
    }
  }
];

function makeArrayFromIndex(index) {
  var result = []
  for (var i=0; i<10; i++) {
    if (i === index) {
      result.push([1])
    } else {
      result.push([0])
    }
  }
  return result
}

function getTrainingData() {
  // var d = [];
  // for (var i = 0; i < 100; i++) {
  //   d.push({
  //     x: [[0], [0]],
  //     y: [[0], [1]]
  //   })
  //   d.push({
  //     x: [[1], [0]],
  //     y: [[1], [0]]
  //   })
  //   d.push({
  //     x: [[0], [1]],
  //     y: [[1], [0]]
  //   })
  //   d.push({
  //     x: [[1], [1]],
  //     y: [[0], [1]]
  //   })
  // }
  // return d;

  for (let i=0; i<json.length; i++) {
    json[i].y = makeArrayFromIndex(json[i].yIndex)
  }

  return json
}

function getTestData() {
  // const d = [];
  // for (let i = 0; i < 10; i++) {
  //   d.push({
  //     x: [[0], [0]],
  //     yIndex: 1
  //   })
  //   d.push({
  //     x: [[1], [0]],
  //     yIndex: 0
  //   })
  //   d.push({
  //     x: [[0], [1]],
  //     yIndex: 0
  //   })
  //   d.push({
  //     x: [[1], [1]],
  //     yIndex: 1
  //   })
  // }
  // return d;

  return json;
}

export default class Network extends React.Component {
  componentDidMount() {
    this.buildNetwork(this.refs['chart-container'], {
      graph: graph,
      edges: edges
    });
  }
  componentDidUpdate() {
    this.buildNetwork(this.refs['chart-container'], {
      graph: graph,
      edges: edges
    });
  }
  componentWillUnmount() {
  // debugger
  }
  buildNetwork(domNode, data) {

    const NODE_RADIUS = 25;

    let maxNodes = 0;
    for (let i = 0; i < data.graph.length; i++) {
      if (data.graph[i].length > maxNodes) {
        maxNodes = data.graph[i].length;
      }
    }

    const xScale = d3.scale.linear()
      .domain([0, data.graph.length])
      .range([0, 400]);

    const yScale = d3.scale.linear()
      .domain([0, maxNodes]) // 4 -> max number of nodes
      .range([0, 400]);

    d3.select(domNode).selectAll('*').remove();

    const svg = d3.select(domNode).append('svg')
      .attr('width', '400')
      .attr('height', '600');

    svg.selectAll('line')
      .data(data.edges)
      .enter()
      .append('line')
      .attr('x1', d => xScale(d.source.layer) + 2 * NODE_RADIUS)
      .attr('x2', d => xScale(d.target.layer))
      .attr('y1', d => {
        const layerLength = data.graph[d.source.layer].length;
        return yScale(d.source.index) + yScale((maxNodes - layerLength) / 2) + NODE_RADIUS;
      })
      .attr('y2', d => {
        const layerLength = data.graph[d.target.layer].length;
        return yScale(d.target.index) + yScale((maxNodes - layerLength) / 2) + NODE_RADIUS;
      })
      .style('stroke', 'rgb(6,120,155)');

    const layers = svg.selectAll('g')
      .data(data.graph).enter()
      .append('g')
      .attr('transform', (d, i) => {
        const x = xScale(i) + NODE_RADIUS;
        const y = yScale((maxNodes - d.length) / 2) + NODE_RADIUS;
        return `translate(${x}, ${y})`;
      });

    const elemEnter = layers.selectAll('g')
      .data(data.graph)
      .data(d => d)
      .enter()
      .append('g')
      .attr('transform', (d, i) => {
        const y = yScale(i);
        return `translate(0, ${y})`;
      });

    elemEnter.append('circle')
      .attr('r', () => NODE_RADIUS - 1)
      .attr('stroke', 'black')
      .attr('fill', 'white');

    elemEnter.append('text')
      .attr('dx', d => 0)
      .attr('dy', d => 5)
      .attr('text-anchor', 'middle')
      .text(d => d.label);
  }
  render() {
    return (
      <div ref='chart-container'/>
    );
  }
}
