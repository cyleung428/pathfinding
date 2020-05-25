export function aStar(grid, startNode, finishNode) {
  if (!startNode || !finishNode || startNode === finishNode) {
    return false;
  }
  console.log(manhattanDistance(startNode, finishNode));
  let height = grid.length;
  let length = grid[0].length;
  let visitedNodesInOrder = [];
  let openQueue = [];
  let closeQueue = [];
  startNode.distance = 0;
  startNode.estimateDistance = manhattanDistance(startNode, finishNode);
  openQueue.push(startNode);
  while (openQueue.length !== 0) {
    let currentNode = openQueue.reduce(function (prev, curr) {
      return prev.estimateDistance < curr.estimateDistance ? prev : curr;
    });
    let index = openQueue.indexOf(currentNode);
    openQueue.splice(index, 1);
    currentNode.isVisited = true;
    let row = currentNode.row;
    let col = currentNode.col;
    if (currentNode.isWall) {
      continue;
    }
    visitedNodesInOrder.push(grid[row][col]);
    if (grid[row][col] === finishNode) {
      break;
    }
    if (row - 1 >= 0) {
      if (
        grid[row - 1][col].estimateDistance >
        currentNode.distance +
          1 +
          manhattanDistance(grid[row - 1][col], finishNode)
      ) {
        grid[row - 1][col].distance = currentNode.distance + 1;
        grid[row - 1][col].estimateDistance =
          currentNode.distance +
          1 +
          manhattanDistance(grid[row - 1][col], finishNode);
        grid[row - 1][col].previousNode = grid[row][col];
        openQueue.push(grid[row - 1][col]);
      }
    }
    if (col - 1 >= 0) {
      if (
        grid[row][col - 1].estimateDistance >
        currentNode.distance +
          1 +
          manhattanDistance(grid[row][col - 1], finishNode)
      ) {
        grid[row][col - 1].distance = currentNode.distance + 1;
        grid[row][col - 1].estimateDistance =
          currentNode.distance +
          1 +
          manhattanDistance(grid[row][col - 1], finishNode);
        grid[row][col - 1].previousNode = grid[row][col];
        openQueue.push(grid[row][col - 1]);
      }
    }
    if (row + 1 < height) {
      if (
        grid[row + 1][col].estimateDistance >
        currentNode.distance +
          1 +
          manhattanDistance(grid[row + 1][col], finishNode)
      ) {
        grid[row + 1][col].distance = currentNode.distance + 1;
        grid[row + 1][col].estimateDistance =
          currentNode.distance +
          1 +
          manhattanDistance(grid[row + 1][col], finishNode);
        grid[row + 1][col].previousNode = grid[row][col];
        openQueue.push(grid[row + 1][col]);
      }
    }
    if (col + 1 < length) {
      if (
        grid[row][col + 1].estimateDistance >
        currentNode.distance +
          1 +
          manhattanDistance(grid[row][col + 1], finishNode)
      ) {
        grid[row][col + 1].distance = currentNode.distance + 1;
        grid[row][col + 1].estimateDistance =
          currentNode.distance +
          1 +
          manhattanDistance(grid[row][col + 1], finishNode);
        grid[row][col + 1].previousNode = grid[row][col];
        openQueue.push(grid[row][col + 1]);
      }
    }
  }
  return visitedNodesInOrder;
}

export function getNodesInShortestPathOrderAStar(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}

function manhattanDistance(nodeA, nodeB) {
  return Math.abs(nodeB.col - nodeA.col) + Math.abs(nodeB.row - nodeA.row);
}
