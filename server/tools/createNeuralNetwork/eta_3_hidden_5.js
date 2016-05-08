var neuralNetworkRunner = require('../neuralNetworkRunner');

neuralNetworkRunner({
  sizes: [784, 5, 10],
  eta: 3
}, 'eta_3_hidden_5.json');
