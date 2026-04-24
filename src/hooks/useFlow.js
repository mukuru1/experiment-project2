import { useFlowContext } from '../context/flowcontext';

export default function useFlow() {
  const {
    nodes,
    connections,
    addNode,
    updateNode,
    moveNode,
    deleteNode,
    loadFlow,
  } = useFlowContext();

  const getNode = (id) => nodes.find((n) => n.id === id);

  const getNodesByType = (type) => nodes.filter((n) => n.type === type);

  const addMessageNode = (position) => addNode('message', position);
  const addQuestionNode = (position) => addNode('question', position);
  const addEndNode = (position) => addNode('end', position);

  const duplicateNode = (id) => {
    const node = getNode(id);
    if (!node || node.type === 'start') return;
    addNode(node.type, {
      x: node.position.x + 40,
      y: node.position.y + 40,
    });
  };

  return {
    nodes,
    connections,
    getNode,
    getNodesByType,
    addNode,
    addMessageNode,
    addQuestionNode,
    addEndNode,
    updateNode,
    moveNode,
    deleteNode,
    duplicateNode,
    loadFlow,
  };
}
