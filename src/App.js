import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this._generateRow = this._generateRow.bind(this);
  }
  _generateRow(arr, row) {
    return (
      <div>
        {arr.map((element,index) => {
          return(
            <div key={`${row}-${index}`} className={'box'}> {element}</div>
          );
        })}
      </div>
    )
  }
  render() {
    let sudoku = [
      [1,2,3,4,5,6,7,8,9],
      [4,5,6,7,8,9,1,2,3],
      [7,8,9,1,2,3,4,5,6]
    ];
    let rows = sudoku.map((row, index) => this._generateRow(row,index));

    return (
      <div>
        {rows}
        Shudokuu
      </div>
    );
  }
}
