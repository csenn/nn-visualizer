import d3 from 'd3';
import * as graphConstants from './graphConstants';

export default function (svg, edges, start, end, numberNodes1, numberNodes2, hasTrainingData, thicken) {
  const yScale1 = d3.scale.linear()
    .domain([0, numberNodes1])
    .range([0, graphConstants.HEIGHT]);

  const yScale2 = d3.scale.linear()
    .domain([0, numberNodes2])
    .range([0, graphConstants.HEIGHT]);

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
        if (thicken) {
          return zScore * .7;
        } else {
          return zScore * .1;
        }
      }
    })
    .attr('x1', start)
    .attr('x2', `${end}`)
    .attr('y1', d => yScale1(d.source.index))
    .attr('y2', d => yScale2(d.target.index) + yScale2(1)/2)
    .style('stroke', d => {
      if (hasTrainingData) {
        return d.isOn
          ? graphConstants.WITH_TRAINING_ON
          : graphConstants.WITH_TRAINING_OFF;
      } else {
        // return d.weight > 0 ? NO_TRAINING_POSITIVE : NO_TRAINING_NEGATIVE;
        return d.weight > 0
          ? graphConstants.NO_TRAINING_NEGATIVE
          : graphConstants.NO_TRAINING_POSITIVE ;
      }
    });

}
