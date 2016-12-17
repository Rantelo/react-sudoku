export const isOkToInsert = ( number, coords, matrix) => {
  const [ x, y ] = coords;
  const col      = getColumn(y, matrix);
  const row      = getRow(x, matrix);
  const block    = getBlock(coords, matrix);

  return isNotInSet(number, col) && isNotInSet(number, row) && isNotInSet(number, block);
}

const isNotInSet = ( number, set) => !set.has(number)

/* returns a set */
const getColumn = ( col, matrix ) => new Set(matrix.map(row => row[col]));

/* returns a set */
const getRow = ( row, matrix ) => new Set(matrix[row]);

/* returns a set */
const getBlock = ( coords, matrix ) => {
  const [ x, y ] = coords;
  const cuadrant = [parseInt(x/3), parseInt(y/3)];
  const start    = [cuadrant[0]*3, cuadrant[1]*3];
  let   ans      = new Set();

  for ( let i = start[0]; i < start[0]+3; i++ ) {
    for ( let j = start[1]; j < start[1]+3; j++ ) {
      ans.add(matrix[i][j]);
    }
  }

  return ans;
}
