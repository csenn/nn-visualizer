import _ from 'lodash';
import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import RaisedButton from 'material-ui/lib/raised-button';
import { connect } from 'react-redux';
import { setDigitModal } from '../data/neuralNetworkActions';
import DigitModalChart from './DigitModalChart';

class LayerModal extends React.Component {
  constructor(props) {
    super(props);
    this._onClose = this._onClose.bind(this);
    this._renderChart = this._renderChart.bind(this);
    this._renderChartTitle = this._renderChartTitle.bind(this);
  }
  _onClose() {
    this.props.dispatch(setDigitModal(null));
  }
  _renderChart(isOpen) {
    if (!isOpen) {
      return false;
    }
    const { testResults } = this.props.selectedSnapshot;
    const count = testResults[this.props.digitModalIndex];
    const data = [];
    for (let i = 0; i < 10; i++) {
      data.push(count.wrong[i] ? count.wrong[i].length : 0);
    }
    return <DigitModalChart data={data}/>;
  }

  _renderChartTitle(isOpen) {
    if (!isOpen) {
      return false;
    }
    const { testResults } = this.props.selectedSnapshot;
    const count = testResults[this.props.digitModalIndex];
    const correct = count.correct.length;
    const wrong = _.flattenDeep(_.values(count.wrong)).length;
    const accuracy =  Math.round(correct / (correct + wrong) * 1000) / 10;

    return (
      <div>
        <div style={{ marginBottom: '5px', fontSize: '17px'}}>
          <strong>{correct} / {correct + wrong}</strong> ({accuracy}%) were categorized correctly
        </div>
        <div style={{color: 'rgb(160,160,160)', marginBottom: '15px'}}>
          Wrong guesses by digit shown below
        </div>
      </div>

    );
  }

  render() {
    const isOpen = _.isNumber(this.props.digitModalIndex);

    const title = (
      <div style={{ padding: '20px', fontSize: '24px', fontFamily: 'raleway',
        borderBottom: '1px solid rgb(230,230,230)', marginBottom: '15px'
      }}>
        Network accuracy of digit:
        <span style={{fontSize: '35px', fontWeight: 'bold', marginLeft: '10px'}}>
          {this.props.digitModalIndex}
        </span>
      </div>
    );

    const actions = [
      <RaisedButton
        label="Done"
        secondary
        onClick={this._onClose}
      />
    ];

    return (
      <Dialog
        title={title}
        actions={actions}
        modal={false}
        open={isOpen}
        bodyStyle={{ minHeight: '600px', position: 'relative',
          padding: 0, fontFamily: 'raleway', textAlign: 'center'
        }}
        onRequestClose={this.handleClose}
      >
        {this._renderChartTitle(isOpen)}
        {this._renderChart(isOpen)}
      </Dialog>
    );
  }
}

function mapStateToProps(state) {
  return {
    digitModalIndex: state.neuralNetwork.digitModal
  };
}

export default connect(mapStateToProps)(LayerModal);
