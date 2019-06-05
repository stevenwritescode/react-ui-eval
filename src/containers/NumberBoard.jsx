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

  render() {
    const { numbers } = this.state;
    const randomHex = () => "#" + Math.floor(Math.random() * 16777215).toString(16);
    return (
      <div style={{ height: "100%", width: "100%" }}>
        {numbers.map((num, index) => {
          return (
            <div key={index} style={{ display: "flex", flexDirection: "row" }}>
              {num.map((nestedNum) => {
                return (
                  <Paper style={{ display: "flex", flex: "1 1 auto", backgroundColor: randomHex(), color: "#FFF" }}>
                    <Text align="center" style={{padding: 20}}>{nestedNum}</Text>
                  </Paper>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

export default NumberBoard;
