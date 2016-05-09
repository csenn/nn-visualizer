import React from 'react';
import Slider from 'material-ui/lib/slider';
// import RaisedButton from 'material-ui/lib/raised-button';
import DrawingSlider from './DrawingSlider';
import NetworkChooser from './networkChooser/NetworkChooser';
import { setSnapshotIndex } from './data/neuralNetworkActions';
import IconButton from 'material-ui/lib/icon-button';
import TrendingUp  from 'material-ui/lib/svg-icons/action/trending-up';

const Item = props => {
  const style = {
    display: 'inline-block',
    marginLeft: '18px',
    fontSize: '18px'
    //color: 'rgb(100,100,100)'
  };
  return (
    <span style={style}>
      {props.label}: <strong style={{ color: 'rgb(10,10,10)' }}>{props.value}</strong>
    </span>
  );
};


export default class extends React.Component {
  constructor(props) {
    super(props);
    this._onSliderChange = this._onSliderChange.bind(this);
  }
  _onSliderChange() {
    const val = this.refs['snapshot-slider'].getValue();
    this.props.dispatch(setSnapshotIndex(val));
  }
  render() {
    const summary = this.props.selectedNetworkSummary;

    const snapshotIndex = parseInt(this.props.snapshotIndex);

    return (
      <div style={{ background:'white', padding: '15px 20px 1px 20px', marginBottom: '40px', textAlign: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <div style={{ marginTop: '5px', marginBottom: '25px' }}>

          <Item label="Model Accuracy" value={`${summary.accuracy}`}/>
          <IconButton style={{position: 'relative', top: '7px'}}>
            <TrendingUp  color='#00bcd4'/>
          </IconButton>
          <Item label="Hidden Nodes" value={summary.hiddenNodes}/>
          <Item label="Learning Rate" value={summary.eta}/>
          <Item label="Activation" value={summary.activation}/>
        </div>

        <NetworkChooser/>

        <div style={{ marginTop: '65px', marginBottom: '0px' }}>
          <DrawingSlider
            dispatch={this.props.dispatch}
            isDrawingSelected={this.props.isDrawingSelected}
          />
        </div>

        <div style={{ marginTop: '45px', position: 'relative', top: '5px', fontSize: '18px' }}>
          <strong>Epoch {snapshotIndex} of {this.props.totalEpochs }</strong>
          - Scroll through "learning phases"
        </div>
        <div style={{ width: '400px', display: 'inline-block' }}>
          <Slider
            ref="snapshot-slider"
            style={{ marginBottom: '20px' }}
            step={1}
            primary
            value={snapshotIndex}
            max={this.props.totalEpochs}
            onDragStop={this._onSliderChange}
          />
        </div>
      </div>
    );
  }
}
