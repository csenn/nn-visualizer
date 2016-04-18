var path = require('path');
var _ = require('lodash');
var jsonfile = require('jsonfile');
var neuralNetwork = require('../../../../neural-network-js');
var mnist = require('mnist-data');

var training_data = mnist.training(0, 1000);
var testing_data = mnist.testing(0, 500);

function makeArrayFromIndex(index) {
  var result = [];
  for (var i = 0; i < 10; i++) {
    if (i === index) {
      result.push([1]);
    } else {
      result.push([0]);
    }
  }
  return result;
}

function clean(data, isTest) {
  var results = [];
  var len = data.images.values.length;
  for (var i = 0; i < len; i++) {
    var image = data.images.values[i];
    var label = data.labels.values[i];

    var flattened = _.flatten(image);
    for (var j = 0; j < flattened.length; j++) {
      flattened[j] = [flattened[j] / 255];
    }

    var result = { x: flattened };
    if (isTest) {
      result.yIndex = label;
    } else {
      result.y = makeArrayFromIndex(label);
    }
    results.push(result);
  }
  return results;
}


var snapshots = {};

var epochCount = 6;

neuralNetwork.runNeuralNetwork({
  sizes: [784, 30, 10],
  trainingData: clean(training_data),
  epochs: epochCount,
  miniBatchSize: 10,
  eta: 3,
  testData: clean(testing_data, true),
  onStateUpdate: (networkState, epoch) => {
    snapshots[epoch] = networkState;
    if (epoch === epochCount) {
      var filePath = path.join(__dirname, '../', '../', 'json', 'networks', 'eta_hidden_30.json');
      jsonfile.writeFile(filePath, snapshots, function(err) {
        if (err) {
          console.error(err);
        } else {
          console.log('\nNetwork saved with epochs run: ' + epochCount);
        }
      });
    }
  }
});



// var file = 'data.json'
// var obj = {name: 'JP'}
//
// jsonfile.writeFile(file, done, function (err) {
//   console.error(err)
// })
