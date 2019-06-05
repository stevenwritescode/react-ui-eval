import React from "react";
import { getArray } from "../randomArray";
import { Button, Paper, Typography as Text } from "@material-ui/core";

class NumberBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numbers: [[1, 2], [2, 3], [3, 4], [4, 5], [5, 6]],
      original: [[1, 2], [2, 3], [3, 4], [4, 5], [5, 6]],
      sorted: false,
    };
  }

  handlers = {
    sortCards: () => {
      const { numbers, sorted } = this.state;
      let allNumbers = [];
      let x;
      let sortedNumbers = [];
      for (x in numbers) {
        allNumbers = [...allNumbers, ...numbers[x]];
      }

      allNumbers.sort((a, b) => {
        return b - a;
      });

      while (typeof allNumbers[0] === "number") {
        x = allNumbers.splice(0, 10);
        sortedNumbers.push(x);
      }

      if (sorted) {
        this.setState(state => ({ sorted: false, numbers: state.original, original: numbers }));
      } else {
        this.setState(state => ({ sorted: true, numbers: sortedNumbers, original: numbers }));
      }
    },
  };

  componentDidMount() {
    this.setState({ numbers: getArray() });
  }

  renderNumberRow(num, rowIndex) {
    return (
      <div key={rowIndex} style={{ display: "flex", flex: "1", flexDirection: "row" }}>
        {num &&
          num.map((nestedNum, colIndex) => {
            return this.renderNumberCard(num, nestedNum, rowIndex, colIndex);
          })}
      </div>
    );
  }

  renderNumberCard(num, nestedNum, rowIndex, colIndex) {
    const { numbers } = this.state;
    const color = [];
    const randomRgbColor = () => {
      for (var i = 0; i < 3; i++) {
        color.push(Math.floor(Math.random() * 255));
      }
      return `rgb(${color})`;
    };
    return (
      <Paper
        key={colIndex}
        style={{
          display: "flex",
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
          flex: "1",
          backgroundColor: randomRgbColor(),
          color: "white",
          textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
        }}
      >
        <Text variant="h2">{nestedNum}</Text>

        <Text variant="caption" style={{ position: "absolute", top: 2 }}>
          {rowIndex > 0 ? nestedNum + numbers[rowIndex - 1][colIndex] : nestedNum + numbers[numbers.length - 1][colIndex]}
        </Text>

        <Text variant="caption" style={{ position: "absolute", left: 2 }}>
          {colIndex > 0 ? nestedNum + numbers[rowIndex][colIndex - 1] : numbers[rowIndex][num.length - 1]}
        </Text>

        <Text variant="caption" style={{ position: "absolute", right: 2 }}>
          {colIndex < num.length - 1 ? nestedNum + numbers[rowIndex][colIndex + 1] : nestedNum + numbers[rowIndex][0]}
        </Text>

        <Text variant="caption" style={{ position: "absolute", bottom: 2 }}>
          {rowIndex < numbers.length - 1 ? nestedNum + numbers[rowIndex + 1][colIndex] : numbers[0][colIndex]}
        </Text>
      </Paper>
    );
  }

  render() {
    const { numbers, sorted } = this.state;
    const { sortCards } = this.handlers;
    return (
      <section style={{ display: "flex", flexDirection: "column", flexWrap: "wrap", flex: 1, height: "100%" }}>
        <Button variant="contained" onClick={sortCards} color ="secondary">
          {sorted ? "Restore Original Order" : "Sort Numbers"}
        </Button>
        {numbers.map((num, rowIndex) => {
          return this.renderNumberRow(num, rowIndex);
        })}
      </section>
    );
  }
}

export default NumberBoard;
