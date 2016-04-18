// Mostly for fun, should use well tested and optimized library instead


function simpleMatrix(m, n, type) {
  if (m.length !== n.length || m[0].length !== n[0].length) {
    throw new Error('Matrices must be same size');
  }

  const result = [];
  for (let i = 0; i < m.length; i++) {
    result[i] = [];
    for (let j = 0; j < m[i].length; j++) {
      let val;
      if (type === 'add') {
        val = m[i][j] + n[i][j];
      } else if (type === 'subtract') {
        val = m[i][j] - n[i][j];
      } else if (type === 'multiply') {
        val = m[i][j] * n[i][j];
      }
      if (isNaN(val)) {
        debugger;
      }
      result[i][j] = val;
    }
  }
  return result;
}
export function addMatrix(m, n) {
  return simpleMatrix(m, n, 'add');
}
export function subtractMatrix(m, n) {
  return simpleMatrix(m, n, 'subtract');
}
export function multiplyMatrix(m, n) {
  return simpleMatrix(m, n, 'multiply');
}

export function crossProduct(m, n) {
  if (m[0].length !== n.length) {
    throw new Error('Columns in first matrix must equal rows in second matrix');
  }

  const result = [];
  for (let i = 0; i < m.length; i++) {
    result[i] = [];
    for (let j = 0; j < n[0].length; j++) {
      let sum = 0;
      for (let k = 0; k < m[i].length; k++) {
        sum += m[i][k] * n[k][j];
      }
      result[i][j] = sum;
    }
  }
  return result;
}

export function transposeMatrix(m) {
  const result = [];
  for (let i = 0; i < m.length; i++) {
    for (let j = 0; j < m[i].length; j++) {
      if (!result[j]) {
        result[j] = [];
      }
      result[j][i] = m[i][j];
    }
  }
  return result;
}

export function applyFunctionOverMatrix(initM, func) {
  function recurse(m, r) {
    if (Array.isArray(m)) {
      for (let i = 0; i < m.length; i++) {
        r.push(recurse(m[i], []));
      }
      return r;
    }
    return func(m);
  }
  return recurse(initM, []);
}

export function zeroMatrix(m) {
  return applyFunctionOverMatrix(m, () => 0);
}
