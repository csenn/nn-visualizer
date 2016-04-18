import d3 from 'd3';
import * as graphConstants from './graphConstants';

export default function (svg, nodes, hasTrainingPoint) {
  const yScale = d3.scale.linear()
    .domain([0, nodes.length])
    .range([0, graphConstants.HEIGHT]);

  svg.append('g')
    .selectAll('rect')
    .data(nodes)
    .enter()
    .append('rect')
    .attr('width', '10')
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
