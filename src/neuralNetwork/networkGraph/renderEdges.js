import d3 from 'd3';
import * as graphConstants from './graphConstants';

export default function (svg, edges, start, end, numberNodes1, numberNodes2,
  hasTrainingData, thicken, layer) {
  const yScale1 = d3.scale.linear()
    .domain([0, numberNodes1])
    .range([0, graphConstants.HEIGHT - graphConstants.HEADER_HEIGHT]);

  const yScale2 = d3.scale.linear()
    .domain([0, numberNodes2])
    .range([0, graphConstants.HEIGHT - graphConstants.HEADER_HEIGHT]);

  const lines = svg
    .selectAll(`.edge-${layer}`)
    .data(edges);

  lines.enter()
    .append('line')
    .attr('class', `edge-${layer}`)

  lines
    .attr('x1', start)
    .attr('x2', end)
    .attr('y1', d => yScale1(d.source.index) + yScale1(1) / 2)
    .attr('y2', d => yScale2(d.target.index) + yScale2(1) / 2)
    .attr('stroke-width', d => {
      const zScore = Math.abs(d.zScore);
      if (hasTrainingData) {
        if (thicken) {
          return d.isOn ? '1.5' : '.6';
        } else {
          return zScore * 0.08;
        }
      } else {
        if (thicken) {
          return zScore * 0.6;
        } else {
          return zScore * 0.07;
        }
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

  lines.exit().remove();
}
