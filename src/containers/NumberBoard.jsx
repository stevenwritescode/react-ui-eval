import React from "react";
import { getArray } from "../randomArray";
import { Paper, Typography as Text } from "@material-ui/core";

class NumberBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numbers: [[1, 2], [2, 3], [3, 4], [4, 5], [5, 6]],
    };
  }

  componentDidMount() {
    this.setState({ numbers: getArray() });
  }

  renderNumberCard(num, rowIndex) {
    const { numbers } = this.state;
    return (
      <div key={rowIndex} style={{ display: "flex", flex: "1", flexDirection: "row" }}>
        {num.map((nestedNum, colIndex) => {
          const color = [];
          const getColor = () => {
            for (var i = 0; i < 3; i++) {
              color.push(Math.floor(Math.random() * 255));
            }
            return color;
          };
          const randomColor = () => `rgb(${getColor()})`;
          return (
            <Paper
              key={colIndex}
              style={{
                display: "flex",
                position: "relative",
                justifyContent: "center",
                alignItems: "center",
                flex: "1",
                backgroundColor: randomColor(),
                color: "white",
                textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
              }}
            >
              <Text variant="h2">{nestedNum}</Text>

              <Text variant="caption" style={{ position: "absolute", top: 2 }}>
                {rowIndex > 0 ? nestedNum + numbers[rowIndex - 1][colIndex] : nestedNum + numbers[numbers.length - 1][colIndex]}
              </Text>

              <Text variant="caption" style={{ position: "absolute", left: 2 }}>
                {colIndex > 0 ? nestedNum + numbers[rowIndex][colIndex - 1] : numbers[rowIndex][num.length-1]}
              </Text>

              <Text variant="caption" style={{ position: "absolute", right: 2 }}>
                {colIndex < num.length - 1 ? nestedNum + numbers[rowIndex][colIndex + 1] : nestedNum + numbers[rowIndex][0]}
              </Text>

              <Text variant="caption" style={{ position: "absolute", bottom: 2 }}>
                {rowIndex < numbers.length - 1 ? nestedNum + numbers[rowIndex + 1][colIndex] : numbers[0][colIndex]}
              </Text>
            </Paper>
          );
        })}
      </div>
    );
  }

  render() {
    const { numbers } = this.state;
    return (
      <section style={{ display: "flex", flexDirection: "column", flexWrap: "wrap", flex: 1, height: "100%" }}>
        {numbers.map((num, rowIndex) => {
          return this.renderNumberCard(num, rowIndex);
        })}
      </section>
    );
  }
}

export default NumberBoard;
