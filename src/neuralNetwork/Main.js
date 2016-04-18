import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import NetworkGraph from './networkGraph/NetworkGraph';
import NetworkSummary from './NetworkSummary';
import { getNetwork, setSnapshotIndex } from './data/neuralNetworkActions';
// import { runNeuralNetwork } from './network/neuralNetwork.new';
import json from './network/data.json';
// import networkJson from './network/network.json'
import TrainingImage from './TrainingImage';

import RaisedButton from 'material-ui/lib/raised-button';


import Slider from 'material-ui/lib/slider';

export class Main extends React.Component {
  constructor(props) {
    super(props);
    props.dispatch(getNetwork(null));
    this._onSliderChange = this._onSliderChange.bind(this);
  }
  _onSliderChange() {
    const val = this.refs['snapshot-slider'].getValue();
    this.props.dispatch(setSnapshotIndex(val));
  }
  render() {
    // const trainingDataPoint = json[0];
    const trainingDataPoint = null;

    const $$snapshot = this.props.$$network.get(
      String(this.props.snapshotIndex)
    );
    if (!$$snapshot) {
      return false;
    }

    const max = Number(_.max(this.props.$$network.keySeq().toJS()));

    return (
      <div className="container text-center">
        EPOCH: {this.props.snapshotIndex}
        <div>
          TOTAL ACCURACY
        </div>
        <Slider
          ref='snapshot-slider'
          step={1}
          value={this.props.snapshotIndex}
          max={max}
          onDragStop={this._onSliderChange}/>
        <NetworkGraph
          $$snapshot={$$snapshot}
          testResultsSummary={this.props.testResultsSummary}
          trainingDataPoint={trainingDataPoint}/>
        <NetworkSummary $$testResults={$$snapshot.get('testResults')}/>
        <TrainingImage
          trainingDataPoint={trainingDataPoint}/>
      </div>
    );
  }
}

const mapStateToProps = ($$state) => {
  const snapshotIndex = $$state.getIn(['neuralNetwork', 'snapshotIndex']);
  const $$network = $$state.getIn(['neuralNetwork', 'network']);
  const $$testResults = $$network.getIn([String(snapshotIndex), 'testResults']);

  let testResultsSummary;
  if ($$testResults) {
    const testResults = $$testResults.toJS();
    testResultsSummary = Object.keys(testResults).reduce((prev, curr) => {
      const wrongCount = _.values(testResults[curr].wrong).reduce((prev1, curr2) => {
        return prev1 + curr2.length;
      }, 0);
      prev[curr] = {
        wrongCount,
        correctCount: testResults[curr].correct.length
      };
      return prev;
    }, {});
  }

  return { $$network, snapshotIndex, testResultsSummary };
};

export default connect(mapStateToProps)(Main);
