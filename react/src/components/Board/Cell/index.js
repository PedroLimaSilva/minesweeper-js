import React, { PureComponent } from 'react';
import classNames from 'classnames';

export default class Cell extends PureComponent {

  render(){
    const {onClick, onContextMenu, visible, marked, value } = this.props;
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
        onContextMenu={onContextMenu}
      >
      </div>
    );
  }
}