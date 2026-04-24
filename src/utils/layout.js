import { NODE_WIDTH, getNodeHeight } from './coordinates';
import { getChildren, getStartNode } from './graph';

const HORIZONTAL_SPACING = 80;
const VERTICAL_SPACING = 60;

export function autoLayout(nodes, connections) {
  const start = getStartNode(nodes);
  if (!start) return nodes;

  const positioned = new Map();
  const levelCounts = new Map();

  function assignLevel(nodeId, level) {
    if (positioned.has(nodeId)) return;

    const count = levelCounts.get(level) || 0;
    levelCounts.set(level, count + 1);

    const node = nodes.find((n) => n.id === nodeId);
    if (!node) return;

    positioned.set(nodeId, {
      x: level * (NODE_WIDTH + HORIZONTAL_SPACING) + 80,
      y: count * (getNodeHeight(node) + VERTICAL_SPACING) + 80,
    });

    const children = getChildren(nodes, connections, nodeId);
    children.forEach((child, i) => {
      assignLevel(child.id, level + 1);
    });
  }

  assignLevel(start.id, 0);

  return nodes.map((node) => ({
    ...node,
    position: positioned.get(node.id) || node.position,
  }));
}

export function fitToView(nodes, canvasWidth, canvasHeight, padding = 40) {
  if (nodes.length === 0) return { x: 0, y: 0, scale: 1 };

  const minX = Math.min(...nodes.map((n) => n.position.x));
  const minY = Math.min(...nodes.map((n) => n.position.y));
  const maxX = Math.max(...nodes.map((n) => n.position.x + NODE_WIDTH));
  const maxY = Math.max(...nodes.map((n) => n.position.y + 120));

  const contentWidth = maxX - minX;
  const contentHeight = maxY - minY;

  const scaleX = (canvasWidth - padding * 2) / contentWidth;
  const scaleY = (canvasHeight - padding * 2) / contentHeight;
  const scale = Math.min(scaleX, scaleY, 1);

  return {
    x: (canvasWidth - contentWidth * scale) / 2 - minX * scale,
    y: (canvasHeight - contentHeight * scale) / 2 - minY * scale,
    scale,
  };
}
