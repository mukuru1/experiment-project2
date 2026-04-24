export function validateNode(node) {
  const errors = [];

  if (!node.data.label && node.type !== 'start') {
    errors.push('Node label is required');
  }

  if (node.type === 'message' && !node.data.text?.trim()) {
    errors.push('Message text is required');
  }

  if (node.type === 'question') {
    if (!node.data.text?.trim()) {
      errors.push('Question text is required');
    }
    if (!node.data.options || node.data.options.length < 2) {
      errors.push('At least 2 options are required');
    }
    if (node.data.options) {
      node.data.options.forEach((opt, i) => {
        if (!opt.label?.trim()) {
          errors.push(`Option ${i + 1} label is required`);
        }
      });
    }
  }

  return errors;
}

export function validateFlow(nodes, connections) {
  const errors = [];

  const startNodes = nodes.filter((n) => n.type === 'start');
  if (startNodes.length === 0) {
    errors.push('Flow must have a start node');
  }
  if (startNodes.length > 1) {
    errors.push('Flow can only have one start node');
  }

  const endNodes = nodes.filter((n) => n.type === 'end');
  if (endNodes.length === 0) {
    errors.push('Flow should have at least one end node');
  }

  for (const node of nodes) {
    const nodeErrors = validateNode(node);
    nodeErrors.forEach((e) => errors.push(`${node.data.label || node.type}: ${e}`));
  }

  const connectedTargets = new Set(connections.map((c) => c.targetId));
  const disconnectedNodes = nodes.filter(
    (n) => n.type !== 'start' && !connectedTargets.has(n.id)
  );
  if (disconnectedNodes.length > 0) {
    errors.push(
      `Some nodes are not connected: ${disconnectedNodes.map((n) => n.data.label || n.id).join(', ')}`
    );
  }

  return errors;
}
