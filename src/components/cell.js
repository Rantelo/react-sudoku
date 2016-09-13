import React, { Component } from 'react';

export default class Cell extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const props = this.props;
    return (
      <div
        id={props.id}
        className={'cell'} >
        {props.value}
      </div>
    );
  }
}
