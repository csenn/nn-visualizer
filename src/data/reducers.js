// import { combineReducers } from 'redux-immutablejs';
import {combineReducers} from 'redux';
import neuralNetworkReducer from '../neuralNetwork/data/neuralNetworkReducer'

export default combineReducers({
  neuralNetwork: neuralNetworkReducer
})

// export default combineReducers({
//     neuralNetwork: neuralNetworkReducer
// });
