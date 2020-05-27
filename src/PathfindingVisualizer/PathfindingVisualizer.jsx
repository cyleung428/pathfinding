import React, { Component } from "react";
import Node from "./Node/Node";
import { bfs, getNodesInShortestPathOrder } from "../algorithms/bfs";
import { aStar, getNodesInShortestPathOrderAStar } from "../algorithms/AStar";
import NavBar from "../Nav/Nav";
import MainText from "../MainText/MainText";

import "./PathfindingVisualizer.css";

export default class PathfindingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      mouseIsPressed: false,
      mouseIsPressedOnStart: false,
      mouseIsPressedOnFinish: false,
      moving: false,
      movingStartPoint: false,
      movingFinishPoint: false,
      startRow: 10,
      startCol: 15,
      finishRow: 10,
      finishCol: 35,
      algorithm: "BFS",
    };
  }
  componentDidMount() {
    const grid = this.getInitialGrid();
    this.setState({ grid });
  }
  handleMouseDown(row, col) {
    const { startRow, startCol, finishRow, finishCol } = this.state;
    if (row === startRow && col === startCol) {
      this.setState({ mouseIsPressedOnStart: true });
    } else if (row === finishRow && col === finishCol) {
      this.setState({ mouseIsPressedOnFinish: true });
    } else {
      const newGrid = this.getNewGridWithWallToggled(this.state.grid, row, col);
      this.setState({ grid: newGrid, mouseIsPressed: true });
    }
  }

  handleMouseEnter(row, col) {
    const {
      mouseIsPressedOnStart,
      mouseIsPressedOnFinish,
      mouseIsPressed,
      startRow,
      startCol,
      finishRow,
      finishCol,
    } = this.state;
    if (mouseIsPressedOnStart) {
      if (row === finishRow && col === finishCol) {
        return;
      }
      const newGrid = this.getNewGridWithStartToggled(
        this.state.grid,
        row,
        col
      );
      this.setState({ grid: newGrid });
    } else if (mouseIsPressedOnFinish) {
      if (row === startRow && col === startCol) {
        return;
      }
      const newGrid = this.getNewGridWithFinishToggled(
        this.state.grid,
        row,
        col
      );
      this.setState({ grid: newGrid });
    } else if (mouseIsPressed) {
      const newGrid = this.getNewGridWithWallToggled(this.state.grid, row, col);
      this.setState({ grid: newGrid });
    }
  }

  handleMouseUp() {
    this.setState({
      mouseIsPressed: false,
      mouseIsPressedOnStart: false,
      mouseIsPressedOnFinish: false,
    });
  }
  animateBFS(visitedNodesInOrder, nodesInShortestPathOrder) {
    this.setState((prevState) => ({
      moving: !prevState.moving,
    }));
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);

        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  }
  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50 * i);
      if (i === nodesInShortestPathOrder.length - 1) {
        setTimeout(() => {
          this.setState((prevState) => ({
            moving: !prevState.moving,
          }));
        }, 10 * i + 1500);
      }
    }
  }
  visualizeBFS() {
    const { grid, startRow, startCol, finishRow, finishCol } = this.state;
    const startNode = grid[startRow][startCol];
    const finishNode = grid[finishRow][finishCol];
    const visitedNodesInOrder = bfs(grid, startNode, finishNode);
    if (visitedNodesInOrder.length === 0) return;
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(
      visitedNodesInOrder[visitedNodesInOrder.length - 1]
    );
    this.animateBFS(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  visualizeAStar() {
    const { grid, startRow, startCol, finishRow, finishCol } = this.state;
    const startNode = grid[startRow][startCol];
    const finishNode = grid[finishRow][finishCol];
    const visitedNodesInOrder = aStar(grid, startNode, finishNode);
    if (visitedNodesInOrder.length === 0) return;
    const nodesInShortestPathOrder = getNodesInShortestPathOrderAStar(
      visitedNodesInOrder[visitedNodesInOrder.length - 1]
    );
    this.animateBFS(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  reset() {
    const { startRow, startCol, finishRow, finishCol } = this.state;
    if (!this.state.moving) {
      for (let i = 0; i < 30; i++) {
        for (let j = 0; j < 50; j++) {
          if (i === startRow && j === startCol) {
            document.getElementById(`node-${i}-${j}`).className =
              "node node-start";
          } else if (i === finishRow && j === finishCol) {
            document.getElementById(`node-${i}-${j}`).className =
              "node node-finish";
          } else {
            document.getElementById(`node-${i}-${j}`).className = "node";
          }
        }
      }
      const grid = this.getInitialGrid();
      this.setState({ grid: grid });
    }
  }

  getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 30; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        currentRow.push(this.createNode(col, row));
      }
      grid.push(currentRow);
    }
    return grid;
  };
  createNode = (col, row) => {
    return {
      col,
      row,
      isStart: row === this.state.startRow && col === this.state.startCol,
      isFinish: row === this.state.finishRow && col === this.state.finishCol,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
      estimateDistance: Infinity,
    };
  };

  getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  getNewGridWithStartToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isStart: true,
    };
    const oldNode = newGrid[this.state.startRow][this.state.startCol];
    const oldStart = {
      ...oldNode,
      isStart: false,
    };
    newGrid[row][col] = newNode;
    newGrid[this.state.startRow][this.state.startCol] = oldStart;
    this.setState({ startRow: row, startCol: col });
    return newGrid;
  };

  getNewGridWithFinishToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isFinish: true,
    };
    const oldNode = newGrid[this.state.finishRow][this.state.finishCol];
    const oldStart = {
      ...oldNode,
      isFinish: false,
    };
    newGrid[row][col] = newNode;
    newGrid[this.state.finishRow][this.state.finishCol] = oldStart;
    this.setState({ finishRow: row, finishCol: col });
    return newGrid;
  };

  visualizePath = () => {
    const { algorithm } = this.state;
    switch (algorithm) {
      case "BFS":
        this.visualizeBFS();
        break;
      case "AStar":
        this.visualizeAStar();
        break;
      default:
        break;
    }
  };
  changeAlgorithm = (algorithm) => {
    this.setState({ algorithm: algorithm });
  };

  render() {
    const { grid, mouseIsPressed, algorithm } = this.state;
    return (
      <>
        <NavBar
          algorithm={algorithm}
          reset={() => this.reset()}
          visualizePath={() => this.visualizePath()}
          changeAlgorithm={(algorithm) => this.changeAlgorithm(algorithm)}
        ></NavBar>
        <MainText></MainText>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div className="customRow" key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { isStart, isFinish, isWall, row, col } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      isStart={isStart}
                      isFinish={isFinish}
                      col={col}
                      row={row}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}
