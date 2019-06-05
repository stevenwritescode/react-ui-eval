import React from 'react';
import { getArray } from './randomArray';
import './grid.css';

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: getArray()
    }
  }

  render() {
    return <div class="grid">{this.makeGrid()}</div>
  }

  makeGrid() {
    return this.state.array.map(row => <div className="row">{this.getRowOfBoxes(row)}</div>)
  }

  getRowOfBoxes(row) {
    return row.map(value => <span className={'color' + value + ' value'}>{value}</span>)
  }
}

export default Grid