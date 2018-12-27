import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * This component will scale down its contents to fit the device's width
 */
export default class Resizer extends Component {

  state = {
    styles: {}
  }

  componentDidMount() {
    this.calculateStyles();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.cells !== nextProps.cells) {
      console.log(this.props.cells, nextProps.cells);
      this.setState({ styles: { transform: `scale(1)`, transformOrigin: `top left` } })
      setTimeout(this.calculateStyles, 500)
    }
  }

  calculateStyles = () => {
    const { childContainer } = this.props;
    if (childContainer) {
      const child_width = childContainer.offsetWidth;
      const viewport_width = window.innerWidth;
      const scale = viewport_width / child_width;
      console.log(`${viewport_width} / ${child_width} = ${scale}`)
      this.setState({ styles: { transform: `scale(${scale})`, transformOrigin: `top left` } })
    }
  }

  render() {
    return (
      <div
        style={this.state.styles}
      >
        {this.props.children}
      </div>
    );
  }
}

Resizer.propTypes = {
  children: PropTypes.array,
  childContainer: PropTypes.object,
  cells: PropTypes.number,
}