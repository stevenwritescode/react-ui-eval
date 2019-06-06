import React from "react";
import { getArray } from "../randomArray";
import { Button, Menu, MenuItem, Paper, Typography as Text } from "@material-ui/core";

class NumberBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentNumbers: [[1, 2], [2, 3], [3, 4], [4, 5], [5, 6]],
      sortType: null,
    };
  }

  handlers = {
    handleModalOpen: event => {
      this.setState({ menuAnchor: event.currentTarget });
    },

    handleModalClose: () => {
      this.setState({ menuAnchor: null });
    },
  };

  componentDidMount() {
    this.randomizeNumbers(() => this.randomizeColors());
  }
  
  randomizeNumbers = callback => {
    const numbers = getArray();
    numbers && this.setState({ currentNumbers: numbers, originalNumbers: numbers, sortType: null }, callback);
  };

  randomizeColors() {
    const { currentNumbers } = this.state;
    const colors = [];
    const randomRgbColor = () => {
      const color = [];
      for (var i = 0; i < 3; i++) {
        color.push(Math.floor(Math.random() * 255));
      }
      return `rgb(${color})`;
    };
    currentNumbers &&
      currentNumbers.forEach(number => {
        number.forEach(() => {
          colors.push(randomRgbColor());
        });
      });
    this.setState({ colors });
  }

  sortCards(sortType) {
    const { currentNumbers } = this.state;

    let allNumbers = [];
    let row;
    currentNumbers.forEach(number => {
      allNumbers = [...allNumbers, ...number];
    });

    const asc = (a, b) => a - b;
    const desc = (a, b) => b - a;
    if (sortType === "DESC") {
      allNumbers.sort(desc);
    } else if (sortType === "ASC") {
      allNumbers.sort(asc);
    }

    if (sortType) {
      let sortedNumbers = [];
      while (typeof allNumbers[0] === "number") {
        row = allNumbers.splice(0, 10);
        sortedNumbers.push(row);
      }
      this.setState({ currentNumbers: sortedNumbers, sortType, menuAnchor: null });
    } else {
      this.setState({ currentNumbers: this.state.originalNumbers, sortType: null, menuAnchor: null });
    }
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
    const { currentNumbers, colors } = this.state;
    return (
      <Paper
        key={colIndex}
        style={{
          display: "flex",
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
          flex: "1",
          backgroundColor: colors ? colors[(rowIndex + 1) * (colIndex + 1) - 1] : "#888",
          color: "white",
          textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
        }}
      >
        <Text variant="h2">{nestedNum}</Text>

        <Text variant="caption" style={{ position: "absolute", top: 2 }}>
          {rowIndex > 0 ? nestedNum + currentNumbers[rowIndex - 1][colIndex] : nestedNum + currentNumbers[currentNumbers.length - 1][colIndex]}
        </Text>

        <Text variant="caption" style={{ position: "absolute", left: 2 }}>
          {colIndex > 0 ? nestedNum + currentNumbers[rowIndex][colIndex - 1] : currentNumbers[rowIndex][num.length - 1]}
        </Text>

        <Text variant="caption" style={{ position: "absolute", right: 2 }}>
          {colIndex < num.length - 1 ? nestedNum + currentNumbers[rowIndex][colIndex + 1] : nestedNum + currentNumbers[rowIndex][0]}
        </Text>

        <Text variant="caption" style={{ position: "absolute", bottom: 2 }}>
          {rowIndex < currentNumbers.length - 1 ? nestedNum + currentNumbers[rowIndex + 1][colIndex] : currentNumbers[0][colIndex]}
        </Text>
      </Paper>
    );
  }

  render() {
    const { currentNumbers, menuAnchor } = this.state;
    const { handleModalOpen, handleModalClose } = this.handlers;
    return (
      <section style={{ display: "flex", flexDirection: "column", flexWrap: "wrap", height: "100%" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Button id="sort-button" variant="contained" onClick={handleModalOpen} color="secondary" style={{ flex: "1 0 auto" }}>
            Sort Numbers
          </Button>
          <Button id="sort-button" variant="contained" onClick={() => this.randomizeNumbers()} color="secondary" style={{ flex: "1 0 auto" }}>
            Randomize Numbers
          </Button>
          <Button id="sort-button" variant="contained" onClick={() => this.randomizeColors()} color="secondary" style={{ flex: "1 0 auto" }}>
            Randomize Colors
          </Button>
        </div>
        <Menu
          id="sort-menu"
          anchorEl={menuAnchor}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
          getContentAnchorEl={null}
          open={Boolean(menuAnchor)}
          onClose={handleModalClose}
        >
          <MenuItem onClick={() => this.sortCards("DESC")}>Descending</MenuItem>
          <MenuItem onClick={() => this.sortCards("ASC")}>Ascending</MenuItem>
          <MenuItem onClick={() => this.sortCards()}>None</MenuItem>
        </Menu>
        {currentNumbers.map((num, rowIndex) => {
          return this.renderNumberRow(num, rowIndex);
        })}
      </section>
    );
  }
}

export default NumberBoard;
