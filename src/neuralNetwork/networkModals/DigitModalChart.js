import _ from 'lodash';
import React from 'react';
import d3 from 'd3';

export default class extends React.Component {
  componentDidMount() {
    this._renderChart();
  }
  _renderChart() {

    const { data } = this.props;
    const width = 500;
    const barHeight = 45;

    const x = d3.scale.linear()
      .range([0, width - 80])
      .domain([0, _.max(data)]);

    const chart = d3.select(this.refs['digit-chart'])
      .attr('width', width)
      .attr('height', barHeight * data.length);

    const bar = chart.selectAll('g')
      .data(data)
      .enter()
      .append('g')
      .attr('transform', (d, i) => `translate(0,${i * barHeight})`);

    bar.append('rect')
      .attr('width', function (d) { return x(d)})
      .attr('fill', '#ef5350')
      .attr('x', 20)
      .attr('height', barHeight - 1);

    bar.append('text')
      .attr('x', 0)
      .attr('y', barHeight / 2)
      .attr('dy', '.35em')
      .attr('stroke-width', '1')
      .attr('font-size', 18)
      .attr('stroke', 'rgb(60,60,60)')
      .text((d, i) => i);

    bar.append('text')
      .attr('x', d => 25 + x(d))
      .attr('y', barHeight / 2)
      .attr('dy', '.35em')
      .text(d => {
        if (d) return d;
        return null;
      });
  }
  render() {
    return <svg ref="digit-chart"/>;
  }
}
