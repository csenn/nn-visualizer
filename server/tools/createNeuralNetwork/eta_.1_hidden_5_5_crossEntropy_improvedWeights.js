var neuralNetworkRunner = require('../neuralNetworkRunner');

neuralNetworkRunner({
  sizes: [784, 5, 5, 10],
  eta: 0.1,
  costFunction: 'crossEntropy',
  activationType: 'sigmoid'
}, 'eta_.1_hidden_5_5_crossEntropy_improvedWeights.json');
