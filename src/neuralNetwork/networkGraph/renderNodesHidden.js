import d3 from 'd3';
import * as graphConstants from './graphConstants';

export default function (svg, nodes, hasTrainingPoint, onLayerModalOpen) {
  const yScale = d3.scale.linear()
    .domain([0, nodes.length])
    .range([0, graphConstants.HEIGHT - graphConstants.HEADER_HEIGHT]);

  const elemEnter = svg.append('g')
    .selectAll('g')
    .append('g')
    .data(nodes)
    .enter()
    .append('g')
    .attr('transform', (d, nodeIndex) => {
      const y = yScale(nodeIndex) + 0;
      const x = graphConstants.WIDTH / 2 - graphConstants.HIDDEN_LAYER_NODE_WIDTH / 2;
      return `translate(${x}, ${y})`;
    });

  if (hasTrainingPoint) {
    elemEnter.append('rect')
      .attr('width', graphConstants.HIDDEN_LAYER_NODE_WIDTH)
      .attr('height', yScale(1) - 4)
      .attr('rx', 3)
      .attr('ry', 3)
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

      elemEnter.append('text')
        .attr('dx', graphConstants.HIDDEN_LAYER_NODE_WIDTH / 2)
        .attr('font-size', 10)
        .attr('dy', d => 11)
        .attr('text-anchor', 'middle')
        .attr('stroke-width', '.5')
        .attr('stroke', d => d.activation > .5 ? 'black' : 'white')
        .text(d => d.activation);
  }

  // Bias Label
  const biasLabel = elemEnter.append('text')
    .attr('dx', () => {
      return hasTrainingPoint
        ? - graphConstants.BIAS_LABEL_WIDTH + graphConstants.BIAS_LABEL_WIDTH / 2
        : - graphConstants.BIAS_LABEL_WIDTH + graphConstants.BIAS_LABEL_WIDTH / 2 + graphConstants.HIDDEN_LAYER_NODE_WIDTH / 2
    })
    .attr('font-size', 11)
    .attr('dy', d => 11)
    .attr('text-anchor', 'middle')
    .attr('stroke-width', '.5')
    .attr('stroke', d => {
      return 'black';
      if (hasTrainingPoint) {
        return 'black';
      }
      return d.bias > 0
        ? graphConstants.NO_TRAINING_POSITIVE
        : graphConstants.NO_TRAINING_NEGATIVE;
    })
    .text(d => {
      return d.bias;
    });

  biasLabel.on('click', (d, index) => {
    onLayerModalOpen(index);
    d3.event.stopPropagation();
  });
}
