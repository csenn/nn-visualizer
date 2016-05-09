import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import RaisedButton from 'material-ui/lib/raised-button';
import { connect } from 'react-redux';
import { setLayerModal } from '../data/neuralNetworkActions';
import { calculateActivations, calculateSigmoid } from '../networkUtils';
import LatexRenderer from '../components/LatexRenderer';

class LayerModal extends React.Component {
  constructor(props) {
    super(props);
    this._renderCalculations = this._renderCalculations.bind(this);
    this._renderCalulationHeader = this._renderCalulationHeader.bind(this);
    this._onClose = this._onClose.bind(this);
    this._renderContent = this._renderContent.bind(this);
  }

  _onClose() {
    this.props.dispatch(setLayerModal(null));
  }

  _renderActivationCalculation(layerIndex, nodeIndex) {
    if (!this.props.selectedDrawing) {
      return <div style={{marginTop: '20px', color: 'rgb(140, 140, 140)'}}>
        Select a drawing on the previous page to see the activation calculated
      </div>
    }
    const weights = this.props.selectedSnapshot.weights[layerIndex][nodeIndex];
    const bias = this.props.selectedSnapshot.biases[layerIndex][nodeIndex][0];
    const roundedBias = Math.round(bias * 1000) / 1000;

    const summation = weights.reduce((prev, curr, index) => {
      const x = this.props.selectedDrawing.activations[layerIndex][index][0];
      return prev + x * curr;
    }, 0);
    const roundedSummation = Math.round(summation * 1000) / 1000;

    let str = 'a_{j}^{l} =\\sigma(' + roundedSummation + ' + ' + roundedBias + ')';
    str += '=' +  Math.round(calculateSigmoid(bias + summation) * 1000) / 1000;

    return (
      <div style={{ marginTop: '15px' }}>
        <LatexRenderer value={str}/>
      </div>
    );
  }
  _renderCalulationHeader(layerIndex, nodeIndex) {
    const all = (
      <span>
        <span style={{ display: 'inline-block', width: '100px', textAlign: 'center' }}>
          k (edge)
        </span>
        <span style={{ display: 'inline-block', width: '100px', textAlign: 'center' }}>
          <LatexRenderer value={'a_{k}^{' + (layerIndex + 1) + '}'}/>
        </span>
        <span style={{ display: 'inline-block', width: '5px', textAlign: 'center' }}>
          <LatexRenderer value="*"/>
        </span>
        <span style={{ display: 'inline-block', width: '100px', textAlign: 'center' }}>
          <LatexRenderer value={'w_{' + (nodeIndex + 1) + 'k}^{' + (layerIndex + 2) + '}'}/>
        </span>
      </span>
    );

    const whenTraining = !!this.props.selectedDrawing && (
      <span>
        <span style={{ display: 'inline-block', width: '5px', textAlign: 'center', color: 'rgb(130,130,130)' }}>
          =
        </span>
        <span style={{ display: 'inline-block', width: '100px', textAlign: 'center' }}>
          <LatexRenderer value={'a_{k}^{' + (layerIndex + 1) + '}*w_{' + (nodeIndex + 1) + 'k}^{' + (layerIndex + 2) + '}'}/>
        </span>
      </span>
    );

    const contentStyle = {
      fontWeight: 'bold',
      position: 'absolute',
      top: '90px',
      left: 0,
      right: 0,
    };

    return (
      <div style={contentStyle}>
        {all}
        {whenTraining}
      </div>
    );
  }

  _renderCalculations(layerIndex, nodeIndex) {

    const weights = this.props.selectedSnapshot.weights[layerIndex][nodeIndex];

    function getStyle(width, color) {
      return {
        display: 'inline-block',
        width: width || '100px',
        textAlign: 'center',
        color: color || 'rgb(30,30,30)'
      };
    }

    const weightViews = weights.map((weight, index) => {
      let x = null;
      let whenTraining = null;

      if (this.props.selectedDrawing) {
        x = Math.round(this.props.selectedDrawing.activations[layerIndex][index][0] * 1000) / 1000;
        const z = Math.round(x * weight * 1000) / 1000;
        whenTraining = (
          <span>
            <span style={getStyle('5px', 'rgb(140, 140, 140)')}>
              =
            </span>
            <span style={getStyle()}>{z}</span>
          </span>
        );
      } else {
        x = `a_${index + 1}`;
      }

      const all = (
        <span>
          <span style={getStyle()}>{index + 1}</span>
          <span style={getStyle()}>{x}</span>
          <span style={getStyle('5px', 'rgb(140, 140, 140)')}>*</span>
          <span style={getStyle()}>
            {Math.round(weight * 1000) / 1000}
          </span>
        </span>
      );

      return (
        <div>
          {all}
          {whenTraining}
        </div>
      );
    });

    const contentStyle = {
      position: 'absolute',
      top: '120px',
      left: 0,
      right: 0,
      bottom: 0,
      overflowY: 'scroll',
      background: 'rgb(245,245,245)'
    };

    return <div style={contentStyle}>{weightViews}</div>;
  }

  _renderContent(layerIndex, nodeIndex) {
    const isOpen = !!this.props.layerModalIndex;
    if (!isOpen) {
      return false;
    }

    return (
      <div>
        <div>
          <LatexRenderer value="a_{j}^{l} =\sigma(\sum_{k} a_{k}^{l-1} w_{jk}^{l} + b_{j}^{l})"/>
        </div>
        {this._renderActivationCalculation(layerIndex, nodeIndex)}
        {this._renderCalulationHeader(layerIndex, nodeIndex)}
        {this._renderCalculations(layerIndex, nodeIndex)}
      </div>
    )

  }

  render() {
    const isOpen = !!this.props.layerModalIndex;

    let title = false;
    let layerIndex = null;
    let nodeIndex = null;
    if (isOpen) {
      layerIndex = this.props.layerModalIndex.layerIndex;
      nodeIndex = this.props.layerModalIndex.nodeIndex;
      title = `Calculations in l=${layerIndex + 2} (layer) at j=${nodeIndex + 1} (node)`;
    }

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
        titleStyle={{ padding: '20px', fontFamily: 'raleway', textAlign: 'center', borderBottom: '1px solid rgb(230,230,230)', marginBottom: '15px' }}
        bodyStyle={{ minHeight: '600px', position: 'relative',
          padding: 0, fontFamily: 'raleway', textAlign: 'center'
        }}
        onRequestClose={this.handleClose}
      >
        {this._renderContent(layerIndex, nodeIndex)}
      </Dialog>
    );
  }
}

function mapStateToProps(state) {
  return {
    layerModalIndex: state.neuralNetwork.layerModal
  };
}

export default connect(mapStateToProps)(LayerModal);
