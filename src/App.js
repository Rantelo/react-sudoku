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
    let { key } = event;

    const cursor = this.state.cursor;



    if ( key === 'j' ) {
      this.setState({
        cursor: [cursor[0] + 1, cursor[1]]
      });
    }
    if ( key === 'k' ) {
      this.setState({
        cursor: [cursor[0] - 1, cursor[1]]
      });
    }
    if ( key === 'h' ) {
      this.setState({
        cursor: [cursor[0], cursor[1] - 1]
      });
    }
    if ( key === 'l' ) {
      this.setState({
        cursor: [cursor[0], cursor[1] + 1]
      });
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
