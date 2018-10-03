import React, { Component } from 'react';
import './styles.scss';
import Board from '../Board';

class App extends Component {
  state = {
    board: {
      height: 10,
      width: 10,
    },
    mines: 10,
  };


  render() {
    const { board, mines } = this.state
    return (
      <div className="App">
        <Board height={board.height} width={board.width} mines={mines} />
      </div>
    );
  }
}

export default App;
