import _ from 'lodash';
import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import { connect } from 'react-redux';
import { getNetwork } from '../data/neuralNetworkActions';
import Dialog from 'material-ui/lib/dialog';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/lib/Table';

class NetworkChooser extends React.Component {
  constructor(nextProps) {
    super(nextProps);
    this.state = {
      isOpen: false,
      selectedRowIndex: null
    };
    this._openModal = this._openModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this._renderContent = this._renderContent.bind(this);
    this._onRowSelection = this._onRowSelection.bind(this);
    this._selectNetwork = this._selectNetwork.bind(this);
  }
  _openModal() {
    this.setState({ isOpen: true });
  }
  _closeModal() {
    this.setState({ isOpen: false });
  }
  _onRowSelection(vals) {
    this.setState({ selectedRowIndex: vals[0] });
  }
  _selectNetwork(index) {
    const path = this.props.networkSummaries[index].path;
    this.props.dispatch(getNetwork(path));
    this.setState({ isOpen: false });
  }
  _renderContent() {
    if (!this.props.networkSummaries) {
      return false;
    }
    const rows = this.props.networkSummaries.map((summary, index) => {
      return (
        <TableRow key={summary.path} selected={this.state.selectedRowIndex === index}>
          <TableRowColumn>{summary.accuracy}</TableRowColumn>
          <TableRowColumn>{summary.hiddenNodes}</TableRowColumn>
          <TableRowColumn>{summary.eta}</TableRowColumn>
          <TableRowColumn>{summary.activation}</TableRowColumn>
        </TableRow>
      );
    });
    return (
      <Table onRowSelection={this._onRowSelection} >
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>Accuracy</TableHeaderColumn>
            <TableHeaderColumn># of Hidden Nodes</TableHeaderColumn>
            <TableHeaderColumn>Learning Rate</TableHeaderColumn>
            <TableHeaderColumn>Activation</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody deselectOnClickaway={false}>
          {rows}
        </TableBody>
      </Table>
    );
  }
  render() {
    const actions = [
      <RaisedButton
        label="Cancel"
        primary
        onClick={this._closeModal}
      />
    ];

    if (_.isNumber(this.state.selectedRowIndex)) {
      actions.push(
        <RaisedButton
          style={{ marginLeft: '10px' }}
          label="Select Network"
          secondary
          onClick={_.partial(this._selectNetwork, this.state.selectedRowIndex)}
        />
      );
    }

    return (
      <span>
        <RaisedButton
          secondary
          label="Choose Network Design"
          onClick={this._openModal}
        />
        <Dialog
          title="Choose a model to visualize"
          actions={actions}
          modal={false}
          open={this.state.isOpen}
        >
        {this._renderContent()}
        </Dialog>
      </span>
    );
  }
}

function mapStateToProps(state) {
  return {
    networkSummaries: state.neuralNetwork.networkSummaries
  };
}

export default connect(mapStateToProps)(NetworkChooser);
