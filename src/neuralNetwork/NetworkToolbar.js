import React from 'react';
import Slider from 'material-ui/lib/slider';
import RaisedButton from 'material-ui/lib/raised-button';
import DrawingSlider from './DrawingSlider';

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
    this.props.onSliderChange(val);
  }
  render() {

    const count = { correct: 0, total: 0 };
    Object.keys(this.props.testResultsSummary).forEach(k => {
      const item = this.props.testResultsSummary[k];
      count.correct += item.correctCount;
      count.total += item.correctCount + item.wrongCount;
    });

    const accuracy = Math.round(count.correct / count.total * 100);

    return (
      <div style={{ background:'white', padding: '15px 20px 1px 20px', marginBottom: '40px', textAlign: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <div style={{ marginTop: '20px', marginBottom: '25px' }}>
          <Item label="Model Accuracy" value={`${accuracy}%`}/>
          <Item label="Epochs" value={this.props.totalEpochs}/>
          <Item label="Hidden Layers" value="30"/>
          <Item label="Activation" value="Sigmoid"/>
        </div>
        <RaisedButton label="Choose Network Design" secondary />

        <div style={{ marginTop: '55px', position: 'relative', top: '5px', fontSize: '18px' }}>
          <strong>Epoch {this.props.snapshotIndex} of {this.props.totalEpochs }</strong>
          - Scroll through "learning phases"
        </div>
        <div style={{ width: '400px', display: 'inline-block' }}>
          <Slider
            ref="snapshot-slider"
            style={{ marginBottom: '20px' }}
            step={1}
            value={this.props.snapshotIndex}
            max={this.props.totalEpochs}
            onDragStop={this._onSliderChange}
          />
        </div>

        <div style={{ marginTop: '40px', marginBottom: '20px' }}>
          <DrawingSlider
            dispatch={this.props.dispatch}
            isDrawingSelected={this.props.isDrawingSelected}
          />
        </div>
      </div>
    );
  }
}
