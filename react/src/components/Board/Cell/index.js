import React, { PureComponent } from 'react';
import classNames from 'classnames';

export default class Cell extends PureComponent {

  holdTimeout;

  handleTouchStart = (evt) => {
    evt.preventDefault();
    console.log('touch start');
    this.holdTimeout = setTimeout(() => {
      this.props.onContextMenu();
      window.navigator.vibrate([200]);
      clearTimeout();
      this.holdTimeout = null;
    }, 500);
  }

  handleTouchEnd = (evt) => {
    evt.preventDefault();
    console.log('touch end');
    if(this.holdTimeout){
      clearTimeout();
      this.holdTimeout = null;
      this.props.onClick();
    }
  }

  render() {
    const { onClick, onContextMenu, visible, marked, value } = this.props;
    return (
      <div
        tabIndex="0"
        className={classNames(
          'Cell',
          {
            visible: visible,
            [`value_${value}`]: visible,
            hidden: !visible,
            marked: marked
          }
        )}
        onClick={onClick}
        onTouchStart={this.handleTouchStart}
        onTouchEnd={this.handleTouchEnd}
        onTouchMove={this.handleTouchEnd}
        onContextMenu={onContextMenu}
      >
      </div>
    );
  }
}