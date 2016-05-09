import React from 'react';
import InfoButtonTemplate from './InfoButtonTemplate';

export default class InfoButtons extends React.Component {
  _renderContent() {
    return (
      <div>
        asdfasdf
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
