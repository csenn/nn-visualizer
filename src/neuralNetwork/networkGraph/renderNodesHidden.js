import d3 from 'd3';
import * as graphConstants from './graphConstants';

export default function (svg, nodes, hasTrainingPoint, onLayerModalOpen) {
  const yScale = d3.scale.linear()
    .domain([0, nodes.length])
    .range([0, graphConstants.HEIGHT - graphConstants.HEADER_HEIGHT]);

  const elems = svg
    .selectAll('.hidden-nodes')
    .data(nodes);

  const enteringElems = elems
    .enter()
    .append('g')
    .attr('class', 'hidden-nodes')
    .attr('transform', (d, nodeIndex) => {
      const y = yScale(nodeIndex) + 0;
      const x = graphConstants.WIDTH / 2 - graphConstants.HIDDEN_LAYER_NODE_WIDTH / 2;
      return `translate(${x}, ${y})`;
    });

    // Rectangle Node
    enteringElems
      .append('rect')
      .attr('class', 'hidden-node-rect')

    elems.select('.hidden-node-rect')
      .attr('width', graphConstants.HIDDEN_LAYER_NODE_WIDTH)
      .attr('height', yScale(1) - 4)
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
      .attr('class', 'hidden-node-text')

    elems.select('.hidden-node-text')
        .attr('dx', graphConstants.HIDDEN_LAYER_NODE_WIDTH / 2)
        .attr('font-size', 10)
        .attr('dy', d => yScale(1) / 2)
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
  elems
    .select('.bias')
    .attr('dx', () => {
      const { BIAS_LABEL_WIDTH, HIDDEN_LAYER_NODE_WIDTH } = graphConstants;
      return hasTrainingPoint
        ? - BIAS_LABEL_WIDTH + BIAS_LABEL_WIDTH / 2
        : - BIAS_LABEL_WIDTH + BIAS_LABEL_WIDTH / 2 + HIDDEN_LAYER_NODE_WIDTH / 2;
    })
    .attr('font-size', 11)
    .attr('dy', yScale(1) / 2 + 2)
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
    .text(d => d.bias);

  // elems.exit().remove();

  // biasLabel.on('click', (d, index) => {
  //   onLayerModalOpen(index);
  //   d3.event.stopPropagation();
  // });
}
