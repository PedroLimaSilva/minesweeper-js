import React, { Component } from 'react';
import Board from '../Board';

class App extends Component {
  state = {
    height: 10,
    width: 10,
    mines: 10,
  };

  form = {
    height: 10,
    width: 10,
    mines: 10,
  }

  handleInputChange(event) {
    const target = event.target;
    let value = target.type === 'checkbox' ? target.checked : +target.value;
    const name = target.name;
    if ((name === 'height' || name === 'width') && value > 50) {
      value = 50;
    }
    if (name === 'mines') {
      const maxMines = this.form.width * this.form.height;
      if (value > maxMines) {
        value = maxMines;
      }
    }
    this.setState({
      [name]: value
    });
  }

  render() {
    const { height, width, mines } = this.state;
    return (
      <div className="App">
        <form>
          <div className="input-field">
            <label htmlFor="height">Height</label>
            <input
              type="number"
              id="height"
              name="height"
              placeholder="height"
              value={height}
              onChange={this.handleInputChange.bind(this)}
            />
          </div>
          <div className="input-field">
            <label htmlFor="width">Width</label>
            <input
              type="number"
              id="width"
              name="width"
              placeholder="width"
              value={width}
              onChange={this.handleInputChange.bind(this)}
            />
          </div>
          <div className="input-field">
            <label htmlFor="mines">Mines</label>
            <input
              type="number"
              id="mines"
              name="mines"
              placeholder="mines"
              value={mines}
              onChange={this.handleInputChange.bind(this)}
            />
          </div>
        </form>
        <p>0.0.5</p>
        <Board height={this.state.height} width={this.state.width} mines={this.state.mines} />
      </div>
    );
  }
}

export default App;
