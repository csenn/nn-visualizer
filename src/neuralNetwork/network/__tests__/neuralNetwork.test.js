jest.unmock('../matrixUtils');
jest.unmock('../neuralNetwork.new');

import * as neuralNetwork from '../neuralNetwork.new';

describe('neural network methods', () => {

  describe('generateBiases', () => {
    it('should generate biases matrix from sizes of 2', () => {
      const sizes = [3, 4];
      const biases = neuralNetwork.generateBiases(sizes);
      expect(biases.length).toBe(1);
      expect(biases[0].length).toBe(4);
      expect(biases[0][0].length).toBe(1);
      expect(biases[0][0][0]).toEqual(jasmine.any(Number));
      expect(biases[0][1][0]).toEqual(jasmine.any(Number));
    });
    it('should generate biases matrix from sizes of 3', () => {
      const sizes = [3, 4, 5];
      const biases = neuralNetwork.generateBiases(sizes);
      expect(biases.length).toBe(2);
      expect(biases[0].length).toBe(4);
      expect(biases[1].length).toBe(5);
      expect(biases[0][0].length).toBe(1);
      expect(biases[0][0][0]).toEqual(jasmine.any(Number));
      expect(biases[0][1][0]).toEqual(jasmine.any(Number));
      expect(biases[1][0][0]).toEqual(jasmine.any(Number));
      expect(biases[1][1][0]).toEqual(jasmine.any(Number));
    });
    it('should generate biases matrix from sizes of 4', () => {
      const sizes = [10, 4, 5, 6];
      const biases = neuralNetwork.generateBiases(sizes);
      expect(biases.length).toBe(3);
      expect(biases[0].length).toBe(4);
      expect(biases[1].length).toBe(5);
      expect(biases[2].length).toBe(6);
      expect(biases[0][0].length).toBe(1);
    });
  });

  describe('generateWeights', () => {
    it('should generate weights matrix from sizes of 2', () => {
      const sizes = [3, 4];
      const biases = neuralNetwork.generateWeights(sizes);
      expect(biases.length).toBe(1);
      expect(biases[0].length).toBe(4);
      expect(biases[0][0].length).toBe(3);
      expect(biases[0][0][0]).toEqual(jasmine.any(Number));
      expect(biases[0][1][1]).toEqual(jasmine.any(Number));
    });

    it('should generate weights matrix from sizes of 3', () => {
      const sizes = [3, 4, 5];
      const biases = neuralNetwork.generateWeights(sizes);
      expect(biases.length).toBe(2);
      // 4 x 3
      expect(biases[0].length).toBe(4);
      expect(biases[0][0].length).toBe(3);
      // 5 x 4
      expect(biases[1].length).toBe(5);
      expect(biases[1][0].length).toBe(4);
      expect(biases[0][0][0]).toEqual(jasmine.any(Number));
      expect(biases[0][1][1]).toEqual(jasmine.any(Number));
    });
  });

  describe('splitIntoMiniBathces', () => {
    const data = [];
    for (let i = 0; i < 20; i++) {
      data.push(i);
    }
    it('should split data into batches', () => {
      const miniBatches = neuralNetwork.splitIntoMiniBatches(data, 5);
      expect(miniBatches.length).toBe(4);
      expect(miniBatches[0].length).toBe(5);
    });
    it('should split data into batches', () => {
      const miniBatches = neuralNetwork.splitIntoMiniBatches(data, 6);
      expect(miniBatches.length).toBe(4);
      expect(miniBatches[0].length).toBe(6);
      expect(miniBatches[3].length).toBe(2);
    });
  });

  describe('backProp', () => {
    it('should do back propragation correctly', () => {

      //sizes [2,3,2]
      const biases = [
        [
          [0.1],
          [- 0.1],
          [0.1]
        ],
        [
          [0.1],
          [-0.1]
        ]
      ];
      const weights = [
        [
          [0.1, -0.1],
          [0.1, -0.1],
          [0.1, -0.1]
        ],
        [
          [0.1, -0.1, 0.1],
          [0.1, -0.1, 0.1],
        ]
      ];

      const x = [[1], [1]]
      const y = [[0], [1]]

      const deltas = neuralNetwork.backProp(x, y, biases, weights);
      console.log(JSON.stringify(deltas, null, 4))
    });
  });

});
