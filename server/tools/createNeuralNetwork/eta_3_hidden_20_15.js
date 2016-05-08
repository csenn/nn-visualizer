var neuralNetworkRunner = require('../neuralNetworkRunner');

neuralNetworkRunner({
  sizes: [784, 20, 15, 10],
  eta: 3
}, 'eta_3_hidden_20_15.json');
