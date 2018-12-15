import React, { Component } from 'react';

import './styles.scss';

export default class Cell extends Component {

  className(){
    const {visible, marked, value } = this.props;
    let classString = "";
    if(visible){
      classString += `visible value_${value}`;
    } else if(marked){
      classString += 'hidden marked '
    } else {
      classString += 'hidden'
    }
    return classString;
  }

  render(){
    const {onClick, onContextMenu } = this.props;
    return (
      <td
        tabIndex="0"
        className={this.className()}
        onClick={onClick}
        onContextMenu={onContextMenu}
      >
      </td>
    );
  }
}