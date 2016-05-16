import React from 'react';
import InfoButtonTemplate from './InfoButtonTemplate';

export default class InfoButtons extends React.Component {
  _renderContent() {
    return (
      <div>
        <p>
          The output layer is the last layer in a neural network. When a network is being
          used for classification, the output layer is designed to represent the possible
          output values. In this example, the possible outcomes are the digits
          0-9.
        </p>
        <p>
          When the visualization is blue, the percentage on the node represents the accuracy
          of the network for that digit. When the visualization is yellow, the number
          is the activation of the node. The network "guesses" the digit with
          the highest activation.
        </p>
      </div>
    )
  }
  render() {
    return (
      <InfoButtonTemplate
        {...this.props}
        buttonLabel="Output Layer"
        modalTitle="The Output Layer"
        renderContent={this._renderContent}
      />
    );
  }
}
