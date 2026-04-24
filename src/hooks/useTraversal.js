import { useCallback } from 'react';
import { useFlowContext } from '../context/flowcontext';
import { traverseFromStart, getChildren, getStartNode } from '../utils/graph';

export default function useTraversal() {
  const { nodes, connections } = useFlowContext();

  const getFlowOrder = useCallback(
    () => traverseFromStart(nodes, connections),
    [nodes, connections]
  );

  const getNextNode = useCallback(
    (nodeId, optionIndex) => {
      const outgoing = connections.filter((c) => c.sourceId === nodeId);
      if (optionIndex !== undefined) {
        const conn = outgoing.find((c) => c.sourcePort === optionIndex);
        return conn ? nodes.find((n) => n.id === conn.targetId) : null;
      }
      const conn = outgoing[0];
      return conn ? nodes.find((n) => n.id === conn.targetId) : null;
    },
    [nodes, connections]
  );

  const getStart = useCallback(
    () => getStartNode(nodes),
    [nodes]
  );

  const getChildNodes = useCallback(
    (nodeId) => getChildren(nodes, connections, nodeId),
    [nodes, connections]
  );

  return {
    getFlowOrder,
    getNextNode,
    getStart,
    getChildNodes,
  };
}
