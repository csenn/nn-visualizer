var path = require('path');
var _ = require('lodash');
var jsonfile = require('jsonfile');
var neuralNetwork = require('../../../../neural-network-js');
var mnist = require('mnist-data');

var training_data = mnist.training(0, 50000);
var testing_data = mnist.testing(0, 10000);

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


var compressImage = function(imageData) {
  var compressed = {}
  for (var j=0; j<imageData.length; j++) {
    var num = imageData[j][0];
    if (num !== 0) {
      compressed[j] = num;
    }
  }
  return compressed;
}

var compressResult = function(resultData) {
  return _.indexOf(_.flattenDeep(resultData), 1);
}

var cleanTrainingData = clean(training_data);

// Ensure there are no duplicates
var idsTaken = {};
function addSamples(drawingSample, ids, num) {
  var found = 0;
  for (var i=0; i<ids.length; i++) {
    if (!idsTaken[ids[i]]) {
      var trainingImage = cleanTrainingData[ids[i]];
      drawingSample.push({
        x: compressImage(trainingImage.x),
        yIndex: compressResult(trainingImage.y)
      })
      idsTaken[ids[i]] = true;
      found ++;
    }
    if (found === num) {
      break;
    }
  }
}


var epochCount = 10;
var network = {
  snapshots: {},
  drawingSamples: []
};

var t1 = new Date().getTime();

neuralNetwork.runNeuralNetwork({
  sizes: [784, 10, 10],
  trainingData: cleanTrainingData,
  epochs: epochCount,
  miniBatchSize: 10,
  eta: 3,
  testData: clean(testing_data, true),
  onStateUpdate: (networkState, epoch) => {

    network.snapshots[epoch] = networkState;

    if (epoch === epochCount) {

      for (key in network.snapshots[epoch].testResults) {
        var result = network.snapshots[epoch].testResults[key];
        addSamples(network.drawingSamples, result.correct, 2);
        addSamples(network.drawingSamples, _.shuffle(_.flatten(_.values(result.wrong))), 1);
      }

      var filePath = path.join(__dirname, '../', '../', 'json', 'networks', 'eta_3_hidden_10.json');
      jsonfile.writeFile(filePath, network, function(err) {
        if (err) {
          console.error(err);
        } else {
          console.log('\nNetwork saved with epochs run: ' + epochCount);
          console.log('Total time: ' + ((new Date().getTime() - t1) / 1000) + ' seconds')
        }
      });
    }
  }
});
