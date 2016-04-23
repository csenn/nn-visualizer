import React from 'react';
import InfoButtonTemplate from './InfoButtonTemplate';

export default class InfoButtons extends React.Component {
  render() {
    return (
      <InfoButtonTemplate
        {...this.props}
        buttonLabel="Output Layer"
        modalTitle="The Output Layer"
      >
        <p>
          The <strong>output layer</strong> shows the results of the network.
        </p>
      </InfoButtonTemplate>
    );
  }
}
