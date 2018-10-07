import React, { Component } from 'react';
import './styles.scss';
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
    console.log(name, value)
    if ((name === 'height' || name === 'width') && value > 50) {
      value = 50;
    }
    this.setState({
      [name]: value
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    console.log(this.form);
  }


  render() {
    const { height, width, mines } = this.state;
    return (
      <div className="App">
        <form onSubmit={this.handleFormSubmit.bind(this)}>
          <label>
            Height:
            <input
              type="number"
              name="height"
              placeholder="height"
              value={height}
              onChange={this.handleInputChange.bind(this)}
            />
          </label>
          <br />
          <label>
            Width:
            <input
              type="number"
              name="width"
              placeholder="width"
              value={width}
              onChange={this.handleInputChange.bind(this)}
            />
          </label>
          <br />
          <label>
            Mines:
            <input
              type="number"
              name="mines"
              placeholder="mines"
              value={mines}
              onChange={this.handleInputChange.bind(this)}
            />
          </label>
          <button type="submit">Apply</button>
        </form>
        <Board height={this.state.height} width={this.state.width} mines={this.state.mines} />
      </div>
    );
  }
}

export default App;
