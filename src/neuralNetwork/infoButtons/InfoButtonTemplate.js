import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';

export default class InfoButtons extends React.Component {
  constructor(nextProps) {
    super(nextProps);
    this.state = {
      isOpen: false
    };
    this._openModal = this._openModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
  }
  _openModal() {
    this.setState({ isOpen: true });
  }
  _closeModal() {
    this.setState({ isOpen: false });
  }
  render() {
    const styles = Object.assign({
      position: 'absolute'
    }, this.props.styles);

    const actions = [
      <RaisedButton
        label="Cancel"
        secondary
        onClick={this._closeModal}
      />
    ];

    return (
      <span style={styles}>
        <RaisedButton
          style={{width: '175px'}}
          label={this.props.buttonLabel}
          onClick={this._openModal}
        />
        <Dialog
          title={this.props.modalTitle}
          actions={actions}
          modal={false}
          open={this.state.isOpen}
          onRequestClose={this._closeModal}
        >
          <div style={{lineHeight: '1.5'}}>
            {this.props.children}
          </div>
        </Dialog>
      </span>
    );
  }
}
