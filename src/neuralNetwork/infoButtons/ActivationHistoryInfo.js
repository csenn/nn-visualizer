import _ from 'lodash';
import React from 'react';
import InfoButtonTemplate from './InfoButtonTemplate';
import LineChart from '../networkModals/LineChart';
import { calculateActivations } from '../networkUtils';


/*
    Note: It would be interesting to add a graph for the change in biases,
    but also use the length of the vector as a smoother and simpler way
    of looking at (http://chortle.ccsu.edu/vectorlessons/vch04/vch04_4.html)
*/

export default class InfoButtons extends React.Component {
  constructor(props) {
    super(props);
    this._renderContent = this._renderContent.bind(this);
  }
  _renderContent() {
    const network = this.props.$$network.get('snapshots').toJS();
    const selectedDrawing = this.props.$$selectedDrawing.toJS();

    const labels = [];
    const activations = [];
    const series = [];

    Object.keys(network).map(epochIndex => {
      labels.push(`Epoch ${epochIndex}`);
      const epochActivations = calculateActivations(
        selectedDrawing.x,
        network[epochIndex].biases,
        network[epochIndex].weights
      );
      activations.push(epochActivations[this.props.layer]);
    });

    for (let i = 0; i < activations.length; i++) {
      for (let j = 0; j < activations[i].length; j++) {
        if (!series[j]) {
          series[j] = [];
        }
        series[j].push(activations[i][j][0]);
      }
    }

    return <LineChart labels={labels} series={series} interpolation="monotone"/>;
  }
  render() {
    if (!this.props.$$selectedDrawing) {
      return false;
    }
    const modalTitle = this.props.layer === 2
      ? 'Network Predictions For Current Drawing'
      : 'Activation History';

    return (
      <InfoButtonTemplate
        {...this.props}
        buttonLabel="Activation History"
        modalTitle={modalTitle}
      >
        {this._renderContent()}
      </InfoButtonTemplate>
    );
  }
}
