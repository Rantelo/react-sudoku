import React, { Component } from 'react';
import Cell from './components/cell';
import {
  getColumn,
  getRow,
  getBlock,
  isOkToInsert
} from './helpers';

export default class App extends Component {
  constructor(props) {
    super(props);
    this._generateRow    = this._generateRow.bind(this);
    this._handleKeyDown  = this._handleKeyDown.bind(this);
    this._setCurrentCell = this._setCurrentCell.bind(this);

    this.state = {
      cursor: [0,0],
      sudoku: [
        [0,0,0,0,8,0,0,2,4],
        [0,8,7,0,0,2,0,0,3],
        [0,2,3,0,9,4,0,0,1],
        [2,0,0,4,1,0,9,5,0],
        [0,1,9,0,0,0,2,4,0],
        [0,5,0,0,2,9,1,0,6],
        [0,0,0,6,0,0,4,1,0],
        [5,0,0,9,0,0,6,0,0],
        [8,0,0,2,4,0,0,9,0]
      ]
    };
  }
  _generateRow(arr, row) {
    const _this = this;

    return (
      <div key={`row-${row}`} className='row'>
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
    let     sudoku = this.state.sudoku;
    const [ x, y ] = this.state.cursor;

    if (isOkToInsert( number, this.state.cursor, sudoku )) {
      sudoku[x][y]   = number;
      this.setState({ sudoku });
    }
  }

  _eraseCell() {
    //Add validation for not erasing original
    let     sudoku = this.state.sudoku;
    const [ x, y ] = this.state.cursor;

    sudoku[x][y]   = 0;
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
    } else if( key === 'Backspace' ) {
      this._eraseCell();
    } else if( /[1-9]{1}/.test(key) ) {
      this._setCurrentCell(parseInt(key));
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
