import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { between } from '../../helpers';

import Cell from './Cell';

export default class Board extends Component {

  state = {
    board: [],
    result: 'playing',
  }

  beatingGame = false;

  componentWillMount(){
    const { height, width, mines } = this.props;
    this.generateMines(height, width, mines);
  }

  componentWillReceiveProps(nextProps) {   
    const { height, width, mines } = nextProps;
    this.generateMines(height, width, mines);
  }

  resetState(){
    this.setState({
      board: [],
      result: 'playing',
    });
    this.beatingGame = false;
  }

  generateMines(height, width, mines) {
    let rem_squares = height * width;
    let rem_mines = mines;

    this.resetState();

    let grid = [];

    for (let n = 0; n < width; n++) {
      grid[n] = [];
      for (let m = 0; m < height; m++) {
        grid[n][m] = { hasMine: false, isMarked: false, isVisible: false };
      }
    }

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if ((rem_mines / rem_squares) >= Math.random()) {
          rem_mines--;
          grid[x][y].hasMine = true;
        }
        rem_squares--;
      }
    }
    this.hidden = height * width;
    this.setState({ board: grid })
  };

  beatGame() {
    this.setState({ result: 'Win' });
    if(!this.beatingGame && this.state.result !== 'lost'){
      this.beatingGame = true;
      window.alert('You beat the game!');
    }
  }

  onClickCell(x, y) {
    const { mines } = this.props;
    const { board, result } = this.state;
    
    if (result === 'playing') {
      if(this.isMarked(x, y)){
        return;
      }
      if (board[x][y].hasMine) {
        this.onGameOver();
      }
      let newBoard = board;
      if(!this.isVisible(x,y)){
        newBoard[x][y].isVisible = true;
        this.hidden--;
      }
      if (this.cellValue(x, y) === 0) {
        this.onClickZero(x, y);
      }
      this.setState({ board: newBoard }, ()=>{
        if (this.hidden === mines) {
          this.beatGame();
        }
      });
    }
  }

  onRightClickCell(x, y, e){
    if(e){
      e.preventDefault();
    }
    const { board, result } = this.state;
    
    if (result === 'playing') {
      board[x][y].isMarked = !board[x][y].isMarked;
      this.setState({board})
    }
  }

  onClickZero(x, y) {
    const { board } = this.state;
    const { height, width } = this.props;
    let newBoard = board;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (between(x + i, 0, width - 1) &&
          between(y + j, 0, height - 1) &&
          !this.isVisible(x + i, y + j)
        ) {
          if (this.cellValue(x + i, y + j) === 0) {
            this.onClickCell(x + i, y + j);
          } else {
            newBoard[x + i][y + j].isVisible = true;
            this.hidden--;
          }
        }
      }
    }
    this.setState({ board: newBoard });
  }

  onGameOver() {
    const { board } = this.state;
    const { height, width } = this.props;
    window.alert('Game Over!');
    let grid = board;
    for (let n = 0; n < width; n++) {
      for (let m = 0; m < height; m++) {
        grid[n][m].isVisible = true;
      }
    }
    this.setState({ board: grid, result: 'lost' })
  }

  isVisible(x, y) {
    const { board } = this.state;
    return board[x][y].isVisible;
  }

  isMarked(x, y) {
    const { board } = this.state;
    return board[x][y].isMarked;
  }

  cellValue(x, y) {
    const { height, width } = this.props;
    const { board } = this.state;
    if (board[x][y].hasMine) {
      return 'B';
    }
    let nearby = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (between(x + i, 0, width - 1) && between(y + j, 0, height - 1) && board[x + i][y + j].hasMine) {
          nearby++;
        }
      }
    }
    return nearby;
  }

  renderRow(row_index) {
    const { width } = this.props;
    const cells = [];

    for (let i = 0; i < width; i++) {
      cells.push((
        <Cell
          key={`cell_${i}_${row_index}`}
          visible={this.isVisible(i, row_index)}
          marked={this.isMarked(i, row_index)}
          value={this.cellValue(i, row_index)}
          onClick={this.onClickCell.bind(this, i, row_index)}
          onContextMenu={this.onRightClickCell.bind(this, i, row_index)}
        />
      ));
    }

    return cells;
  }

  renderTable() {
    const { height } = this.props;
    const rows = [];
    for (let i = 0; i < height; i++) {
      rows.push((
        <div className="row" key={`row_${i}`}>{this.renderRow(i)}</div>
      ));
    }
    return (
      <div className="Board">
        {rows}
      </div>
    );
  }

  render() {
    const { height, width } = this.props;
    return (
      <div>
        <h1>table {height}x{width}</h1>
        {this.renderTable()}
      </div>
    );
  }
}

Board.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  mines: PropTypes.number.isRequired,
}