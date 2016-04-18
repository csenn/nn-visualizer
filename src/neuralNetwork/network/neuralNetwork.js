// import math from 'mathjs'
import _ from 'lodash';
import {
  addMatrix,
  subtractMatrix,
  multiplyMatrix,
  crossProduct,
  transposeMatrix,
  applyFunctionOverMatrix
} from './matrixUtils';

// http://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve
function gaussian(mean, stdev) {
  let y2;
  let useLast = false;
  return function () {
    let y1;
    if (useLast) {
      y1 = y2;
      useLast = false;
    }
    else {
      let x1, x2, w;
      do {
        x1 = 2.0 * Math.random() - 1.0;
        x2 = 2.0 * Math.random() - 1.0;
        w = x1 * x1 + x2 * x2;
      } while (w >= 1.0);
      w = Math.sqrt((-2.0 * Math.log(w)) / w);
      y1 = x1 * w;
      y2 = x2 * w;
      useLast = true;
    }

    const retval = mean + stdev * y1;
    return retval;
    //    if(retval > 0)
    //        return retval;
    //    return -retval;
  };
}


function calculateSigmoid(num) {
  return 1 / (1 + Math.pow(Math.E, -num));
}

function calculateSigmoidPrime(num) {
  return calculateSigmoid(num) * (1 - calculateSigmoid(num));
}

function calculateCostDerivative(output, y) {
  return subtractMatrix(output, y);
}

export default class NeuralNetwork {

  constructor(options) {
    this.sizes = options.sizes;
    this.numLayers = options.sizes.length;
    this.biases = [];
    this.weights = [];

    const generator = gaussian(0, 1);

    // [64, 30, 10]
    for (let i = 1; i < this.numLayers; i++) {
      this.biases[i - 1] = [];
      for (let j = 0; j < this.sizes[i]; j++) {
        this.biases[i - 1][j] = [generator()];
      }
    }

    for (let i = 0; i < this.numLayers - 1; i++) {
      this.weights[i] = [];
      for (let j = 0; j < this.sizes[i + 1]; j++) {
        this.weights[i][j] = [];
        for (let k = 0; k < this.sizes[i]; k++) {
          this.weights[i][j][k] = generator();
        }
      }
    }
  }

  SGD(trainingData, epochs, miniBatchSize, eta, testData) {
    for (let i = 0; i < epochs; i++) {

      const shuffledData = _.shuffle(trainingData);

      const miniBatches = [];
      let miniBatchIndex = 0;
      for (let j = 0; j < shuffledData.length; j++) {
        if (miniBatchIndex % miniBatchSize === 0) {
          miniBatches.push([]);
        }
        miniBatches[miniBatches.length - 1].push(trainingData[j]);
        miniBatchIndex++;
      }

      miniBatches.forEach(batch => this.updateMiniBatch(batch, eta));

      if (testData) {
        let testResults = this.evaluate(testData)
        let count = 0
        for (let j = 0; j < testResults.length; j++) {
          if (testResults[j]) count++;
        }
        console.log(`Epoch ${i} complete: ${count} out of ${testResults.length}`)
      } else {
        console.log(`Epoch ${i} complete`);
      }

    }
  }

  evaluate(testData) {
    let results = []
    for (let i = 0; i < testData.length; i++) {
      const result = this.feedForward(testData[i][0]);
      const xResult = _.flattenDeep(result);
      const yResult = _.flattenDeep(testData[i][1]);

      let max = 0;
      let maxIndex = 0;
      for (let j = 0; j < xResult.length; j++) {
        if (xResult[j] > max) {
          max = xResult[j];
          maxIndex = j;
        }
      }
      results.push(!!yResult[maxIndex])
    }
    return results
  }

  feedForward(a) {
    for (let i = 0; i < this.biases.length; i++) {
      a = applyFunctionOverMatrix(addMatrix(
        crossProduct(this.weights[i], a),
        this.biases[i]
      ), calculateSigmoid);
    }
    return a;
  }

  updateMiniBatch(miniBatch, eta) {
    const nablaB = applyFunctionOverMatrix(this.biases, () => [0]);
    const nablaW = applyFunctionOverMatrix(this.weights, (val) => {
      return val.map(() => [0]);
    });

    for (let i = 0; i < miniBatch.length; i++) {
      const deltas = this.backProp(miniBatch[i][0], miniBatch[i][1]);
      for (let j = 0; j < nablaB.length; j++) {
        nablaB[j] = addMatrix(nablaB[j], deltas.nablaB[j]);
        nablaW[j] = addMatrix(nablaW[j], deltas.nablaW[j]);
      }
    }


    for (let i = 0; i < this.biases.length; i++) {
      const adjustBiases = applyFunctionOverMatrix(this.biases[i], num => {
        return num - (eta / miniBatch.length);
      });
      this.biases[i] = multiplyMatrix(adjustBiases, nablaB[i]);

      const adjustWeights = applyFunctionOverMatrix(this.weights[i], num => {
        return num - (eta / miniBatch.length);
      });
      this.weights[i] = multiplyMatrix(adjustWeights, nablaW[i]);
    }
  }

  backProp(x, y) {
    const nablaB = applyFunctionOverMatrix(this.biases, () => 0);
    const nablaW = applyFunctionOverMatrix(this.weights, () => 0);

    let activation = x;
    const activations = [x];
    const zs = [];
    // Feedforward
    for (let i = 0; i < this.biases.length; i++) {
      const cross = crossProduct(this.weights[i], activation);
      const z = addMatrix(cross, this.biases[i]);
      zs.push(z);
      activation = applyFunctionOverMatrix(z, calculateSigmoid);
      activations.push(activation);
    }

    const error = calculateCostDerivative(activation, y);
    const derivativeZ = applyFunctionOverMatrix(zs[zs.length - 1], calculateSigmoidPrime);

    // This is the error in the last layer
    let delta = multiplyMatrix(error, derivativeZ);


    nablaB[nablaB.length - 1] = delta;
    const tranposeSecondLastLayer = transposeMatrix(activations[activations.length - 2]);
    nablaW[nablaW.length - 1] = crossProduct(delta, tranposeSecondLastLayer);

    for (let i = this.numLayers - 2; i > 0; i--) {
      const z = zs[i - 1];
      const layerDerivative = applyFunctionOverMatrix(z, calculateSigmoidPrime);
      delta = multiplyMatrix(
        layerDerivative,
        crossProduct(transposeMatrix(this.weights[i]), delta)
      );
      nablaB[i - 1] = delta;
      nablaW[i - 1] = crossProduct(delta, transposeMatrix(activations[i - 1]));
    }

    return { nablaB, nablaW };
  }
}
