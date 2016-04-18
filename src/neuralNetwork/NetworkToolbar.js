import React from 'react';
import Slider from 'material-ui/lib/slider';
import RaisedButton from 'material-ui/lib/raised-button';

const Item = props => {
  const style = {
    display: 'inline-block',
    marginRight: '35px'
  }
  return (
    <span style={style}>
      {props.label}: <strong>{props.value}</strong>
    </span>
  )
}

export default class extends React.Component {
  render() {
    return (
      <div style={{ background:'white', padding: '25px 20px 1px 20px', marginBottom: '20px', textAlign: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <div style={{ marginBottom: '25px' }}>
          <Item label='Accuracy' value='85%'/>
          <Item label='Epochs' value='6'/>
          <Item label='Hidden Layers' value='30'/>
          <Item label='Activation' value='Sigmoid'/>
        </div>
        <div>

        <RaisedButton label='Choose Network Design'/>
        </div>

        Epoch: {this.props.snapshotIndex}
        <div style={{ width: '400px', display: 'inline-block' }}>
          <Slider
            ref='snapshot-slider'
            style={{ marginBottom: '20px' }}
            step={1}
            value={this.props.snapshotIndex}
            max={this.props.totalEpochs}
            onDragStop={this.props.onSliderChange}/>
        </div>
      </div>
    );
  }
}
