import React, { Component } from 'react';
import Cell from './components/cell'

export default class App extends Component {
  constructor(props) {
    super(props);
    this._generateRow   = this._generateRow.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this.state = {
      cursor: [0,0]
    };
  }
  _generateRow(arr, row) {
    return (
      <div key={`row-${row}`}>
        {arr.map((element,index) => {
          return(
            <Cell
              id={`${row}-${index}`}
              key={`${row}-${index}`}
              value={element}
              />
          );
        })}
      </div>
    )
  }

  _handleKeyDown( event ) {
    const { key }   = event;
    const _this     = this;
    const [x, y]    = this.state.cursor;

    const plus      = number => (number >= 8) ? 0 : number + 1;
    const minus     = number => (number <= 0) ? 8 : number - 1;
    const setCursor = cursor => _this.setState({cursor: cursor});

    if( key === 'j' || key === 'ArrowDown' ) {
      setCursor([plus(x), y]);
    } else if( key === 'k' || key === 'ArrowUp' ) {
      setCursor([minus(x), y]);
    } else if( key === 'h' || key === 'ArrowLeft' ) {
      setCursor([x, minus(y)]);
    } else if( key === 'l' || key === 'ArrowRight' ) {
      setCursor([x, plus(y)]);
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this._handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this._handleKeyDown);
  }

  render() {
    let sudoku = [
      [1,2,3,4,5,6,7,8,9],
      [4,5,6,7,8,9,1,2,3],
      [1,2,3,4,5,6,7,8,9],
      [4,5,6,7,8,9,1,2,3],
      [1,2,3,4,5,6,7,8,9],
      [4,5,6,7,8,9,1,2,3],
      [1,2,3,4,5,6,7,8,9],
      [4,5,6,7,8,9,1,2,3],
      [7,8,9,1,2,3,4,5,6]
    ];
    let rows = sudoku.map((row, index) => this._generateRow(row,index));
    
    let cursor = this.state.cursor;

    return (
      <div>
        {rows}
        Shudokuu
        <br />
        {cursor.join(" ")}
      </div>
    );
  }
}
