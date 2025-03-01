import React, { Component } from 'react';
import { connect } from 'react-redux';
import NeuralNetwork from '../neuralNetwork';
import injectTapEventPlugin from 'react-tap-event-plugin';
import IconButton from 'material-ui/lib/icon-button';
// import ActionHome from 'material-ui/lib/svg-icons/action/home';

import './main.css';

class App extends Component {
  _onGithubClick() {
    window.open('https://github.com/csenn/nn-visualizer', '_blank');
  }
  render() {
    let classes = 'app-header ';
    if (this.props.hasSelectedDrawing) {
      classes += 'has-selected-drawing';
    }

    return (
      <div >
        <div className={classes}>
          <div>
            <IconButton
              style={{ marginRight: '20px' }}
              iconClassName="icon-github-nn"
              onClick={this._onGithubClick}
            />
            MNIST Neural Network Visualizer
          </div>
        </div>
        <NeuralNetwork/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    hasSelectedDrawing: !!state.neuralNetwork.selectedDrawing
  };
}

export default connect(
  mapStateToProps
)(App);
