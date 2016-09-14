import React, { Component } from 'react';

export default class Cell extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const props = this.props;
    let selected = (this.props.selected) ? 'selected' : '';
    return (
      <div
        id={props.id}
        className={`cell ${selected}`} >
        {props.value}
      </div>
    );
  }
}
