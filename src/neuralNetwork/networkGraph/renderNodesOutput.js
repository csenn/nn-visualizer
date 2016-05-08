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
    .range([0, graphConstants.HEIGHT - graphConstants.HEADER_HEIGHT]);

  const elems = svg
    .selectAll('.output-nodes')
    .data(nodes);

  const enteringElems = elems
    .enter()
    .append('g')
    .attr('class', 'output-nodes')
    .attr('transform', (d, nodeIndex) => {
      const { WIDTH, OUTPUT_LAYER_NODE_WIDTH, OUTPUT_LAYER_LABEL } = graphConstants;
      const x = WIDTH - OUTPUT_LAYER_NODE_WIDTH - OUTPUT_LAYER_LABEL;
      const y = yScale(nodeIndex) + 2;
      return `translate(${x}, ${y})`;
    });

  enteringElems.append('rect')
    .attr('class', 'output-rect');

  enteringElems.append('rect')
    .attr('class', 'overlapping-rect');

  enteringElems.append('text')
    .attr('class', 'bias');

  enteringElems.append('text')
    .attr('class', 'output-number-label');

  enteringElems.append('text')
    .attr('class', 'percentage-label');

  elems.select('.output-rect')
    .attr('width', graphConstants.OUTPUT_LAYER_NODE_WIDTH - graphConstants.OUTPUT_LAYER_LABEL)
    .attr('height', yScale(1) - 4)
    .attr('ry', 3)
    .attr('fill', (d, i) => {
      if (hasTrainingPoint) {
        return i === maxIndex
          ? graphConstants.WITH_TRAINING_ON
          : graphConstants.WITH_TRAINING_OFF;
      }
      return graphConstants.NO_TRAINING_POSITIVE;
    });

  /* Rectangle below for color */
  elems.select('.overlapping-rect')
    .attr('width', graphConstants.OUTPUT_LAYER_NODE_WIDTH - graphConstants.OUTPUT_LAYER_LABEL)
    .attr('ry', 3)
    .attr('fill', graphConstants.NO_TRAINING_NEGATIVE)
    .attr('height', (d, i) => {
      if (hasTrainingPoint) {
        return 0;
      }
      const { correctCount, wrongCount } = testResultsSummary[i];
      const fraction = correctCount / (wrongCount + correctCount);
      let height = (1 - fraction) * yScale(1);
      if (height > yScale(1) - 4) {
        height = yScale(1) - 4;
      }
      return height;
    });

  // Accuracy text
  elems.select('.percentage-label')
    .attr('dx', (graphConstants.OUTPUT_LAYER_NODE_WIDTH - graphConstants.OUTPUT_LAYER_LABEL) / 2)
    .attr('dy', yScale(1) / 2)
    .attr('font-size', 10)
    .attr('text-anchor', 'middle')
    .attr('stroke-width', '.8')
    .attr('stroke', 'white')
    .text((d, i) => {
      if (hasTrainingPoint) {
        return d.activation;
      } else {
        const { correctCount, wrongCount } = testResultsSummary[i];
        const fraction = correctCount / (wrongCount + correctCount);
        return Math.round(fraction * 100) + '%';
      }
    });

  // Number Label
  elems.select('.output-number-label')
    .attr('dx', graphConstants.OUTPUT_LAYER_NODE_WIDTH)
    .attr('dy', yScale(1) / 2)
    .attr('stroke-width', '2')
    .attr('font-size', 28)
    .attr('text-anchor', 'middle')
    .attr('stroke', 'rgb(60,60,60)')
    .text((d, i) => i);

  // Bias
  elems.select('.bias')
    .attr('dx', - graphConstants.BIAS_LABEL_WIDTH + graphConstants.BIAS_LABEL_WIDTH / 2)
    .attr('dy', yScale(1) - yScale(1) / 2)
    .attr('font-size', 10)
    .attr('text-anchor', 'middle')
    .attr('stroke-width', '.5')
    .attr('stroke', 'black')
    .text(d => d.bias);
}
