import React, { Component } from "react";
import Node from "./Node/Node";
import { bfs, getNodesInShortestPathOrder } from "../algorithms/bfs";
import { aStar, getNodesInShortestPathOrderAStar } from "../algorithms/AStar";
import NavBar from "../Nav/Nav";
import MainText from "../MainText/MainText";

import "./PathfindingVisualizer.css";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default class PathfindingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      mouseIsPressed: false,
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
    const newGrid = this.getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = this.getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
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
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = bfs(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(
      visitedNodesInOrder[visitedNodesInOrder.length - 1]
    );
    this.animateBFS(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  visualizeAStar() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = aStar(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrderAStar(
      visitedNodesInOrder[visitedNodesInOrder.length - 1]
    );
    this.animateBFS(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  reset() {
    if (!this.state.moving) {
      for (let i = 0; i < 30; i++) {
        for (let j = 0; j < 50; j++) {
          if (i === START_NODE_ROW && j === START_NODE_COL) {
            document.getElementById(`node-${i}-${j}`).className =
              "node node-start";
          } else if (i === FINISH_NODE_ROW && j === FINISH_NODE_COL) {
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
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
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
        {/* <button onClick={() => this.visualizeBFS()}>
          Visualize BFS algorithm
        </button>
        <button onClick={() => this.visualizeAStar()}>
          Visualize A* algorithm
        </button>
        <button onClick={() => this.reset()}>Reset</button> */}
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
