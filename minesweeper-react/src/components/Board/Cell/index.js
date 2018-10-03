import React, { Component } from 'react';

export default class Cell extends Component {
  render(){
    const {x, y, visible, value, onClick } = this.props;
    return (
      <td
        key={`cell_${x}_${y}`}
        tabIndex="0"
        className={!visible ? 'hidden' : 'visible'}
        onClick={onClick}
      >
        {value}
      </td>
    );
  }
}