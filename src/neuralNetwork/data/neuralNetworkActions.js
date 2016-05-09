import _ from 'lodash';
import axios from 'axios';
import { batchActions } from 'redux-batched-actions';

export const SET_LOADING = 'SET_LOADING';
export const SET_NEURAL_NETWORKS = 'SET_NEURAL_NETWORKS';
export const SET_SELECTED_NEURAL_NETWORK = 'SET_SELECTED_NEURAL_NETWORK';
export const SET_SNAPSHOT_INDEX = 'SET_SNAPSHOT_INDEX';
export const SET_SELECTED_DRAWING = 'SET_SELECTED_DRAWING';
export const SET_LAYER_MODAL = 'SET_LAYER_MODAL';
export const SET_SELECTED_NETWORK_SUMMARY_ID = 'SET_SELECTED_NETWORK_SUMMARY_ID';

export function setSnapshotIndex(index) {
  return {
    type: SET_SNAPSHOT_INDEX,
    payload: index
  };
}

export function setSelectedDrawing(drawing) {
  return {
    type: SET_SELECTED_DRAWING,
    payload: drawing
  };
}

// This should really call getNetwork with its first index, or a default network,
// or something along those lines...
export function getNetworks() {
  return dispatch => {
    return axios.get('/network').then(response => {
      dispatch({
        type: SET_NEURAL_NETWORKS,
        payload: response.data
      });
    });
  };
}

export function getNetwork(networkId) {
  return dispatch => {
    dispatch({
      type: SET_LOADING,
      payload: true
    })
    return axios.get(`/network/${networkId}`).then(response => {
      dispatch(batchActions([
        setSelectedDrawing(null),
        {
          type: SET_LOADING,
          payload: false
        },
        {
          type: SET_SELECTED_NETWORK_SUMMARY_ID,
          payload: networkId
        },
        {
          type: SET_SELECTED_NEURAL_NETWORK,
          payload: response.data
        },
        setSnapshotIndex(_.max(Object.keys(response.data.snapshots).map(num => parseInt(num))))
      ]));
    });
  };
}

export function setLayerModal(indexMap) {
  return {
    type: SET_LAYER_MODAL,
    payload: indexMap
  }
}
