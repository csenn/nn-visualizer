import d3 from 'd3';
import * as graphConstants from './graphConstants';


export default function (svg, edgeLayers, nodes, hasTrainingData) {
  const xScale = d3.scale.linear()
    .domain([0, nodes.length - 1])
    .range([
      graphConstants.INPUT_LAYER_NODE_WIDTH,
      graphConstants.WIDTH - graphConstants.OUTPUT_LAYER_LABEL
    ]);

  function getYScale(index) {
    return d3.scale.linear()
      .domain([0, nodes[index].length])
      .range([0, graphConstants.HEIGHT - graphConstants.HEADER_HEIGHT]);
  }

  const edgeBoxes = svg
    .selectAll(`.edge-layer`)
    .data(edgeLayers);

  edgeBoxes
    .enter()
    .append('g')
    .attr('class', 'edge-layer');

  const edges = edgeBoxes
    .selectAll('.edge')
    .data(d => d);

  // Entering edges
  edges
    .enter()
    .append('line')
    .attr('class', `edge`);

  // Edge definitions
  edges
    .attr('x1', (d, i, layerIndex) => {
      if (layerIndex === 0) {
        return graphConstants.INPUT_LAYER_NODE_WIDTH;
      }
      if (hasTrainingData) {
        return xScale(layerIndex) + graphConstants.BIAS_LABEL_WIDTH - 5;
      }
      return xScale(layerIndex) + graphConstants.BIAS_LABEL_WIDTH / 2 - 5;
    })
    .attr('x2', (d, i, layerIndex) => {
      const { BIAS_LABEL_WIDTH, OUTPUT_LAYER_NODE_WIDTH } = graphConstants;
      // Handle last layer with special case for simplicity
      if (layerIndex === edgeLayers.length - 1) {
        return xScale(layerIndex + 1) - BIAS_LABEL_WIDTH - OUTPUT_LAYER_NODE_WIDTH;
      }
      if (hasTrainingData) {
        return xScale(layerIndex + 1) - BIAS_LABEL_WIDTH;
      }
      return xScale(layerIndex + 1) - BIAS_LABEL_WIDTH / 2 - 5;
    })
    .attr('y1', (d, i, layerIndex) => {
      return getYScale(layerIndex)(d.source.index) + getYScale(layerIndex)(1) / 2;
    })
    .attr('y2', (d, i, layerIndex) => {
      return getYScale(layerIndex + 1)(d.target.index) + getYScale(layerIndex + 1)(1) / 2;
    })
    .attr('stroke-width', (d, i, layerIndex) => {
      const thicken = edgeLayers[layerIndex].length < 1000;
      let zScore = Math.abs(d.zScore);
      if (zScore > 6) {
        zScore = 6;
      }
      if (hasTrainingData) {
        if (thicken) {
          return d.isOn ? '1.5' : '.6';
        }
        return zScore * 0.08;
      } else {
        if (thicken) {
          return zScore * 0.6;
        }
        return zScore * 0.07;
      }
    })
    .style('stroke', d => {
      if (hasTrainingData) {
        return d.isOn
          ? graphConstants.WITH_TRAINING_ON
          : graphConstants.WITH_TRAINING_OFF;
      } else {
        return d.weight > 0
          ? graphConstants.NO_TRAINING_NEGATIVE
          : graphConstants.NO_TRAINING_POSITIVE ;
      }
    });

  // lines.exit().remove();
}
