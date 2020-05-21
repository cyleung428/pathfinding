import React, { Component } from "react";
import Node from "./Node/Node";
import { bfs, getNodesInShortestPathOrder } from "../algorithms/bfs";

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
    };
  }
  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }
  animateBFS(visitedNodesInOrder, nodesInShortestPathOrder) {
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
    }
  }
  visualizeBFS() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = bfs(grid, startNode, finishNode);
    // console.log(grid);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    // console.log(nodesInShortestPathOrder);
    this.animateBFS(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  reset() {
    for (let i = 0; i < 20; i++) {
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
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  render() {
    return (
      <>
        <button onClick={() => this.visualizeBFS()}>
          Visualize BFS algorithm
        </button>
        <button onClick={() => this.reset()}>Reset</button>
        <div className="grid">
          {this.state.grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { isStart, isFinish } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      isStart={isStart}
                      isFinish={isFinish}
                      col={nodeIdx}
                      row={rowIdx}
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

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};
const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};
