import _ from 'lodash';
import React from 'react';
import InfoButtonTemplate from './InfoButtonTemplate';
import LineChart from '../components/LineChart';

export default class InfoButtons extends React.Component {
  constructor(props) {
    super(props);
    this._renderContent = this._renderContent.bind(this);
  }
  _renderContent() {
    const network = this.props.selectedNetwork;

    const labels = [];
    const biases = [];
    const series = [];

    Object.keys(network.snapshots).map(epochIndex => {
      labels.push(`Epoch ${epochIndex}`);
      biases.push(_.flatten(network.snapshots[epochIndex].biases[this.props.layer]));
    });

    for (let i = 0; i < biases.length; i++) {
      for (let j = 0; j < biases[i].length; j++) {
        if (!series[j]) {
          series[j] = [];
        }
        series[j].push(biases[i][j]);
      }
    }

    return (
      <LineChart
        yAxisLabel="Biases"
        labels={labels}
        series={series}
        getSeriesLabel={function (i) {return `Bias ${i}`;}}
      />
    )
  }
  render() {
    return (
      <InfoButtonTemplate
        {...this.props}
        buttonLabel="Bias History"
        modalTitle="Bias History"
        renderContent={this._renderContent}
      />
    );
  }
}
