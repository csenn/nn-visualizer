import React from 'react';
import d3 from 'd3';


const WIDTH = 50;
const HEIGHT = 50;

export default class TrainingImage extends React.Component {
  componentDidMount() {
    // debugger
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
    let row = -1;
    for (let i = 0; i < trainingDataPoint.x.length; i++) {
      if (i % 28 === 0) {
        row += 1;
      }
      result.push({
        row,
        col: i - row * 28,
        value: trainingDataPoint.x[i][0]
      })
    }
    return result;
  }
  buildTrainingImage(trainingDataPoint) {

    //const domNode = this.refs['training-image'];
    //d3.select(domNode).selectAll('*').remove();

    if (!trainingDataPoint) {
      return
    }

    const partitionedData = this.partitionData(trainingDataPoint);

    const squareScale = d3.scale.linear()
      .domain([0, 28])
      .range([0, WIDTH]);

    const colorFunc = point => {
      const num = point.value;
      // Will need this soon
      //const rgb = num * 255;
      const rgb = 255 - num;
      return `rgb(${rgb}, ${rgb}, ${rgb})`
    }

    // const svg = d3.select(domNode).append('svg')
    const svg = d3.select(this.refs['training-svg'])
      .attr('width', WIDTH)
      .attr('height', WIDTH);

    const rect = svg.selectAll('rect')
      .data(partitionedData)
      .enter()
      .append('rect')
      .attr('width', () => squareScale(1))
      .attr('height', () => squareScale(1))
      .attr('fill', colorFunc)
      .attr('stroke', colorFunc)
      .attr('transform', (d, xIndex) => {
        const x = squareScale(d.col);
        const y = squareScale(d.row)
        return `translate(${x}, ${y})`;
      });

    // rect.exit().remove();
  }

  render() {
    return(
      <div ref='training-image'>
        <svg ref='training-svg'/>
      </div>
    );
  }
}
