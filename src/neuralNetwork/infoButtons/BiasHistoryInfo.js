import _ from 'lodash';
import React from 'react';
import InfoButtonTemplate from './InfoButtonTemplate';
import LineChart from '../networkModals/LineChart';

export default class InfoButtons extends React.Component {
  constructor(props) {
    super(props);
    this._renderContent = this._renderContent.bind(this);
  }
  _renderContent() {
    const network = this.props.$$network.toJS();

    const labels = [];
    const biases = [];
    const series = [];

    Object.keys(network).map(epochIndex => {
      labels.push(`Epoch ${epochIndex}`);
      biases.push(_.flatten(network[epochIndex].biases[this.props.layer]));
    });

    for (let i = 0; i < biases.length; i++) {
      for (let j = 0; j < biases[i].length; j++) {
        if (!series[j]) {
          series[j] = [];
        }
        series[j].push(biases[i][j]);
      }
    }

    return <LineChart labels={labels} series={series}/>;
  }
  render() {
    return (
      <InfoButtonTemplate
        {...this.props}
        buttonLabel="Bias History"
        modalTitle="Bias History"
      >
        {this._renderContent()}
      </InfoButtonTemplate>
    );
  }
}
