// import { fromJS } from 'immutable';
// import { createReducer } from 'redux-immutablejs';
import * as neuralNetworkActions from './neuralNetworkActions';

const initialState = {
  isLoading: false,
  networkSummaries: null,
  selectedNetworkSummaryId: null,
  selectedNetwork: {},
  snapshotIndex: null,
  selectedDrawing: null,
  layerModal: null,
};

export default function neuralNetworkReducer(state = initialState, action) {
  switch (action.type) {
    case neuralNetworkActions.SET_LOADING:
      return Object.assign({}, state, { isLoading: action.payload });

    case neuralNetworkActions.SET_NEURAL_NETWORKS:
      return Object.assign({}, state, { networkSummaries: action.payload });

    case neuralNetworkActions.SET_SELECTED_NETWORK_SUMMARY_ID:
      return Object.assign({}, state, { selectedNetworkSummaryId: action.payload });

    case neuralNetworkActions.SET_SELECTED_NEURAL_NETWORK:
      return Object.assign({}, state, { selectedNetwork: action.payload });

    case neuralNetworkActions.SET_SNAPSHOT_INDEX:
      return Object.assign({}, state, { snapshotIndex: action.payload });

    case neuralNetworkActions.SET_SELECTED_DRAWING:
      return Object.assign({}, state, { selectedDrawing: action.payload });

    case neuralNetworkActions.SET_LAYER_MODAL:
      return Object.assign({}, state, { layerModal: action.payload });

    default:
      return state;

  }
}

// export default createReducer(initialState, {
//   [neuralNetworkActions.SET_LOADING]: (state, action) =>
//     state.set('isLoading', fromJS(action.payload)),
//
//   [neuralNetworkActions.SET_NEURAL_NETWORKS]: (state, action) =>
//     state.set('networks', fromJS(action.payload)),
//
//   [neuralNetworkActions.GET_NEURAL_NETWORK]: (state, action) =>
//     state.set('network', fromJS(action.payload)),
//
//   [neuralNetworkActions.SET_SNAPSHOT_INDEX]: (state, action) =>
//     state.set('snapshotIndex', action.payload),
//
//   [neuralNetworkActions.SET_SELECTED_DRAWING]: (state, action) =>
//     state.set('selectedDrawing', fromJS(action.payload)),
//
//   [neuralNetworkActions.SET_LAYER_MODAL]: (state, action) =>
//     state.set('layerModal', fromJS(action.payload))
// });
