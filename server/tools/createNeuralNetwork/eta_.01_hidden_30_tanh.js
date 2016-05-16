var neuralNetworkRunner = require('../neuralNetworkRunner');

neuralNetworkRunner({
  sizes: [784, 30, 10],
  eta: .01,
  // costFunction: 'crossEntropy',
  costFunction: 'quadratic',
  // activationType: 'sigmoid',
  activationType: 'tanh',
  // activationType: 'relu'
}, 'blah.json');


// Neuron Functions
// var ACTIVATION_TYPE = {
//   sigmoid: {
//     func: function(num) {
//       return 1 / (1 + Math.pow(Math.E, -num));
//     }
//   },
//   tanh: {
//     func: function(num) {
//       const exponent = Math.pow(Math.E, -2 * num);
//       return (1 - exponent) / (1 + exponent);
//       // return Math.tanh(num);
//     }
//   },
// }
//
//
// var nums = [-10, -9, -8, -7 ,-6, -5, -4 -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
//
//
// for (var i=0; i< nums.length; i++) {
//   console.log('a', ACTIVATION_TYPE.sigmoid.func(nums[i]))
//   console.log('b', ACTIVATION_TYPE.tanh.func(nums[i]))
//   console.log('b', Math.tanh(nums[i]))
// }
