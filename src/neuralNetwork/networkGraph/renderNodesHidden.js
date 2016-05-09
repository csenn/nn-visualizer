import d3 from 'd3';
import * as graphConstants from './graphConstants';
import { setLayerModal } from '../data/neuralNetworkActions';

export default function (svg, hiddenLayers, hasTrainingPoint, dispatch) {

  const xScale = d3.scale.linear()
    .domain([0, hiddenLayers.length + 1])
    .range([
      graphConstants.INPUT_LAYER_NODE_WIDTH,
      graphConstants.WIDTH - graphConstants.OUTPUT_LAYER_LABEL
    ]);

  function getYScale(index) {
    return d3.scale.linear()
      .domain([0, hiddenLayers[index].length])
      .range([0, graphConstants.HEIGHT - graphConstants.HEADER_HEIGHT]);
  }

  const layers = svg
    .selectAll('.hidden-node-layers')
    .data(hiddenLayers);

  layers
    .enter()
    .append('g')
    .attr('class', 'hidden-node-layers')
    .attr('transform', (d, layerIndex) => {
      const y = 0;
      const x = xScale(layerIndex + 1);
      return `translate(${x}, ${y})`;
    });

  const elems = layers
    .selectAll('.hidden-nodes')
    .data(d => d);

  const enteringElems = elems
    .enter()
    .append('g')
    .attr('class', 'hidden-nodes')
    .attr('transform', (d, nodeIndex, layerIndex) => {
      const y = getYScale(layerIndex)(nodeIndex) + 0;
      return `translate(${0}, ${y})`;
    });

    // Rectangle Node
  enteringElems
      .append('rect')
      .attr('class', 'hidden-node-rect');

  elems.select('.hidden-node-rect')
      .attr('width', graphConstants.HIDDEN_LAYER_NODE_WIDTH)
      .attr('height', (d, nodeIndex, layerIndex) => getYScale(layerIndex)(1) - 4)
      .attr('rx', 3)
      .attr('ry', 3)
      .attr('display', hasTrainingPoint ? 'inherit' : 'none')
      .attr('stroke', d => {
        return d.activation > 0.5
          ? graphConstants.WITH_TRAINING_ON
          : graphConstants.WITH_TRAINING_OFF;
      })
      .attr('fill', d => {
        return d.activation > .5
          ? graphConstants.WITH_TRAINING_ON
          : graphConstants.WITH_TRAINING_OFF;
      });

  // Rectangle Node Label
  enteringElems
      .append('text')
      .attr('class', 'hidden-node-text');

  elems.select('.hidden-node-text')
        .attr('dx', graphConstants.HIDDEN_LAYER_NODE_WIDTH / 2)
        .attr('font-size', 10)
        .attr('dy', (d, nodeIndex, layerIndex) => getYScale(layerIndex)(1) / 2)
        .attr('text-anchor', 'middle')
        .attr('stroke-width', '.5')
        .attr('display', hasTrainingPoint ? 'inherit' : 'none')
        .attr('stroke', d => d.activation > .5 ? 'black' : 'white')
        .text(d => d.activation);

  // Bias Label Entering
  enteringElems
    .append('text')
    .attr('class', 'bias');

  // Bias Label Updating
  const biasLabels = elems
    .select('.bias')
    .attr('dx', () => {
      const { BIAS_LABEL_WIDTH, HIDDEN_LAYER_NODE_WIDTH } = graphConstants;
      return hasTrainingPoint
        ? - BIAS_LABEL_WIDTH + BIAS_LABEL_WIDTH / 2
        : - BIAS_LABEL_WIDTH + BIAS_LABEL_WIDTH / 2 + HIDDEN_LAYER_NODE_WIDTH / 2;
    })
    .attr('font-size', 11)
    .attr('dy', (d, nodeIndex, layerIndex) => getYScale(layerIndex)(1) / 2)
    .attr('text-anchor', 'middle')
    .attr('stroke-width', '.5')
    .attr('stroke', 'black')
    .attr('cursor', 'pointer')
    .text(d => d.bias);

  // elems.exit().remove();

  biasLabels.on('click', (d, nodeIndex, layerIndex) => {
    dispatch(setLayerModal({ nodeIndex, layerIndex }));
    d3.event.stopPropagation();
  });
}
