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

// Should be a decently fast and safe way to create a unique hash
// from the drawing
function calcDrawingHash(drawing) {
  return drawing.reduce((prev, curr) => {
    if (!curr) return prev;
    return prev + curr;
  }, '');
}

export default class Network extends React.Component {
  componentDidMount() {
    this.buildNetwork();
  }
  shouldComponentUpdate(nextProps) {
    if (nextProps.snapshotIndex !== this.props.snapshotIndex) {
      return true;
    }
    if (!!nextProps.selectedDrawing !== !!this.props.selectedDrawing) {
      return true;
    }
    if (nextProps.selectedDrawing && calcDrawingHash(nextProps.selectedDrawing.x)
      !== calcDrawingHash(this.props.selectedDrawing.x)) {
      return true;
    }
    return false;
  }
  componentDidUpdate() {
    this.buildNetwork();
  }
  // Need cleanup?
  //componentWillUnmount() {
  // debugger
  // }
  buildNetwork() {
    const { selectedSnapshot, selectedDrawing, testResultsSummary, dispatch } = this.props;
    if (!selectedSnapshot) {
      return false;
    }

    const { nodes, edges, activations } = convertToGraph(selectedSnapshot, selectedDrawing);
    const hasTrainingPoint = !!selectedDrawing;

    const svg = d3.select(this.refs['chart-svg'])
      .attr('width', graphConstants.WIDTH + 2)
      .attr('height', graphConstants.HEIGHT);

    const graphBody = svg
      .select('.chart-svg-body')
      .attr('transform', `translate(0, ${graphConstants.HEADER_HEIGHT})`);

    // Render header layer
    renderHeaderLayer(svg, nodes[1].length, hasTrainingPoint);

    // Render Nodes. Each Layer is different enough that it makes sense to split
    renderNodesInput(
      graphBody,
      nodes[0],
      hasTrainingPoint
    );
    renderNodesHidden(
      graphBody,
      nodes.slice(1, nodes.length - 1),
      hasTrainingPoint,
      dispatch
    );
    renderNodesOutput(
      graphBody,
      nodes[nodes.length - 1],
      hasTrainingPoint && activations[activations.length - 1],
      hasTrainingPoint,
      testResultsSummary,
      dispatch
    );

    const sortedEdges = hasTrainingPoint
      ? _.sortBy(edges, (e) => e.isOn)
      : _.sortBy(edges, (e) => Math.abs(e.zScore));

    const edgeLayers = [];
    const numEdges = edges.length;
    for (let i = 0; i < numEdges; i++) {
      const layer = sortedEdges[i].source.layer;
      if (!edgeLayers[layer]) {
        edgeLayers[layer] = [];
      }
      edgeLayers[layer].push(sortedEdges[i]);
    }

    renderEdges(
      graphBody,
      edgeLayers,
      nodes,
      hasTrainingPoint
    );
  }

  render() {
    return (
      <div ref="chart-container">
        <svg ref="chart-svg">
          <g className="chart-svg-body"/>
        </svg>
      </div>
    );
  }
}
