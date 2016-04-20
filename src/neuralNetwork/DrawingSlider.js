import React from 'react';
import Slider from 'react-slick';
import TrainingImage from './TrainingImage';
import Toggle from 'material-ui/lib/toggle';
import { setSelectedDrawing } from './data/neuralNetworkActions';
import json from './network/data.json';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDrawingSelected: false
    };
    this._renderSlider = this._renderSlider.bind(this);
    this._onToggle = this._onToggle.bind(this);
    this._afterChange = this._afterChange.bind(this);
  }
  _afterChange(i) {
    this.props.dispatch(setSelectedDrawing(json[i]));
  }
  _onToggle() {
    const nextSelected = !this.state.isDrawingSelected;
    this.setState({
      isDrawingSelected: nextSelected
    });
    setTimeout(() => {
      if (nextSelected) {
        this._afterChange(0);
      } else {
        this.props.dispatch(setSelectedDrawing(null));
      }
    }, 10);

  }
  _renderSlider() {
    if (this.props.isDrawingSelected) {
          const items = json.map(i => {
        return (
            <div style={{ display: 'inline-block' }}>
              <TrainingImage trainingDataPoint={i}/>
            </div>
        );
      });
          return (
        <Slider
          style={{ margin: '20px' }}
          centerMode
          dots
          arrows
          className="center-pic"
          infinite
          speed={500}
          afterChange={this._afterChange}
          slidesToShow={5}>
          {items}
        </Slider>
      );
        }
  }
  render() {

    return (
      <div style={{ display: 'inline-block', width: '400px' }}>

        <div style={{ display: 'inline-block', marginBottom: '10px' }}>
          <Toggle
            labelStyle={{ fontFamily: 'Raleway', fontSize: '18px' }}
            onToggle={this._onToggle}
            label="Feed network with MNIST drawings"
            labelPosition="right"
          />
        </div>

        {this._renderSlider()}
      </div>
    );
  }
}
