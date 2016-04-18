import _ from 'lodash';
import d3 from 'd3';
import * as graphConstants from './graphConstants';

export default function (svg, nodes, lastActivations, hasTrainingPoint, testResultsSummary) {

  let maxIndex = null;
  if (lastActivations) {
    const activations = _.flatten(lastActivations);
    maxIndex = _.findIndex(activations, a => a === _.max(activations));
  }

  const yScale = d3.scale.linear()
    .domain([0, nodes.length])
    .range([0, graphConstants.HEIGHT]);

  const elemEnter = svg
    .append('g')
    .selectAll('g')
    .data(nodes)
    .enter()
    .append('g')
    .attr('transform', (d, nodeIndex) => {
      const y = yScale(nodeIndex) + 2;
      return `translate(${graphConstants.WIDTH - graphConstants.OUTPUT_LAYER_NODE_WIDTH - graphConstants.OUTPUT_LAYER_LABEL}, ${y})`;
    });

  elemEnter.append('rect')
    .attr('width', graphConstants.OUTPUT_LAYER_NODE_WIDTH - graphConstants.OUTPUT_LAYER_LABEL)
    .attr('height', yScale(1) - 4)
      //.attr('rx', 3)
    .attr('ry', 3)
    // .attr('stroke', d => {
    //   if (hasTrainingPoint) {
    //     return d.activation > .5 ? WITH_TRAINING_ON : WITH_TRAINING_OFF;
    //   }
    //   return 'rgb(190, 190, 190)';
    // })
    .attr('fill', d => {
      if (hasTrainingPoint) {
        return d.activation > .5 ? graphConstants.WITH_TRAINING_ON : graphConstants.WITH_TRAINING_OFF;
      }
      return graphConstants.WITH_TRAINING_ON;
    });

  elemEnter.append('rect')
    .attr('width', graphConstants.OUTPUT_LAYER_NODE_WIDTH - graphConstants.OUTPUT_LAYER_LABEL)
    //.attr('rx', 3)
    .attr('ry', 3)
    .attr('height', (d, i) => {
      const { correctCount, wrongCount } = testResultsSummary[i];
      const fraction = correctCount / (wrongCount + correctCount);
      let height = (1 - fraction) * yScale(1);
      if (height > yScale(1) - 4) {
        height = yScale(1) - 4;
      }
      return height;
    })
    // .attr('stroke', d => {
    //   if (hasTrainingPoint) {
    //     return d.activation > .5 ? WITH_TRAINING_ON : WITH_TRAINING_OFF;
    //   }
    //   return 'rgb(190, 190, 190)';
    // })
    .attr('fill', d => {

      return graphConstants.WITH_TRAINING_OFF;
      if (hasTrainingPoint) {
        return d.activation > .5 ? graphConstants.WITH_TRAINING_ON : graphConstants.WITH_TRAINING_OFF;
      }
      return 'rgb(230, 230, 230)';
    });

  // Number Label
  elemEnter.append('text')
    .attr('dx', graphConstants.OUTPUT_LAYER_NODE_WIDTH)
    .attr('dy', yScale(1) / 2)
    .attr('stroke-width', '1.2')
    .attr('font-size', 20)
    .attr('text-anchor', 'middle')
    .text((d, i) => i);

  // Bias
  elemEnter.append('text')
    // .attr('dx', OUTPUT_LAYER_NODE_WIDTH / 2)
    .attr('dx', - graphConstants.BIAS_LABEL_WIDTH + graphConstants.BIAS_LABEL_WIDTH / 2)
    .attr('dy', d => yScale(1) - yScale(1) / 2)
    .attr('font-size', 11)
    .attr('text-anchor', 'middle')
    .attr('stroke-width', '.5')
    .attr('stroke', d => {
      return 'black';

      if (hasTrainingPoint) {
        return 'black';
      }
      return d.bias > 0 ? graphConstants.NO_TRAINING_POSITIVE : graphConstants.NO_TRAINING_NEGATIVE;
    })
    .text((d, i) => d.activation || d.bias);

    // Percentage correct
  elemEnter.append('text')
    .attr('dx', (graphConstants.OUTPUT_LAYER_NODE_WIDTH - graphConstants.OUTPUT_LAYER_LABEL) / 2)
    //.attr('dy', d => yScale(1) / 2)
    .attr('dy', yScale(1) / 2 - 3)
    .attr('font-size', 12)
    .attr('text-anchor', 'middle')
    .attr('stroke-width', '.5')
    .attr('stroke', d => {
      if (hasTrainingPoint) {
        return 'black';
      }
      return 'white';
      // return d.bias > 0 ? NO_TRAINING_POSITIVE : NO_TRAINING_NEGATIVE;
    })
    .text((d, i) => {
      const { correctCount, wrongCount } = testResultsSummary[i];
      const fraction = correctCount / (wrongCount + correctCount);
      return Math.round(fraction * 100) + '%';
    });

      // Accuracy text
  elemEnter.append('text')
    .attr('dx', (graphConstants.OUTPUT_LAYER_NODE_WIDTH - graphConstants.OUTPUT_LAYER_LABEL) / 2)
    .attr('dy', yScale(1) / 2 + 7)
    //.attr('dy', yScale(1) - 7)
    .attr('font-size', 8)
    .attr('text-anchor', 'middle')
    .attr('stroke-width', '.4')
    .attr('stroke', d => {
      if (hasTrainingPoint) {
        return 'black';
      }
      return 'white';
      // return d.bias > 0 ? NO_TRAINING_POSITIVE : NO_TRAINING_NEGATIVE;
    })
    .text('accuracy');
}
