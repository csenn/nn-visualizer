var neuralNetworkRunner = require('../neuralNetworkRunner');

neuralNetworkRunner({
  sizes: [784, 20, 15, 10],
  eta: 0.1,
  costFunction: 'crossEntropy',
  activationType: 'tanh'
}, 'eta_.1_hidden_20_15_crossEntropy_improvedWeights_tanh.json');
