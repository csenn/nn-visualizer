import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import { connect } from 'react-redux';
import Dialog from 'material-ui/lib/dialog';
import IconButton from 'material-ui/lib/icon-button';
import TrendingUp from 'material-ui/lib/svg-icons/action/trending-up';
import { calulatePerfFromTestResults } from '../networkUtils';
import LineChart from '../components/LineChart';

class NetworkHistoryModal extends React.Component {
  constructor(nextProps) {
    super(nextProps);
    this.state = {
      isOpen: false,
      selectedRowIndex: null
    };
    this._openModal = this._openModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this._renderContent = this._renderContent.bind(this);
  }
  _openModal() {
    this.setState({ isOpen: true });
  }
  _closeModal() {
    this.setState({ isOpen: false });
  }
  _renderContent() {
    if (!this.state.isOpen) {
      return false;
    }

    const labels = [];
    for (let i = 0; i < this.props.performance.length; i++) {
      labels.push(`Epoch ${i}`);
    }

    return (
      <LineChart
        minY={0}
        maxY={105}
        yAxisLabel="Performance %"
        labels={labels}
        series={[this.props.performance]}
        interpolation="linear"
        getSeriesLabel={function () {return `Performance`;}}
     />
    );
  }
  render() {
    const actions = [
      <RaisedButton
        label="Done"
        secondary
        onClick={this._closeModal}
      />
    ];

    return (
      <span>
        <IconButton style={{ position: 'relative', top: '7px' }} onClick={this._openModal}>
          <TrendingUp color='#00bcd4'/>
        </IconButton>
        <Dialog
          title="Network Performance History"
          actions={actions}
          modal={false}
          open={this.state.isOpen}
        >
        {this._renderContent()}
        </Dialog>
      </span>
    );
  }
}

function mapStateToProps(state) {
  const { snapshots } = state.neuralNetwork.selectedNetwork;
  const performance = Object.keys(snapshots).map(key => {
    const { testResults } = snapshots[key];
    return calulatePerfFromTestResults(testResults) * 100;
  });

  return { performance };
}

export default connect(mapStateToProps)(NetworkHistoryModal);
