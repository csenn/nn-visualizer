import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import NetworkGraph from './networkGraph/NetworkGraph';
import { getNetworks, getNetwork } from './data/neuralNetworkActions';
import LayerModal from './networkModals/LayerModal';
import DigitModal from './networkModals/DigitModal';
import NetworkToolbar from './networkToolbar/NetworkToolbar';
import InfoButtons from './infoButtons/InfoButtons';
import BottomDescription from './bottomDescription/BottomDescription';
import { feedDrawingThroughNetwork } from './networkUtils';
import './neuralNetwork.scss';
import CircularProgress from 'material-ui/lib/circular-progress';

class Main extends React.Component {
  constructor(props) {
    super(props);
    props.dispatch(getNetworks());
    props.dispatch(getNetwork('eta_.1_hidden_20_15_crossEntropy_improvedWeights_tanh.json'));
  }

  render() {
    if (this.props.isLoading || !this.props.selectedSnapshot) {
      return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
          <div style={{ marginBottom: '15px' }}>Loading</div>
          <CircularProgress size={3} />
        </div>
      );
    }

    const totalEpochs = _.max(
      Object.keys(this.props.selectedNetwork.snapshots).map(n => Number(n))
    );

    return (
      <div className="container text-center">
        <NetworkToolbar
          dispatch={this.props.dispatch}
          isDrawingSelected={!!this.props.selectedDrawing}
          snapshotIndex={this.props.snapshotIndex}
          selectedNetworkSummary={this.props.selectedNetworkSummary}
          totalEpochs={totalEpochs}
        />

        <div style={{ textAlign: 'center' }}>
          <NetworkGraph
            dispatch={this.props.dispatch}
            snapshotIndex={this.props.snapshotIndex}
            selectedSnapshot={this.props.selectedSnapshot}
            testResultsSummary={this.props.testResultsSummary}
            selectedDrawing={this.props.selectedDrawing}
          />
          <InfoButtons
            selectedNetwork={this.props.selectedNetwork}
            selectedNetworkSummary={this.props.selectedNetworkSummary}
            selectedDrawing={this.props.selectedDrawing}
          />
        </div>
        <BottomDescription/>
        <LayerModal
          dispatch={this.props.dispatch}
          selectedSnapshot={this.props.selectedSnapshot}
          selectedNetworkSummary={this.props.selectedNetworkSummary}
          selectedDrawing={this.props.selectedDrawing}
        />
        <DigitModal
          dispatch={this.props.dispatch}
          selectedSnapshot={this.props.selectedSnapshot}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    isLoading,
    snapshotIndex,
    networkSummaries,
    selectedNetwork,
    selectedNetworkSummaryId,
    selectedDrawing
  } = state.neuralNetwork;

  const selectedSnapshot = selectedNetwork.snapshots
    && selectedNetwork.snapshots[String(snapshotIndex)];

  const selectedNetworkSummary = _.find(networkSummaries, {
    path: selectedNetworkSummaryId
  });

  let testResultsSummary = null;
  if (selectedSnapshot) {
    const { testResults } = selectedSnapshot;
    testResultsSummary = Object.keys(testResults).reduce((prev, curr) => {
      const wrongCount = _.values(testResults[curr].wrong)
        .reduce((prev1, curr2) => prev1 + curr2.length, 0);
      return Object.assign({}, prev, {
        [curr]: {
          wrongCount,
          correctCount: testResults[curr].correct.length
        }
      });
    }, {});
  }

  if (selectedDrawing) {
    const [activations, zs] = feedDrawingThroughNetwork(
      selectedDrawing.x,
      selectedSnapshot.biases,
      selectedSnapshot.weights,
      selectedNetworkSummary
    );
    /* Let's cheat a bit and just pass activations and zs down with drawing */
    Object.assign(selectedDrawing, { activations, zs });
  }

  return {
    isLoading,
    snapshotIndex,
    networkSummaries,
    selectedNetwork,
    selectedDrawing,
    selectedSnapshot,
    testResultsSummary,
    selectedNetworkSummary
  };
};

export default connect(mapStateToProps)(Main);
