import _ from 'lodash';
// import axios from 'axios';
import { batchActions } from 'redux-batched-actions';

import file1 from './networks/eta_.1_hidden_5_5_crossEntropy_improvedWeights.json';
import file2 from './networks/eta_.1_hidden_20_15_crossEntropy_improvedWeights_tanh.json';
import file3 from './networks/eta_.01_hidden_30_tanh.json';
import file4 from './networks/eta_.03_hidden_30_crossEntropy_improvedWeights_tanh.json';
import file5 from './networks/eta_.3_hidden_30_improvedWeights.json';
// import file6 from './networks/eta_.3_hidden_30.json';
import file7 from './networks/eta_3_hidden_5.json';
import file8 from './networks/eta_3_hidden_10.json';
import file9 from './networks/eta_3_hidden_20.json';
import file10 from './networks/eta_3_hidden_30.json';


export const SET_LOADING = 'SET_LOADING';
export const SET_NEURAL_NETWORKS = 'SET_NEURAL_NETWORKS';
export const SET_SELECTED_NEURAL_NETWORK = 'SET_SELECTED_NEURAL_NETWORK';
export const SET_SNAPSHOT_INDEX = 'SET_SNAPSHOT_INDEX';
export const SET_SELECTED_DRAWING = 'SET_SELECTED_DRAWING';
export const SET_SELECTED_NETWORK_SUMMARY_ID = 'SET_SELECTED_NETWORK_SUMMARY_ID';
export const SET_LAYER_MODAL = 'SET_LAYER_MODAL';
export const SET_DIGIT_MODAL = 'SET_DIGIT_MODAL';


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



const networks = [
  {
    path: 'eta_3_hidden_5.json',
    hiddenNodes: 5,
    eta: 3.0,
    activation: 'Logistic',
    accuracy: '87%',
    improvedWeightInit: false,
    cost: 'Quadratic',
    file: file7
  },
  {
    path: 'eta_3_hidden_10.json',
    hiddenNodes: 10,
    eta: 3.0,
    activation: 'Logistic',
    accuracy: '90%',
    improvedWeightInit: false,
    cost: 'Quadratic',
    file: file8
  },
  {
    path: 'eta_3_hidden_20.json',
    hiddenNodes: 20,
    eta: 3.0,
    activation: 'Logistic',
    accuracy: '93%',
    improvedWeightInit: false,
    cost: 'Quadratic',
    file: file9
  },
  {
    path: 'eta_.3_hidden_30.json',
    hiddenNodes: 30,
    eta: 0.3,
    activation: 'Logistic',
    accuracy: '82%',
    improvedWeightInit: false,
    cost: 'Quadratic',
    file: file10
  },
  {
    path: 'eta_.3_hidden_30_improvedWeights.json',
    hiddenNodes: 30,
    eta: 0.3,
    activation: 'Logistic',
    accuracy: '95%',
    improvedWeightInit: true,
    cost: 'Quadratic',
    file: file5
  },
  {
    path: 'eta_.01_hidden_30_tanh.json',
    hiddenNodes: '30',
    eta: 0.01,
    activation: 'Tanh',
    accuracy: '93%',
    improvedWeightInit: true,
    cost: 'Quadratic',
    file: file3
  },
  {
    path: 'eta_.3_hidden_30_crossEntropy_improvedWeights_tanh.json',
    hiddenNodes: 30,
    eta: 0.03,
    activation: 'Tanh',
    accuracy: '93%',
    improvedWeightInit: true,
    cost: 'Cross Entropy',
    file: file4
  },
  {
    path: 'eta_.1_hidden_5_5_crossEntropy_improvedWeights.json',
    hiddenNodes: '5, 5',
    eta: 0.1,
    activation: 'Logistic',
    accuracy: '88%',
    improvedWeightInit: true,
    cost: 'Cross Entropy',
    file: file1
  },
  {
    path: 'eta_.1_hidden_20_15_crossEntropy_improvedWeights_tanh.json',
    hiddenNodes: '20, 15',
    eta: 0.1,
    activation: 'Tanh',
    accuracy: '94%',
    improvedWeightInit: true,
    cost: 'Cross Entropy',
    file: file2
  }
];

// This should really call getNetwork with its first index, or a default network,
// or something along those lines...
export function getNetworks() {
  return dispatch => {
    dispatch({
      type: SET_NEURAL_NETWORKS,
      payload: networks
    });
  };
}

export function getNetwork(networkId) {
  return dispatch => {
    dispatch({
      type: SET_LOADING,
      payload: true
    })
    
    const network = networks.find(n => n.path === networkId);
    
    // return axios.get(`/network/${networkId}`).then(response => {
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
        payload: network.file
      },
      setSnapshotIndex(_.max(Object.keys(network.file.snapshots).map(num => parseInt(num, 10))))
    ]));
    // });
  };
}

export function setLayerModal(indexMap) {
  return {
    type: SET_LAYER_MODAL,
    payload: indexMap
  }
}

export function setDigitModal(index) {
  return {
    type: SET_DIGIT_MODAL,
    payload: index
  }
}
