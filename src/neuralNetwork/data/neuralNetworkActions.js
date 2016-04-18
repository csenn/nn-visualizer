import _ from 'lodash';
import axios from 'axios';
import { batchActions } from 'redux-batched-actions';

export const GET_NEURAL_NETWORK = 'GET_NEURAL_NETWORK';
export const SET_SNAPSHOT_INDEX = 'SET_SNAPSHOT_INDEX';

export function setSnapshotIndex(index) {
  return {
    type: SET_SNAPSHOT_INDEX,
    payload: index
  };
}

export function getNetwork(snapshot) {
  return dispatch => {
    return axios.get('/network').then(response => {
      dispatch(batchActions([
        {
          type: GET_NEURAL_NETWORK,
          payload: response.data
        },
        setSnapshotIndex(_.max(Object.keys(response.data)))
      ]));
    });
  };
}
