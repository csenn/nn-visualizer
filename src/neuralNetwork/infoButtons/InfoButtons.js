import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import * as graphConstants from '../networkGraph/graphConstants';
import InputLayerInfo from './InputLayerInfo';
import HiddenLayerInfo from './HiddenLayerInfo';
import BiasHistoryInfo from './BiasHistoryInfo';
import ActivationHistoryInfo from './ActivationHistoryInfo';
import OutputLayerInfo from './OutputLayerInfo';

export default class InfoButtons extends React.Component {
  constructor(props) {
    super(props);
    this._isLong = this._isLong.bind(this);
    this._renderHiddenLayerButtons = this._renderHiddenLayerButtons.bind(this);
  }
  _isLong() {
    const biases = this.props.selectedNetwork.snapshots[0].biases;
    return biases.length === 3;
  }
  _renderHiddenLayerButtons() {
    const buttons = [];

    if (!this._isLong()) {
      buttons.push(
        <BiasHistoryInfo
          layer={0}
          selectedNetwork={this.props.selectedNetwork}
          style={{ top: '25px', left: `${graphConstants.WIDTH / 2 - z0}px` }}
        />,
        <ActivationHistoryInfo
          layer={1}
          selectedNetwork={this.props.selectedNetwork}
          selectedDrawing={this.props.selectedDrawing}
          style={{ top: '67px', left: `${graphConstants.WIDTH / 2 - 90}px` }}
        />
      );
    } else {
      buttons.push(
        <BiasHistoryInfo
          layer={0}
          selectedNetwork={this.props.selectedNetwork}
          style={{ top: '25px', left: `${graphConstants.WIDTH / 3 - 60}px` }}
        />,
        <BiasHistoryInfo
          layer={1}
          selectedNetwork={this.props.selectedNetwork}
          style={{ top: '25px', left: `${2 * graphConstants.WIDTH / 3 - 90}px` }}
        />,
        <ActivationHistoryInfo
          layer={1}
          selectedNetwork={this.props.selectedNetwork}
          selectedDrawing={this.props.selectedDrawing}
          style={{ top: '67px', left: `${graphConstants.WIDTH / 3 - 60}px` }}
        />,
        <ActivationHistoryInfo
          layer={2}
          selectedNetwork={this.props.selectedNetwork}
          selectedDrawing={this.props.selectedDrawing}
          style={{ top: '67px', left: `${2 * graphConstants.WIDTH / 3 - 90}px` }}
        />
      );
    }
    return buttons;
  }
  render() {
    const style = {
      position: 'relative',
      display: 'inline-block',
      width: `${graphConstants.WIDTH}px`,
      textAlign: 'left',
      marginTop: '10px'
    };
    // <HiddenLayerInfo
    //   style={{ top: '25px', left:`${graphConstants.WIDTH / 2 - 90}px` }}
    // />

    return (
      <div style={style}>
        <span style={{ fontSize: '13px', fontStyle: 'italic' }}>
          Click buttons for more info and charts
        </span>

        <InputLayerInfo style={{ top: '25px', left: 0 }}/>

        {this._renderHiddenLayerButtons()}

        <OutputLayerInfo style={{ top: '25px', right: '25px' }}/>

        <BiasHistoryInfo
          layer={this._isLong() ? 2 : 1}
          selectedNetwork={this.props.selectedNetwork}
          style={{ top: '67px', right: '25px' }}
        />

        <ActivationHistoryInfo
          layer={this._isLong() ? 3 : 2}
          selectedNetwork={this.props.selectedNetwork}
          selectedDrawing={this.props.selectedDrawing}
          style={{ top: '110px', right: '25px' }}
        />

      </div>
    );
  }
}
