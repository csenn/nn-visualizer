import React from 'react';
import _ from 'lodash';
import d3 from 'd3';
import { convertToGraph } from '../networkUtils';
import nodesInput from './nodesInput';
import nodesHidden from './nodesHidden';
import nodesOutput from './nodesOutput';
import renderEdges from './renderEdges';
import * as graphConstants from './graphConstants';


const WITH_TRAINING_ON = '#2E7D32';
const WITH_TRAINING_OFF = '#ef5350';

// const WITH_TRAINING_ON = 'green';
// const WITH_TRAINING_OFF = 'purple';

const NO_TRAINING_POSITIVE = 'green';
const NO_TRAINING_NEGATIVE = 'purple';


const HEIGHT = 600;
const WIDTH = 800;

//const HIDDEN_LAYER_NODE_WIDTH = 30;
const HIDDEN_LAYER_NODE_WIDTH = 0;

const OUTPUT_LAYER_NODE_WIDTH = 55;
const OUTPUT_LAYER_LABEL = 15;

const BIAS_LABEL_WIDTH = 50;

export default class Network extends React.Component {
  componentDidMount() {
    this.buildNetwork();
  }
  componentDidUpdate() {
    this.buildNetwork();
  }
  componentWillUnmount() {
  // debugger
  }
  buildNetwork() {

    const {$$snapshot, trainingDataPoint, testResultsSummary} = this.props

    if (!$$snapshot || $$snapshot.isEmpty()) {
      return false;
    }

    const { nodes, edges, activations } = convertToGraph($$snapshot, trainingDataPoint);

    const domNode = this.refs['chart-container'];

    d3.select(domNode).selectAll('*').remove();

    const svg = d3.select(domNode).append('svg')
      .attr('width', WIDTH + 2)
      .attr('height', HEIGHT);

    const edges1 = [];
    const edges2 = [];
    const numEdges = edges.length;
    for (let i = 0; i < numEdges; i++) {
      if (edges[i].source.layer === 0) {
        edges1.push(edges[i]);
      } else {
        edges2.push(edges[i]);
      }
    }

    const hasTrainingPoint = !!trainingDataPoint;

    // this.buildFirstLayerNodes(svg, nodes[0], hasTrainingPoint);
    nodesInput(svg, nodes[0], hasTrainingPoint)
    nodesHidden(svg, nodes[1], hasTrainingPoint);
    nodesOutput(svg, nodes[2], hasTrainingPoint && activations[2], hasTrainingPoint, testResultsSummary)


    const start1 = 10;
    const end1 = graphConstants.WIDTH / 2 - graphConstants.BIAS_LABEL_WIDTH - graphConstants.HIDDEN_LAYER_NODE_WIDTH / 2
    const start2 = WIDTH / 2 + HIDDEN_LAYER_NODE_WIDTH / 2 + 5;
    const end2 = WIDTH - BIAS_LABEL_WIDTH - OUTPUT_LAYER_NODE_WIDTH - OUTPUT_LAYER_LABEL;


    renderEdges(svg, edges1, start1, end1, nodes[0].length, nodes[1].length, hasTrainingPoint);
    renderEdges(svg, edges2, start2, end2, nodes[1].length, nodes[2].length, hasTrainingPoint, true);


    // this.buildSecondLayerNodes(;
  //  this.buildThirdLayerNodes();
    // this.buildFirstEdges(svg, edges1, nodes[0].length, nodes[1].length, hasTrainingPoint);
    // this.buildSecondEdges(svg, edges2, nodes[1].length, nodes[2].length, hasTrainingPoint);
    // this.buildOutputLabels(svg, nodes[2]);
  }
  // buildFirstLayerNodes(svg, nodes, hasTrainingPoint) {
  //
  // }
  // buildSecondLayerNodes(svg, nodes, hasTrainingPoint) {
  //   const yScale = d3.scale.linear()
  //     .domain([0, nodes.length])
  //     .range([0, HEIGHT]);
  //
  //   const elemEnter = svg.append('g')
  //     .selectAll('g')
  //     .append('g')
  //     .data(nodes)
  //     .enter()
  //     .append('g')
  //     .attr('transform', (d, nodeIndex) => {
  //       const y = yScale(nodeIndex) + 0;
  //       const x = WIDTH / 2 - HIDDEN_LAYER_NODE_WIDTH / 2;
  //       return `translate(${x}, ${y})`;
  //     });
  //
  //   if (hasTrainingPoint) {
  //     elemEnter.append('rect')
  //       .attr('width', HIDDEN_LAYER_NODE_WIDTH)
  //       .attr('height', yScale(1) - 4)
  //       .attr('rx', 3)
  //       .attr('ry', 3)
  //       .attr('stroke', d => {
  //         if (hasTrainingPoint) {
  //           return d.activation > .5 ? WITH_TRAINING_ON : WITH_TRAINING_OFF;
  //         }
  //         return 'rgb(190, 190, 190)';
  //       })
  //       .attr('fill', d => {
  //         if (hasTrainingPoint) {
  //           return d.activation > .5 ? WITH_TRAINING_ON : WITH_TRAINING_OFF;
  //         }
  //         return 'rgb(230, 230, 230)';
  //       });
  //   }
  //
  //   // Bias Label
  //   const biasLabel = elemEnter.append('text')
  //       .attr('dx', - BIAS_LABEL_WIDTH + BIAS_LABEL_WIDTH/2)
  //       .attr('font-size', 11)
  //       .attr('dy', d => 11)
  //       .attr('text-anchor', 'middle')
  //       .attr('stroke-width', '.5')
  //       .attr('stroke', d => {
  //         return 'black';
  //         if (hasTrainingPoint) {
  //           return 'black';
  //         }
  //         return d.bias > 0 ? NO_TRAINING_POSITIVE : NO_TRAINING_NEGATIVE;
  //       })
  //       .text(d => {
  //         return d.activation || d.bias;
  //       });
  //     biasLabel.on("click", function() {
  //       debugger
  //       console.log("rect");
  //       d3.event.stopPropagation();
  //     });
  // }
  // buildThirdLayerNodes(svg, nodes, lastActivations, hasTrainingPoint, testResultsSummary) {
  //   let maxIndex = null;
  //   if (lastActivations) {
  //     const activations = _.flatten(lastActivations);
  //     maxIndex = _.findIndex(activations, a => a === _.max(activations));
  //   }
  //
  //   const yScale = d3.scale.linear()
  //     .domain([0, nodes.length])
  //     .range([0, HEIGHT]);
  //
  //   const elemEnter = svg
  //     .append('g')
  //     .selectAll('g')
  //     .data(nodes)
  //     .enter()
  //     .append('g')
  //     .attr('transform', (d, nodeIndex) => {
  //       const y = yScale(nodeIndex) + 2;
  //       return `translate(${WIDTH - OUTPUT_LAYER_NODE_WIDTH - OUTPUT_LAYER_LABEL}, ${y})`;
  //     });
  //
  //   elemEnter.append('rect')
  //     .attr('width', OUTPUT_LAYER_NODE_WIDTH - OUTPUT_LAYER_LABEL)
  //     .attr('height', yScale(1) - 4)
  //       //.attr('rx', 3)
  //     .attr('ry', 3)
  //     // .attr('stroke', d => {
  //     //   if (hasTrainingPoint) {
  //     //     return d.activation > .5 ? WITH_TRAINING_ON : WITH_TRAINING_OFF;
  //     //   }
  //     //   return 'rgb(190, 190, 190)';
  //     // })
  //     .attr('fill', d => {
  //       if (hasTrainingPoint) {
  //         return d.activation > .5 ? WITH_TRAINING_ON : WITH_TRAINING_OFF;
  //       }
  //     return WITH_TRAINING_ON;
  //     });
  //
  //     elemEnter.append('rect')
  //       .attr('width', OUTPUT_LAYER_NODE_WIDTH - OUTPUT_LAYER_LABEL)
  //       //.attr('rx', 3)
  //       .attr('ry', 3)
  //       .attr('height', (d, i) => {
  //         const {correctCount, wrongCount} = testResultsSummary[i];
  //         const fraction = correctCount / (wrongCount + correctCount)
  //         let height = (1 - fraction) * yScale(1)
  //         if (height > yScale(1) - 4) {
  //           height = yScale(1) - 4
  //         }
  //         return  height;
  //       })
  //       // .attr('stroke', d => {
  //       //   if (hasTrainingPoint) {
  //       //     return d.activation > .5 ? WITH_TRAINING_ON : WITH_TRAINING_OFF;
  //       //   }
  //       //   return 'rgb(190, 190, 190)';
  //       // })
  //       .attr('fill', d => {
  //
  //           return WITH_TRAINING_OFF;
  //         if (hasTrainingPoint) {
  //           return d.activation > .5 ? WITH_TRAINING_ON : WITH_TRAINING_OFF;
  //         }
  //         return 'rgb(230, 230, 230)';
  //       });
  //
  //   // Number Label
  //   elemEnter.append('text')
  //     .attr('dx', OUTPUT_LAYER_NODE_WIDTH)
  //     .attr('dy',  yScale(1) / 2)
  //     .attr('stroke-width', '1.2')
  //     .attr('font-size', 20)
  //     .attr('text-anchor', 'middle')
  //     .text((d, i) => i);
  //
  //   // Bias
  //   elemEnter.append('text')
  //     // .attr('dx', OUTPUT_LAYER_NODE_WIDTH / 2)
  //     .attr('dx', - BIAS_LABEL_WIDTH + BIAS_LABEL_WIDTH/2)
  //     .attr('dy', d => yScale(1) - yScale(1)/2)
  //     .attr('font-size', 11)
  //     .attr('text-anchor', 'middle')
  //     .attr('stroke-width', '.5')
  //     .attr('stroke', d => {
  //       return 'black';
  //
  //       if (hasTrainingPoint) {
  //         return 'black';
  //       }
  //       return d.bias > 0 ? NO_TRAINING_POSITIVE : NO_TRAINING_NEGATIVE;
  //     })
  //     .text((d, i) => d.activation || d.bias);
  //
  //     // Percentage correct
  //     elemEnter.append('text')
  //       .attr('dx', (OUTPUT_LAYER_NODE_WIDTH - OUTPUT_LAYER_LABEL) / 2)
  //       //.attr('dy', d => yScale(1) / 2)
  //       .attr('dy', yScale(1) / 2 - 3)
  //       .attr('font-size', 12)
  //       .attr('text-anchor', 'middle')
  //       .attr('stroke-width', '.5')
  //       .attr('stroke', d => {
  //         if (hasTrainingPoint) {
  //           return 'black';
  //         }
  //         return 'white'
  //         // return d.bias > 0 ? NO_TRAINING_POSITIVE : NO_TRAINING_NEGATIVE;
  //       })
  //       .text((d, i) => {
  //         const {correctCount, wrongCount} = testResultsSummary[i];
  //         const fraction = correctCount / (wrongCount + correctCount)
  //         return Math.round(fraction * 100) + '%'
  //       });
  //
  //       // Accuracy text
  //       elemEnter.append('text')
  //         .attr('dx', (OUTPUT_LAYER_NODE_WIDTH - OUTPUT_LAYER_LABEL) / 2)
  //         .attr('dy', d => yScale(1) / 2 + 7)
  //         //.attr('dy', yScale(1) - 7)
  //         .attr('font-size', 8)
  //         .attr('text-anchor', 'middle')
  //         .attr('stroke-width', '.4')
  //         .attr('stroke', d => {
  //           if (hasTrainingPoint) {
  //             return 'black';
  //           }
  //           return 'white'
  //           // return d.bias > 0 ? NO_TRAINING_POSITIVE : NO_TRAINING_NEGATIVE;
  //         })
  //         .text('accuracy');
  //
  // }

  buildFirstEdges(svg, edges, numberNodes1, numberNodes2, hasTrainingData) {
    const yScale1 = d3.scale.linear()
      .domain([0, numberNodes1])
      .range([0, HEIGHT]);

    const yScale2 = d3.scale.linear()
      .domain([0, numberNodes2])
      .range([0, HEIGHT]);

    svg.append('g')
      .selectAll('line')
      .data(edges)
      .enter()
      .append('line')
      .attr('stroke-width', d => {
        if (hasTrainingData) {
          return d.isOn ? '.07' : '.03';
        } else {
          const zScore = Math.abs(d.zScore);
          return zScore * .1;
        }
      })
      .attr('x1', '10')
      .attr('x2', `${WIDTH / 2 - BIAS_LABEL_WIDTH - HIDDEN_LAYER_NODE_WIDTH / 2}`)
      .attr('y1', d => yScale1(d.source.index))
      .attr('y2', d => yScale2(d.target.index) + 10)
      .style('stroke', d => {
        if (hasTrainingData) {
          return d.isOn ? WITH_TRAINING_ON : WITH_TRAINING_OFF;
        } else {
          // return d.weight > 0 ? NO_TRAINING_POSITIVE : NO_TRAINING_NEGATIVE;
          return d.weight > 0 ? NO_TRAINING_NEGATIVE : NO_TRAINING_POSITIVE ;
        }
      });
  }
  buildSecondEdges(svg, edges, numberNodes1, numberNodes2, hasTrainingData) {
    const yScale1 = d3.scale.linear()
      .domain([0, numberNodes1])
      .range([0, HEIGHT]);

    const yScale2 = d3.scale.linear()
      .domain([0, numberNodes2])
      .range([0, HEIGHT]);

    svg.append('g')
      .selectAll('line')
      .data(edges)
      .enter()
      .append('line')
      .attr('stroke-width', d => {
        if (hasTrainingData) {
          return '.3';
          console.log(d.isOn);
          return d.isOn ? '.1' : '.03';
        } else {
          return '.5';
        }
      })
      .attr('x1', `${WIDTH / 2 + HIDDEN_LAYER_NODE_WIDTH / 2 + 5}`)
      .attr('x2', `${WIDTH - BIAS_LABEL_WIDTH - OUTPUT_LAYER_NODE_WIDTH - OUTPUT_LAYER_LABEL}`)
      .attr('y1', d => yScale1(d.source.index) + 10)
      .attr('y2', d => yScale2(d.target.index) + (yScale2(1) / 2))
      .style('stroke', d => {
        if (hasTrainingData) {
          return d.isOn ? WITH_TRAINING_ON : WITH_TRAINING_OFF;
        } else {
          return d.weight > 0 ? NO_TRAINING_POSITIVE : NO_TRAINING_NEGATIVE;
        }
      });
  }
  render() {
    return (
      <div ref='chart-container'/>
    );
  }
}
