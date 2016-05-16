var neuralNetworkRunner = require('../neuralNetworkRunner');

neuralNetworkRunner({
  sizes: [784, 10, 10],
  eta: 3,
  costFunction: 'quadratic'
}, 'eta_3_hidden_10.json');
