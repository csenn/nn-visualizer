import React from 'react';
import d3 from 'd3';


export default class TrainingImage extends React.Component {
  componentDidMount() {
    this.buildTrainingImage(this.props.trainingDataPoint);
  }
  componentDidUpdate() {
    this.buildTrainingImage(this.props.trainingDataPoint);
  }
  componentWillUnmount() {
  // debugger
  }
  partitionData(trainingDataPoint) {
    const result = [];
    for (let i = 0; i < trainingDataPoint.x.length; i++) {
      if (i % 28 === 0) {
        result.push([]);
      }
      result[result.length - 1].push(trainingDataPoint.x[i]);
    }
    return result;
  }
  buildTrainingImage(trainingDataPoint) {

    const domNode = this.refs['training-image'];
    d3.select(domNode).selectAll('*').remove();

    if (!trainingDataPoint) {
      return
    }

    const partitionedData = this.partitionData(trainingDataPoint);

    const squareScale = d3.scale.linear()
      .domain([0, 28])
      .range([0, 100]);

    const colorFunc = point => {
      const num = point[0];
      // Will need this soon
      //const rgb = num * 255;
      const rgb = 255 - num;
      return `rgb(${rgb}, ${rgb}, ${rgb})`
    }

    const svg = d3.select(domNode).append('svg')
      .attr('width', '100')
      .attr('height', '100');

    svg.selectAll('g')
      .data(partitionedData)
      .enter()
      .append('g')
      .attr('transform', (d, i) => `translate(0, ${squareScale(i)})`)
      .selectAll('rect')
      .data(d => d)
      .enter()
      .append('rect')
      .attr('width', () => squareScale(1))
      .attr('height', () => squareScale(1))
      .attr('fill', colorFunc)
      .attr('stroke', colorFunc)
      .attr('transform', (d, xIndex) => {
        const x = squareScale(xIndex);
        return `translate(${x}, 0)`;
      });
  }

  render() {
    return <div ref='training-image'/>;

  }
}
