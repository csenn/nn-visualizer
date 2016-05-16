var neuralNetworkRunner = require('../neuralNetworkRunner');

neuralNetworkRunner({
  sizes: [784, 30, 10],
  eta: 3,
  costFunction: 'quadratic'
}, 'eta_3_hidden_30.json');
