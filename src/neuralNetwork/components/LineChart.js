import React from 'react';
import d3 from 'd3';
import _ from 'lodash';
import './lineChart.css';

export default class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this._renderChart = this._renderChart.bind(this);
  }
  componentDidMount() {
    this._renderChart();
  }
  componentDidUpdate() {
    this._renderChart();
  }
  componentWillUmount() {
    const domNode = this.refs['chart-box'];
    d3.select(domNode).selectAll('*').remove();
    d3.selectAll('.line-chart-tooltip').remove();
  }
  _renderChart() {
    const labels = this.props.labels;
    const series = this.props.series;
    const domNode = this.refs['chart-box'];

    const margin = { top: 0, right: 20, bottom: 50, left: 60 };
    const width = 700 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const xScale = d3.scale.linear()
      .range([0, width])
      .domain([-.5, labels.length - 1 + .5]);

    const vals = _.flatten(series);
    const min = _.min(vals);
    const max = _.max(vals);
    const y = d3.scale.linear()
      .range([height, 0])
      .domain([
        !_.isUndefined(this.props.minY) ? this.props.minY : min + 0.05 * min,
        !_.isUndefined(this.props.maxY) ? this.props.maxY : max + 0.05 * max
      ]); // wont work in some cases

    const colorFunc = d3.scale.category10()
      .domain(labels);

    const xAxis = d3.svg.axis()
      .scale(xScale)
      .orient('bottom');

    const yAxis = d3.svg.axis()
      .scale(y)
      .orient('left')
      .innerTickSize(-width)
      .outerTickSize(0)
      .tickPadding(10);

    const line = d3.svg.line()
      .interpolate(this.props.interpolation || 'cardinal')
      .x((d, i) => xScale(i))
      .y(d => y(d));

    // Define the div for the tooltip. Make sure none already exist.
    const div = d3.select(domNode)
      .append('div')
      .attr('class', 'line-chart-tooltip')
      .style('opacity', 0);

    const svg = d3.select(domNode)
      .append('svg')
      .attr('class', 'line-chart-svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis)
      .append('text')
      .attr('y', 40)
      .attr('x', width / 2 + 100)
      .style('text-anchor', 'end')
      .text('Epochs - (Learning Phases)');

    svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -45)
      .attr('x', -height / 2 + 30)
      .style('text-anchor', 'end')
      .text(this.props.yAxisLabel);

    const lineSvg = svg.selectAll('.line')
        .data(series)
        .enter().append('g')
        .attr('class', 'line');

    lineSvg.append('path')
        .attr('class', 'line')
        .attr('d', d => line(d))
        .attr('fill', 'none')
        .style('stroke', colorFunc);

    // Add the scatterplot
    svg.selectAll('dot')
        .data(series)
        .enter()
        .append('g')
        .selectAll('circle')
        .data(d => d)
        .enter()
        .append('circle')
        .attr('cursor', 'crosshair')
        .attr('r', 2)
        .attr('cx', (d, i) => xScale(i))
        .attr('cy', d => y(d))
        .attr('fill', (d, i, i2) => colorFunc(i2))
        .on('mouseover', (d, i, i2) => {
          const coord = d3.mouse(domNode);
          const seriesLabel = this.props.getSeriesLabel(i2 + 1);
          const tooltipHtml = `
            <div>
              <div style="padding-bottom:3px;">${seriesLabel}</div>
              <strong>${Math.round(d * 10000) / 10000}</strong>
            </div>
          `;
          div.transition()
            .duration(200)
            .style('opacity', .9);
          div.html(tooltipHtml)
            .style('left', (coord[0] - 50) + 'px')
            .style('top', (coord[1] - 40) + 'px');
        })
        .on('mouseout', function (d) {
          div.transition()
            .duration(500)
            .style('opacity', 0);
        });
  }

  render() {
    return <div style={{ position:'relative' }} ref='chart-box'></div>;
  }
}
