var neuralNetworkRunner = require('../neuralNetworkRunner');

neuralNetworkRunner({
  sizes: [784, 30, 10],
  eta: 0.03,
  costFunction: 'crossEntropy',
  activationType: 'tanh'
}, 'eta_.03_hidden_30_crossEntropy_improvedWeights_tanh.json');
