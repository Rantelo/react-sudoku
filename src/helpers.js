export const isOkToInsert = ( coords, matrix) => {
  const [ x, y ] = coords;
  console.log('column', getColumn(y, matrix));
  console.log('row', getRow(x, matrix));
  return true;
}

const isNotInSet = ( number, set ) => {
  return true;

}

const getColumn = ( col, matrix ) => matrix.map(row => row[col]);

const getRow = ( row, matrix ) => matrix[row];

const getBlock = ( coords, matrix ) => {
  const [ x, y ] = coords;




  return column

}
