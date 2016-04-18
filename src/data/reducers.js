import { combineReducers } from 'redux-immutablejs';
import neuralNetworkReducer from '../neuralNetwork/data/neuralNetworkReducer'

export default combineReducers({
    neuralNetwork: neuralNetworkReducer
});
