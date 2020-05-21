export function bfs(grid, startNode, finishNode) {
  if (!startNode || !finishNode || startNode === finishNode) {
    return false;
  }
  let height = grid.length;
  let length = grid[0].length;
  let visitedNodesInOrder = [];
  let queue = [];
  queue.push(startNode);
  while (queue.length !== 0) {
    let currentNode = queue.shift();
    let row = currentNode.row;
    let col = currentNode.col;
    if (
      row < 0 ||
      col < 0 ||
      row >= height ||
      col >= length ||
      grid[row][col].isVisited
    ) {
      continue;
    }
    grid[row][col].isVisited = true;
    visitedNodesInOrder.push(grid[row][col]);
    if (grid[row][col] === finishNode) {
      break;
    }
    if (row - 1 >= 0 && !grid[row - 1][col].isVisited) {
      grid[row - 1][col].previousNode = grid[row][col];
      queue.push(grid[row - 1][col]);
    }
    if (col - 1 >= 0 && !grid[row][col - 1].isVisited) {
      grid[row][col - 1].previousNode = grid[row][col];
      queue.push(grid[row][col - 1]);
    }
    if (row + 1 < height && !grid[row + 1][col].isVisited) {
      grid[row + 1][col].previousNode = grid[row][col];
      queue.push(grid[row + 1][col]);
    }
    if (col + 1 < length && !grid[row][col + 1].isVisited) {
      grid[row][col + 1].previousNode = grid[row][col];
      queue.push(grid[row][col + 1]);
    }
  }
  console.log(visitedNodesInOrder);
  return visitedNodesInOrder;
}

export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
