import d3 from 'd3';
import * as graphConstants from './graphConstants';

export default function (svg) {

  const LENGTH = graphConstants.WIDTH - graphConstants.OUTPUT_LAYER_NODE_WIDTH;

  const elemEnter = svg.append('g');

  elemEnter.append('text')
    .attr('dx', 0)
    .attr('dy', 11  )
    .attr('font-size', 11)
    .attr('text-anchor', 'left')
    .attr('stroke-width', '.5')
    .attr('stroke', 'rgb(60,60,60)')
    .text('784 Input Nodes');

  elemEnter.append('text')
    .attr('dx', LENGTH / 4 - 55)
    .attr('dy', 11)
    .attr('font-size', 11)
    .attr('text-anchor', 'left')
    .attr('stroke-width', '.5')
    .attr('stroke', 'rgb(60,60,60)')
    .text('784 x 30 = 23,520 edges');

  elemEnter.append('text')
    .attr('dx', LENGTH / 2 - 30)
    .attr('dy', 11)
    .attr('font-size', 11)
    .attr('text-anchor', 'left')
    .attr('stroke-width', '.5')
    .attr('stroke', 'rgb(60,60,60)')
    .text('30 Hidden Nodes');

    elemEnter.append('text')
      .attr('dx', LENGTH / 4 * 3 - 55)
      .attr('dy', 11)
      .attr('font-size', 11)
      .attr('text-anchor', 'left')
      .attr('stroke-width', '.5')
      .attr('stroke', 'rgb(60,60,60)')
      .text('30 x 10 = 300 edges');

    elemEnter.append('text')
      .attr('dx', graphConstants.WIDTH - 130)
      .attr('dy', 11)
      .attr('font-size', 11)
      .attr('text-anchor', 'left')
      .attr('stroke-width', '.5')
      .attr('stroke', 'rgb(60,60,60)')
      .text('10 output nodes');


}
