import { fromJS } from 'immutable';
import { createReducer } from 'redux-immutablejs';
import * as neuralNetworkActions from './neuralNetworkActions';

const initialState = {
  isLoading: false,
  networks: null,
  network: {},
  snapshotIndex: null,
  selectedDrawing: null
};

export default createReducer(initialState, {
  [neuralNetworkActions.SET_LOADING]: (state, action) =>
    state.set('isLoading', fromJS(action.payload)),

  [neuralNetworkActions.SET_NEURAL_NETWORKS]: (state, action) =>
    state.set('networks', fromJS(action.payload)),

  [neuralNetworkActions.GET_NEURAL_NETWORK]: (state, action) =>
    state.set('network', fromJS(action.payload)),

  [neuralNetworkActions.SET_SNAPSHOT_INDEX]: (state, action) =>
    state.set('snapshotIndex', action.payload),

  [neuralNetworkActions.SET_SELECTED_DRAWING]: (state, action) =>
    state.set('selectedDrawing', fromJS(action.payload))
});
