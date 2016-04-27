import d3 from 'd3';
import * as graphConstants from './graphConstants';

export default function (svg, nodes, hasTrainingPoint) {
  const yScale = d3.scale.linear()
    .domain([0, nodes.length])
    .range([0, graphConstants.HEIGHT - graphConstants.HEADER_HEIGHT]);

  const elems = svg
    .selectAll('.input-nodes')
    .data(nodes);

  const enteringElems = elems
    .enter()
    .append('rect')
    .attr('class', 'input-nodes')

  elems
    .attr('width', graphConstants.INPUT_LAYER_NODE_WIDTH)
    .attr('height', yScale(1))
    .attr('stroke-width', '.1')
    .attr('stroke', d => {
      if (hasTrainingPoint) {
        return d.activation
          ? graphConstants.WITH_TRAINING_ON
          : graphConstants.WITH_TRAINING_OFF;
      }
      return 'black';
    })
    .attr('fill', d => {
      if (hasTrainingPoint) {
        return d.activation
          ? graphConstants.WITH_TRAINING_ON
          : graphConstants.WITH_TRAINING_OFF;
      }
      return 'rgb(230, 230, 230)';
    })
    .attr('transform', (d, nodeIndex) => {
      const y = yScale(nodeIndex);
      return `translate(0, ${y})`;
    });
}
