import d3 from 'd3';
import * as graphConstants from './graphConstants';

export default function (svg, hiddenCount) {

  const LENGTH = graphConstants.WIDTH - graphConstants.OUTPUT_LAYER_NODE_WIDTH;

  const elemEnter = svg.append('g');

  elemEnter.append('text')
    .attr('dx', 0)
    .attr('dy', 9)
    .attr('font-size', 12)
    .attr('text-anchor', 'left')
    .attr('stroke-width', '1')
    .attr('stroke', 'rgb(60,60,60)')
    .text('784 Input Nodes');

  elemEnter.append('text')
    .attr('dx', LENGTH / 4 - 55)
    .attr('dy',  9)
    .attr('font-size', 12)
    .attr('text-anchor', 'left')
    .attr('stroke-width', '1')
    .attr('stroke', 'rgb(60,60,60)')
    .text(`784 x ${hiddenCount} = ${hiddenCount * 784} edges`);

  elemEnter.append('text')
    .attr('dx', LENGTH / 2 - 30)
    .attr('dy',  9)
    .attr('font-size', 12)
    .attr('text-anchor', 'left')
    .attr('stroke-width', '1')
    .attr('stroke', 'rgb(60,60,60)')
    .text(`${hiddenCount} Hidden Nodes`);

    elemEnter.append('text')
      .attr('dx', LENGTH / 4 * 3 - 55)
      .attr('dy',  9)
      .attr('font-size', 12)
      .attr('text-anchor', 'left')
      .attr('stroke-width', '1')
      .attr('stroke', 'rgb(60,60,60)')
      .text(`${hiddenCount} x 10 = ${hiddenCount * 10} edges`);

    elemEnter.append('text')
      .attr('dx', graphConstants.WIDTH - 130)
      .attr('dy',  9)
      .attr('font-size', 12)
      .attr('text-anchor', 'left')
      .attr('stroke-width', '1')
      .attr('stroke', 'rgb(60,60,60)')
      .text('10 output nodes');


}
