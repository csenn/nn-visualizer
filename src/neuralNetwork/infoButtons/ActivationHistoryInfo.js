import _ from 'lodash';
import React from 'react';
import InfoButtonTemplate from './InfoButtonTemplate';
import LineChart from '../components/LineChart';
import { feedDrawingThroughNetwork } from '../networkUtils';


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
    const network = this.props.selectedNetwork.snapshots;
    const selectedDrawing = this.props.selectedDrawing;

    const labels = [];
    const activations = [];
    const series = [];

    Object.keys(network).map(epochIndex => {
      labels.push(`Epoch ${epochIndex}`);
      const [epochActivations, s] = feedDrawingThroughNetwork(
        selectedDrawing.x,
        network[epochIndex].biases,
        network[epochIndex].weights,
        this.props.selectedNetworkSummary
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

    return (
      <LineChart
        yAxisLabel="Activations"
        labels={labels}
        series={series}
        interpolation="monotone"
        getSeriesLabel={function (i) {return `Activation in node ${i}`;}}
      />
    );
  }
  render() {
    if (!this.props.selectedDrawing) {
      return false;
    }
    const modalTitle = 'Activation for drawing fed through in each Epoch'

    return (
      <InfoButtonTemplate
        {...this.props}
        buttonLabel="Activation History"
        modalTitle={modalTitle}
        renderContent={this._renderContent}
      />
    );
  }
}
