import { useCallback } from 'react';
import { useFlowContext } from '../context/flowcontext';

export default function useNodeSelection() {
  const { selectedNodeId, editingNodeId, selectNode, editNode, nodes } =
    useFlowContext();

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || null;
  const editingNode = nodes.find((n) => n.id === editingNodeId) || null;

  const handleSelect = useCallback(
    (id) => {
      selectNode(id === selectedNodeId ? null : id);
    },
    [selectNode, selectedNodeId]
  );

  const handleEdit = useCallback(
    (id) => {
      editNode(id);
    },
    [editNode]
  );

  const clearSelection = useCallback(() => {
    selectNode(null);
  }, [selectNode]);

  return {
    selectedNodeId,
    selectedNode,
    editingNodeId,
    editingNode,
    selectNode: handleSelect,
    editNode: handleEdit,
    clearSelection,
  };
}
