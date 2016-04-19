import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import RaisedButton from 'material-ui/lib/raised-button';

export default class LayerModal extends React.Component {
  constructor(props) {
    super(props);
    this._renderContent = this._renderContent.bind(this);
  }
  _renderContent() {
    return (
      <div>asd
      </div>
    )
  }
  render() {
    const actions = [
      <RaisedButton
        label="Cancel"
        secondary
        onClick={this.props.onClose}/>
    ];

    return (
      <Dialog
        title="Change In Bias"
        actions={actions}
        modal={false}
        open={this.props.isOpen}
        onRequestClose={this.handleClose}>
        {this._renderContent()}
      </Dialog>
    );
  }
}
