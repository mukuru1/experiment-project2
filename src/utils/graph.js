export function getOutgoingConnections(connections, nodeId) {
  return connections.filter((c) => c.sourceId === nodeId);
}

export function getIncomingConnections(connections, nodeId) {
  return connections.filter((c) => c.targetId === nodeId);
}

export function getChildren(nodes, connections, nodeId) {
  const outgoing = getOutgoingConnections(connections, nodeId);
  return outgoing
    .map((c) => nodes.find((n) => n.id === c.targetId))
    .filter(Boolean);
}

export function getParents(nodes, connections, nodeId) {
  const incoming = getIncomingConnections(connections, nodeId);
  return incoming
    .map((c) => nodes.find((n) => n.id === c.sourceId))
    .filter(Boolean);
}

export function getStartNode(nodes) {
  return nodes.find((n) => n.type === 'start');
}

export function traverseFromStart(nodes, connections) {
  const start = getStartNode(nodes);
  if (!start) return [];

  const visited = new Set();
  const order = [];

  function visit(nodeId) {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);
    const node = nodes.find((n) => n.id === nodeId);
    if (!node) return;
    order.push(node);

    const children = getChildren(nodes, connections, nodeId);
    for (const child of children) {
      visit(child.id);
    }
  }

  visit(start.id);
  return order;
}

export function findPath(nodes, connections, fromId, toId) {
  const queue = [[fromId]];
  const visited = new Set();

  while (queue.length > 0) {
    const path = queue.shift();
    const current = path[path.length - 1];

    if (current === toId) return path;
    if (visited.has(current)) continue;
    visited.add(current);

    const children = getChildren(nodes, connections, current);
    for (const child of children) {
      queue.push([...path, child.id]);
    }
  }

  return null;
}

export function detectCycle(nodes, connections) {
  const visited = new Set();
  const stack = new Set();

  function dfs(nodeId) {
    if (stack.has(nodeId)) return true;
    if (visited.has(nodeId)) return false;

    visited.add(nodeId);
    stack.add(nodeId);

    const children = getChildren(nodes, connections, nodeId);
    for (const child of children) {
      if (dfs(child.id)) return true;
    }

    stack.delete(nodeId);
    return false;
  }

  for (const node of nodes) {
    if (dfs(node.id)) return true;
  }

  return false;
}

export function getOrphanNodes(nodes, connections) {
  const start = getStartNode(nodes);
  if (!start) return nodes;

  const reachable = new Set(traverseFromStart(nodes, connections).map((n) => n.id));
  return nodes.filter((n) => !reachable.has(n.id));
}
