import React from 'react';
import Slider from 'react-slick';
import TrainingImage from './TrainingImage'
import Toggle from 'material-ui/lib/toggle';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDrawingSelected: false
    }
    this._renderSlider = this._renderSlider.bind(this);
    this._onToggle = this._onToggle.bind(this);
  }
  _afterChange(i) {
    console.log(i)
  }
  _onToggle() {
    this.setState({
      isDrawingSelected: !this.state.isDrawingSelected
    })
  }
  _renderSlider() {
    if (this.state.isDrawingSelected) {
      const items = []
      for (let i=0; i< 10; i++) {
        items.push((
            <div style={{display: 'inline-block'}}>
              <TrainingImage trainingDataPoint={this.props.trainingDataPoint}/>
            </div>
        ))
      }

      return (
        <Slider
          style={{margin: '20px'}}
          centerMode={true}
          arrows={true}
          className="center-pic"
          infinite={true}
          speed={500}
          afterChange={this._afterChange}
          slidesToShow={5}>
          {items}
        </Slider>
      )
    }
  }
  render() {

    return (
      <div style={{display: 'inline-block', width: '400px'}}>
        <div>
          <div style={{display: 'inline-block', marginBottom: '50px'}}>
            <Toggle
              labelStyle={{fontFamily: 'Raleway', fontWeight: 'bold', fontSize: '18px'}}
              onToggle={this._onToggle}
              label="View MNIST drawings"
              labelPosition="right"
            />
          </div>
        </div>
        {this._renderSlider()}
      </div>
    )
  }
}
