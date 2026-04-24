import { useState, useCallback } from 'react';
import { useFlowContext } from '../context/flowcontext';
import { getOutgoingConnections, getIncomingConnections } from '../utils/graph';

export default function useConnections() {
  const { connections, addConnection, deleteConnection } = useFlowContext();
  const [connectingFrom, setConnectingFrom] = useState(null);

  const startConnecting = useCallback((nodeId, port) => {
    setConnectingFrom({ nodeId, port });
  }, []);

  const finishConnecting = useCallback(
    (targetId) => {
      if (!connectingFrom) return false;
      if (connectingFrom.nodeId === targetId) {
        setConnectingFrom(null);
        return false;
      }
      addConnection(connectingFrom.nodeId, targetId, connectingFrom.port);
      setConnectingFrom(null);
      return true;
    },
    [connectingFrom, addConnection]
  );

  const cancelConnecting = useCallback(() => {
    setConnectingFrom(null);
  }, []);

  const getOutgoing = useCallback(
    (nodeId) => getOutgoingConnections(connections, nodeId),
    [connections]
  );

  const getIncoming = useCallback(
    (nodeId) => getIncomingConnections(connections, nodeId),
    [connections]
  );

  const removeConnection = useCallback(
    (id) => deleteConnection(id),
    [deleteConnection]
  );

  return {
    connections,
    connectingFrom,
    startConnecting,
    finishConnecting,
    cancelConnecting,
    getOutgoing,
    getIncoming,
    removeConnection,
  };
}
