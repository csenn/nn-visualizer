import _ from 'lodash';
import simpleStats from 'simple-statistics';
import { crossProduct, addMatrix, applyFunctionOverMatrix } from './network/matrixUtils';

function calculateSigmoid(num) {
  return 1 / (1 + Math.pow(Math.E, -num));
}

function roundThousandth(num) {
  return Math.round(num * 1000) / 1000
}

function calculateActivations(x, biases, weights) {
  let activation = x;
  const activations = [x];
  for (let i = 0; i < biases.length; i++) {
    const cross = crossProduct(weights[i], activation);
    const z = addMatrix(cross, biases[i]);
    activation = applyFunctionOverMatrix(z, calculateSigmoid);
    activations.push(activation);
  }
  return activations;
}

export function convertToGraph($$snapshot, dataPoint) {
  const nodes = [[]];
  let edges = [];


  const biases = $$snapshot.get('biases').toJS();
  const weights = $$snapshot.get('weights').toJS();

  let activations = null;
  if (dataPoint) {
    activations = calculateActivations(dataPoint.x, biases, weights);
  }

  // Use weights to get first layer count
  const firstLayerCount = $$snapshot.getIn(['weights', 0, 0]).size;

  for (let i = 0; i < firstLayerCount; i++) {
    const node = { index: i };
    if (activations) {
      node.activation = !!activations[0][i][0];
    }
    nodes[0].push(node);
  }

  biases.forEach((biasLayer, layerIndex) => {
    nodes.push([]);
    nodes[layerIndex + 1] = [];
    biasLayer.forEach((bias, biasIndex) => {
      const node = { bias: roundThousandth(bias[0])};
      if (activations) {
        node.activation = roundThousandth(activations[layerIndex + 1][biasIndex]);
      }
      nodes[layerIndex + 1][biasIndex] = node;
    });
  });

  const flatWights = _.flattenDeep(weights);
  const weightAverage = simpleStats.mean(flatWights);
  const weightStdDev = simpleStats.standardDeviation(flatWights);


  // Visually Examine Weights
  // console.log(_.take(_.sortBy(flatWights, w => - Math.abs(w)), 100));

  weights.forEach((weightLayer, layerIndex) => {
    weightLayer.forEach((weightRow, weightRowIndex) => {
      weightRow.forEach((weight, weightIndex) => {
        let edgeOn = false;
        if (layerIndex === 0) {
          if (nodes[0][weightIndex].activation) {
            edgeOn = true;
          }
        }
        if (layerIndex === 1 && activations) {
          if (activations[1][weightIndex][0] > 0.5) {
            edgeOn = true;
          }
        }

        edges.push({
          isOn: edgeOn,
          weight: weight,
          zScore: simpleStats.zScore(weight, weightAverage, weightStdDev),
          source: {
            layer: layerIndex,
            index: weightIndex
          },
          target: {
            layer: layerIndex + 1,
            index: weightRowIndex
          }
        });
      });
    });
  });

  if (activations) {
    edges = _.sortBy(edges, (e) => e.isOn);
  } else {
    edges = _.sortBy(edges, (e) => Math.abs(e.zScore));
  }

  return { nodes, edges, activations };
}
