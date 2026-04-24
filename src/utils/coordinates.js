export const NODE_WIDTH = 220;
export const NODE_HEADER_HEIGHT = 36;
export const PORT_SIZE = 12;
export const PORT_OFFSET = 6;

export function getNodeCenter(node) {
  return {
    x: node.position.x + NODE_WIDTH / 2,
    y: node.position.y + NODE_HEADER_HEIGHT / 2,
  };
}

export function getOutputPortPosition(node) {
  return {
    x: node.position.x + NODE_WIDTH / 2,
    y: node.position.y + getNodeHeight(node),
  };
}

export function getInputPortPosition(node) {
  return {
    x: node.position.x + NODE_WIDTH / 2,
    y: node.position.y,
  };
}

export function getOptionPortPosition(node, optionIndex, totalOptions) {
  const spacing = NODE_WIDTH / (totalOptions + 1);
  return {
    x: node.position.x + spacing * (optionIndex + 1),
    y: node.position.y + getNodeHeight(node),
  };
}

export function getNodeHeight(node) {
  if (node.type === 'question' && node.data.options) {
    return NODE_HEADER_HEIGHT + 32 + node.data.options.length * 32 + 16;
  }
  return NODE_HEADER_HEIGHT + 48;
}

export function getCanvasPoint(e, canvasRef, pan) {
  const rect = canvasRef.current.getBoundingClientRect();
  return {
    x: e.clientX - rect.left - pan.x,
    y: e.clientY - rect.top - pan.y,
  };
}

export function distance(a, b) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

export function snapToGrid(value, gridSize = 24) {
  return Math.round(value / gridSize) * gridSize;
}
