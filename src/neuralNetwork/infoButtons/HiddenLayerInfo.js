import React from 'react';
import InfoButtonTemplate from './InfoButtonTemplate';

export default class InfoButtons extends React.Component {
  render() {
    return (
      <InfoButtonTemplate
        {...this.props}
        buttonLabel="Hidden Layer"
        modalTitle="The Hidden Layers"
      >
        <p>
          The <strong>hidden layer</strong> does a bunch of stuff
        </p>
      </InfoButtonTemplate>
    );
  }
}
