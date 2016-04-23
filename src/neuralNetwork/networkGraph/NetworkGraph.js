import React from 'react';
import _ from 'lodash';
import d3 from 'd3';
import { convertToGraph } from '../networkUtils';
import renderHeaderLayer from './renderHeaderLayer';
import renderNodesInput from './renderNodesInput';
import renderNodesHidden from './renderNodesHidden';
import renderNodesOutput from './renderNodesOutput';
import renderEdges from './renderEdges';
import * as graphConstants from './graphConstants';

export default class Network extends React.Component {
  componentDidMount() {
    this.buildNetwork();
  }
  shouldComponentUpdate(nextProps) {
    // if (nextProps.isAnyModalOpen) {
    //   d3.select(this.refs['chart-container']).selectAll('*').remove();
    //   return false;
    // }
    if (nextProps.$$snapshot !== this.props.$$snapshot) {
      return true;
    }
    if (nextProps.$$selectedDrawing !== this.props.$$selectedDrawing) {
      return true;
    }
    return false;
  }
  componentDidUpdate() {
    this.buildNetwork();
  }
  //componentWillUnmount() {
  // debugger
  // }
  buildNetwork() {
    const { $$snapshot, $$selectedDrawing, testResultsSummary, onLayerModalOpen } = this.props;
    if (!$$snapshot || $$snapshot.isEmpty()) {
      return false;
    }

    const trainingDataPoint = $$selectedDrawing && $$selectedDrawing.toJS();

    const { nodes, edges, activations } = convertToGraph($$snapshot, trainingDataPoint);
    const domNode = this.refs['chart-container'];
    const hasTrainingPoint = !!trainingDataPoint;

    // Clear SVG, is there an update instead?
    d3.select(domNode).selectAll('*').remove();

    const svg = d3.select(domNode).append('svg')
      .attr('width', graphConstants.WIDTH + 2)
      .attr('height', graphConstants.HEIGHT);

    const graphBody = svg.append('g')
      .attr('transform', `translate(0, ${graphConstants.HEADER_HEIGHT})`)

    renderHeaderLayer(svg);

    // Render Nodes. Each Layer is pretty different, so split up
    renderNodesInput(graphBody, nodes[0], hasTrainingPoint);
    renderNodesHidden(graphBody, nodes[1], hasTrainingPoint, onLayerModalOpen);
    renderNodesOutput(graphBody, nodes[2], hasTrainingPoint && activations[2],
      hasTrainingPoint, testResultsSummary, onLayerModalOpen);

    // Render Edges
    const start1 = graphConstants.INPUT_LAYER_NODE_WIDTH;
    const end1 = hasTrainingPoint
      ? graphConstants.WIDTH / 2 - graphConstants.BIAS_LABEL_WIDTH - graphConstants.HIDDEN_LAYER_NODE_WIDTH / 2
      : graphConstants.WIDTH / 2 - graphConstants.BIAS_LABEL_WIDTH - graphConstants.HIDDEN_LAYER_NODE_WIDTH / 2 + graphConstants.HIDDEN_LAYER_NODE_WIDTH / 2

    const start2 = hasTrainingPoint
      ? graphConstants.WIDTH / 2 + graphConstants.HIDDEN_LAYER_NODE_WIDTH / 2 + 5
      : graphConstants.WIDTH / 2 + graphConstants.HIDDEN_LAYER_NODE_WIDTH / 2 + 5 - graphConstants.HIDDEN_LAYER_NODE_WIDTH / 2;
    const end2 = graphConstants.WIDTH - graphConstants.BIAS_LABEL_WIDTH - graphConstants.OUTPUT_LAYER_NODE_WIDTH - graphConstants.OUTPUT_LAYER_LABEL;

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

    renderEdges(graphBody, edges1, start1, end1, nodes[0].length, nodes[1].length,
      hasTrainingPoint);
    renderEdges(graphBody, edges2, start2, end2, nodes[1].length, nodes[2].length,
      hasTrainingPoint, true);
  }

  render() {
    return (
      <div ref="chart-container"/>
    );
  }
}
