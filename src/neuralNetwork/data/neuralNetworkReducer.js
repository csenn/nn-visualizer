import { fromJS } from 'immutable';
import { createReducer } from 'redux-immutablejs';
import * as neuralNetworkActions from './neuralNetworkActions';

const initialState = {
  network: {},
  snapshotIndex: null
};

export default createReducer(initialState, {
  [neuralNetworkActions.GET_NEURAL_NETWORK]: (state, action) =>
    state.set('network', fromJS(action.payload)),

  [neuralNetworkActions.SET_SNAPSHOT_INDEX]: (state, action) =>
    state.set('snapshotIndex', action.payload)
});
