var neuralNetworkRunner = require('../neuralNetworkRunner');

neuralNetworkRunner({
  sizes: [784, 30, 10],
  eta: 0.3,
  costFunction: 'quadratic'
}, 'eta_.3_hidden_30.json');
