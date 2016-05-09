import _ from 'lodash';
import React from 'react';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import TrainingImage from './TrainingImage';
import Toggle from 'material-ui/lib/toggle';
import { setSelectedDrawing } from '../data/neuralNetworkActions';
import { uncompressImage } from '../networkUtils';
import LeftArrow from 'material-ui/lib/svg-icons/hardware/keyboard-arrow-left';
import RightArrow from 'material-ui/lib/svg-icons/hardware/keyboard-arrow-right';

function isInRange(index, nextIndex) {
  if (index === nextIndex) {
    return true;
  }
  if (index < nextIndex) {
    return Math.abs(index - nextIndex) < 4
      || Math.abs(30 + index - nextIndex) < 4;
  }
  return Math.abs(nextIndex - index) < 4
    || Math.abs(30 + nextIndex - index) < 4;
}

class DrawingSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDrawingSelected: false,
      selectedIndex: 0
    };
    this._renderSlider = this._renderSlider.bind(this);
    this._onToggle = this._onToggle.bind(this);
    this._afterChange = this._afterChange.bind(this);
  }
  _afterChange(i) {
    this.setState({ selectedIndex: i });
    this.props.dispatch(setSelectedDrawing(this.props.drawingSamples[i]));
  }
  _onToggle() {
    const nextSelected = !this.state.isDrawingSelected;
    this.setState({
      isDrawingSelected: nextSelected
    });

    if (nextSelected) {
      this._afterChange(0);
    } else {
      this.props.dispatch(setSelectedDrawing(null));
    }
  }
  _renderSlider() {
    if (!this.props.isDrawingSelected) {
      return false;
    }
    const items = this.props.drawingSamples.map((sample, index) => {
      if (!isInRange(this.state.selectedIndex, index)) {
        return <div/>;
      }
      return (
          <div style={{ display: 'inline-block', margin: '7px 0' }}>
            <TrainingImage trainingDataPoint={sample}/>
          </div>
      );
    });

    const iconStyle = {
      width: '60px',
      height: '60px',
      fill: '#00bcd4',
      top: '15px'
    };

    return (
      <Slider
        style={{ margin: '20px' }}
        centerMode
        arrows
        className="center-pic"
        infinite
        speed={200}
        afterChange={this._afterChange}
        slidesToShow={5}
        prevArrow = {function prev(options) {
          const style = Object.assign({ left: '-45px' }, iconStyle);
          return (
            <LeftArrow onClick={options.onClick} className="slick-prev" style={style}/>
          );
        }}
        nextArrow={function next(options) {
          const style = Object.assign({ right: '-45px' }, iconStyle);
          return (
            <RightArrow onClick={options.onClick} className="slick-next" style={style}/>
          );
        }}
      >
        {items}
      </Slider>
    );
  }
  render() {
    return (
      <div style={{ display: 'inline-block', width: '500px' }}>
        <div style={{ display: 'inline-block', marginTop: '15px', marginBottom: '25px' }}>
          <Toggle
            labelStyle={{ fontFamily: 'Raleway', fontSize: '26px' }}
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

function mapStateToProps(state) {
  const drawingSamples = [];
  const samples = state.neuralNetwork.selectedNetwork.drawingSamples;
  samples.forEach(sample => {
    const uncompressedImage = uncompressImage(sample.x);
    // uncompressedImage.unshift([0]);
    // uncompressedImage.unshift([0]);
    // uncompressedImage.unshift([0]);
    // uncompressedImage.unshift([0]);
    // uncompressedImage.unshift([0]);
    // uncompressedImage.unshift([0]);
    // uncompressedImage.unshift([0]);
    //
    // uncompressedImage.pop();
    // uncompressedImage.pop();
    // uncompressedImage.pop();
    // uncompressedImage.pop();
    // uncompressedImage.pop();
    // uncompressedImage.pop();
    // uncompressedImage.pop();

    drawingSamples.push({
      x: uncompressedImage,
      yIndex: sample.yIndex
    });
  });
  return { drawingSamples: _.sortBy(drawingSamples, d => d.yIndex) };
}

export default connect(mapStateToProps)(DrawingSlider);
