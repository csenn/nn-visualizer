import React from 'react';
import InfoButtonTemplate from './InfoButtonTemplate';

export default class InfoButtons extends React.Component {
  render() {
    return (
      <InfoButtonTemplate
        {...this.props}
        buttonLabel="Input Layer"
        modalTitle="The Input Layer"
      >
        <p>
          The <strong>input layer</strong> feeds data into the network. In this MNIST example, a 28x28 grid
          of handwritten pixels are flattened into <strong>784 input nodes</strong> (28x28=784). All squares have a number from 0 to 255 corresponding to their
          rgb color. Before the network is run, all each squares are reduced to a number between 0 and 1 by dividing each number by 255.
        </p>
        </InfoButtonTemplate>
    );
  }
}
