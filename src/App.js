import React, { Component } from 'react';
import Cell from './components/cell'

export default class App extends Component {
  constructor(props) {
    super(props);
    this._generateRow    = this._generateRow.bind(this);
    this._handleKeyDown  = this._handleKeyDown.bind(this);
    this._setCurrentCell = this._setCurrentCell.bind(this);

    this.state = {
      cursor: [0,0],
      sudoku: [
        [1,2,3,4,5,6,7,8,9],
        [4,5,6,7,8,9,1,2,3],
        [1,2,3,4,5,6,7,8,9],
        [4,5,6,7,8,9,1,2,3],
        [1,2,3,4,5,6,7,8,9],
        [4,5,6,7,8,9,1,2,3],
        [1,2,3,4,5,6,7,8,9],
        [4,5,6,7,8,9,1,2,3],
        [7,8,9,1,2,3,4,5,6]
      ]
    };
  }
  _generateRow(arr, row) {
    const _this = this;

    return (
      <div key={`row-${row}`}>
        {arr.map((element,index) => {
          const [cx, cy] = _this.state.cursor;
          const selected = ((cx === row) && (cy === index));

          return(
            <Cell
              id={`${row}-${index}`}
              key={`${row}-${index}`}
              selected={selected}
              value={element}
              />
          );
        })}
      </div>
    )
  }

  _setCurrentCell( number ) {
    const [ x, y ] = this.state.cursor;
    let sudoku = this.state.sudoku;
    sudoku[x][y] = number;
    this.setState({ sudoku });
  }

  _handleKeyDown( event ) {
    const { key }  = event;
    const _this    = this;
    const [ x, y ] = this.state.cursor;

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
    } else if( /[1-9]{1}/.test(key) ) {
      this._setCurrentCell(key);
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this._handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this._handleKeyDown);
  }

  render() {
    const sudoku = this.state.sudoku;
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
