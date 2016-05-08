var neuralNetworkRunner = require('../neuralNetworkRunner');

neuralNetworkRunner({
  sizes: [784, 20, 10],
  eta: 3
}, 'eta_3_hidden_20.json');
