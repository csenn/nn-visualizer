import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import NetworkGraph from './networkGraph/NetworkGraph';
import NetworkSummary from './NetworkSummary';
import { getNetwork, setSnapshotIndex } from './data/neuralNetworkActions';
import json from './network/data.json';
import TrainingImage from './TrainingImage';
import LayerModal from './networkModals/LayerModal';
import Slider from 'material-ui/lib/slider';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';

export class Main extends React.Component {
  constructor(props) {
    super(props);
    props.dispatch(getNetwork(null));
    this._onSliderChange = this._onSliderChange.bind(this);
    this.state = {
      layerModalIndex: null,
      // biasModal
    };
    this.onLayerModalOpen = this.onLayerModalOpen.bind(this);
    this.onLayerModalClose = this.onLayerModalClose.bind(this);
  }
  onLayerModalOpen(index) {
    this.setState({ layerModalIndex: index });
  }
  onLayerModalClose() {
    this.setState({ layerModalIndex: null });
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

    const isAnyModalOpen = _.isNumber(this.state.layerModalIndex)

        // <NetworkSummary $$testResults={$$snapshot.get('testResults')}/>

    return (
      <div className="container text-center" style={{marginBottom: '50px'}}>
        <div style={{background:'white', padding: '20px 20px 1px 20px', marginBottom: '20px', textAlign: 'center'}}>
          <RaisedButton label='Choose Network Design'/>
          <div style={{marginTop: '10px'}}>
            Epochs: 6, Total Accuracy, Hidden Layers = 30, ETA = 3.0, Sigmoid
          </div>

          Epoch: {this.props.snapshotIndex}
          <div style={{width: '400px', display: 'inline-block'}}>
            <Slider
              ref='snapshot-slider'
              style={{marginBottom: '20px'}}
              step={1}
              value={this.props.snapshotIndex}
              max={max}
              onDragStop={this._onSliderChange}/>
          </div>
        </div>

        <TrainingImage
          trainingDataPoint={trainingDataPoint}/>

        <div style={{textAlign: 'center'}}>
          <NetworkGraph
            isAnyModalOpen={isAnyModalOpen}
            onLayerModalOpen={this.onLayerModalOpen}
            $$snapshot={$$snapshot}
            testResultsSummary={this.props.testResultsSummary}
            trainingDataPoint={trainingDataPoint}/>
        </div>

        <RaisedButton
          style={{marginLeft: '530px', marginTop: '10px'}}
          label="Layer 2 Bias History"
          onClick={_.partial(this.onLayerModalOpen, 1)}/>


        <LayerModal
          $$network={this.props.$$network}
          onClose={this.onLayerModalClose}
          layerModalIndex={this.state.layerModalIndex}/>
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
