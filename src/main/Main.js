import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Main from '../neuralNetwork/Main';
import injectTapEventPlugin from 'react-tap-event-plugin';
import IconButton from 'material-ui/lib/icon-button';
import ActionHome from 'material-ui/lib/svg-icons/action/home';

import './main.scss'
/**
 * It is common practice to have a 'Root' container/component require our main App (this one).
 * Again, this is because it serves to wrap the rest of our application with the Provider
 * component to make the Redux store available to the rest of the app.
 */
export default class App extends Component {
  render() {

    let classes = 'app-header ';
    if (this.props.hasSelectedDrawing) {
      classes += 'has-selected-drawing';
    }

    return (
      <div >
        <div className={classes}>
          <div>
            <IconButton style={{marginRight: '20px'}} iconClassName="icon-github-nn" />
            MNIST Neural Network Visualizer
          </div>
        </div>
        <Main/>
      </div>
    );
  }
}

App.propTypes = {
  counter: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired
};

/**
 * Keep in mind that 'state' isn't the state of local object, but your single
 * state in this Redux application. 'counter' is a property within our store/state
 * object. By mapping it to props, we can pass it to the child component Counter.
 */
function mapStateToProps($$state) {
  return {
    hasSelectedDrawing: !!$$state.getIn(['neuralNetwork', 'selectedDrawing'])
  };
}

/**
 * 'connect' is provided to us by the bindings offered by 'react-redux'. It simply
 * connects a React component to a Redux store. It never modifies the component class
 * that is passed into it, it actually returns a new connected componet class for use.
 *
 * More info: https://github.com/rackt/react-redux
 */

export default connect(
  mapStateToProps
)(App);
