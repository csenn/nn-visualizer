jest.unmock('../matrixUtils');

import * as matrixUtils from '../matrixUtils';

describe('matrixUtils', () => {
  describe('crossProduct', () => {
    it('should find the cross product', () => {
      const m = [
          [1, 2, 3],
          [4, 5, 6]
      ];
      const n = [
          [7, 8],
          [9, 10],
          [11, 12]
      ];
      const result = matrixUtils.crossProduct(m, n);

      expect(result[0][0]).toBe(58);
      expect(result[0][1]).toBe(64);
      expect(result[1][0]).toBe(139);
      expect(result[1][1]).toBe(154);
    });
  });

  describe('addMatrix', () => {
    it('should find the cross product', () => {
      const m = [
        [1, 2, 3],
        [4, 5, 6]
      ];
      const n = [
        [1, 2, 3],
        [4, 5, 6]
      ];
      const result = matrixUtils.addMatrix(m, n);

      expect(result[0][0]).toBe(2);
      expect(result[0][1]).toBe(4);
      expect(result[0][2]).toBe(6);
      expect(result[1][0]).toBe(8);
      expect(result[1][1]).toBe(10);
      expect(result[1][2]).toBe(12);
    });
  });

  describe('applyFunctionOverMatrix', () => {
    it('should apply a function over every item in the matrix', () => {
      const m = [
        [1, 2, 3],
        [4, 5, 6]
      ];
      const result = matrixUtils.applyFunctionOverMatrix(m, num => num * 2);

      expect(result[0][0]).toBe(2);
      expect(result[0][1]).toBe(4);
      expect(result[0][2]).toBe(6);
      expect(result[1][0]).toBe(8);
      expect(result[1][1]).toBe(10);
      expect(result[1][2]).toBe(12);
    });
  });

  describe('transposeMatrix', () => {
    it('should find the tranpose of the matrix', () => {
      const m = [
        [1, 2, 3],
        [4, 5, 6]
      ];
      const result = matrixUtils.transposeMatrix(m);

      expect(result[0][0]).toBe(1);
      expect(result[0][1]).toBe(4);
      expect(result[1][0]).toBe(2);
      expect(result[1][1]).toBe(5);
      expect(result[2][0]).toBe(3);
      expect(result[2][1]).toBe(6);
    });
  });

  describe('applyFunctionOverMatrix', () => {
    const func = (num) => num;
    it('should add zeros to matrix', () => {
      const m = [1, 2];
      const result = matrixUtils.applyFunctionOverMatrix(m, func);
      expect(result[0]).toBe(1);
      expect(result[1]).toBe(2);
    });

    it('should add zeros to matrix', () => {
      const m = [
        [1, 2],
        [4, 5]
      ];
      const result = matrixUtils.applyFunctionOverMatrix(m, func);
      expect(result[0][0]).toBe(1);
      expect(result[0][1]).toBe(2);
      expect(result[1][0]).toBe(4);
      expect(result[1][1]).toBe(5);
    });

    it('should add zeros to matrix', () => {
      const m = [
        [[1], [2], [3]],
        [[4], [5], [6]]
      ];

      const result = matrixUtils.applyFunctionOverMatrix(m, func);
      expect(result[0][0][0]).toBe(1);
      expect(result[0][1][0]).toBe(2);
      expect(result[0][2][0]).toBe(3);
      expect(result[1][0][0]).toBe(4);
      expect(result[1][1][0]).toBe(5);
      expect(result[1][2][0]).toBe(6);
    });
  });

  describe('zeroMatrix', () => {
    it('should add zeros to matrix', () => {
      const m = [1, 2];
      const result = matrixUtils.zeroMatrix(m);
      expect(result[0]).toBe(0);
      expect(result[1]).toBe(0);
    });

    it('should add zeros to matrix', () => {
      const m = [
        [1, 2],
        [4, 5]
      ];
      const result = matrixUtils.zeroMatrix(m);
      expect(result[0][0]).toBe(0);
      expect(result[0][1]).toBe(0);
      expect(result[1][0]).toBe(0);
      expect(result[1][1]).toBe(0);
    });

    it('should add zeros to matrix', () => {
      const m = [
        [[1], [2], [3]],
        [[4], [5], [6]]
      ];

      const result = matrixUtils.zeroMatrix(m);
      expect(result[0][0][0]).toBe(0);
      expect(result[0][1][0]).toBe(0);
      expect(result[0][2][0]).toBe(0);
      expect(result[1][0][0]).toBe(0);
      expect(result[1][1][0]).toBe(0);
      expect(result[1][2][0]).toBe(0);
    });
  });
});
