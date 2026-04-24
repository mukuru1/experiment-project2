import { createContext, useContext, useReducer, useCallback } from 'react';
import { nanoid } from 'nanoid';
import flowData from '../flow_data.json';

const FlowContext = createContext(null);

function convertFlowData(raw) {
  const nodes = raw.nodes.map((n) => ({
    id: n.id,
    type: n.type,
    position: n.position,
    data: {
      label: n.type === 'start' ? 'Start' : n.type === 'end' ? 'End' : n.text?.slice(0, 30) || n.type,
      text: n.text || '',
      options: n.options?.map((opt, i) => ({
        id: nanoid(6),
        label: opt.label,
        nextId: opt.nextId,
      })) || [],
    },
  }));

  const connections = [];
  raw.nodes.forEach((n) => {
    if (n.options) {
      n.options.forEach((opt, i) => {
        if (opt.nextId) {
          connections.push({
            id: nanoid(8),
            sourceId: n.id,
            targetId: opt.nextId,
            sourcePort: i,
          });
        }
      });
    }
  });

  return { nodes, connections };
}

const convertedData = convertFlowData(flowData);

const initialState = {
  nodes: convertedData.nodes,
  connections: convertedData.connections,
  selectedNodeId: null,
  editingNodeId: null,
  previewState: null,
};

function flowReducer(state, action) {
  switch (action.type) {
    case 'ADD_NODE': {
      const newNode = {
        id: nanoid(8),
        type: action.payload.type,
        position: action.payload.position || { x: 300, y: 200 },
        data: action.payload.data || getDefaultData(action.payload.type),
      };
      return { ...state, nodes: [...state.nodes, newNode] };
    }

    case 'UPDATE_NODE': {
      return {
        ...state,
        nodes: state.nodes.map((n) =>
          n.id === action.payload.id
            ? { ...n, data: { ...n.data, ...action.payload.data } }
            : n
        ),
      };
    }

    case 'MOVE_NODE': {
      return {
        ...state,
        nodes: state.nodes.map((n) =>
          n.id === action.payload.id
            ? { ...n, position: action.payload.position }
            : n
        ),
      };
    }

    case 'DELETE_NODE': {
      return {
        ...state,
        nodes: state.nodes.filter((n) => n.id !== action.payload),
        connections: state.connections.filter(
          (c) => c.sourceId !== action.payload && c.targetId !== action.payload
        ),
        selectedNodeId:
          state.selectedNodeId === action.payload ? null : state.selectedNodeId,
        editingNodeId:
          state.editingNodeId === action.payload ? null : state.editingNodeId,
      };
    }

    case 'SELECT_NODE': {
      return { ...state, selectedNodeId: action.payload };
    }

    case 'EDIT_NODE': {
      return { ...state, editingNodeId: action.payload, selectedNodeId: action.payload };
    }

    case 'ADD_CONNECTION': {
      const exists = state.connections.some(
        (c) =>
          c.sourceId === action.payload.sourceId &&
          c.sourcePort === action.payload.sourcePort &&
          c.targetId === action.payload.targetId
      );
      if (exists) return state;
      if (action.payload.sourceId === action.payload.targetId) return state;
      return {
        ...state,
        connections: [
          ...state.connections,
          { id: nanoid(8), ...action.payload },
        ],
      };
    }

    case 'DELETE_CONNECTION': {
      return {
        ...state,
        connections: state.connections.filter((c) => c.id !== action.payload),
      };
    }

    case 'SET_PREVIEW': {
      return { ...state, previewState: action.payload };
    }

    case 'LOAD_FLOW': {
      return { ...state, ...action.payload };
    }

    default:
      return state;
  }
}

function getDefaultData(type) {
  switch (type) {
    case 'start':
      return { label: 'Start', text: '', options: [] };
    case 'message':
      return { label: 'Message', text: '', options: [] };
    case 'question':
      return {
        label: 'Question',
        text: '',
        options: [
          { id: nanoid(6), label: 'Option 1', nextId: null },
          { id: nanoid(6), label: 'Option 2', nextId: null },
        ],
      };
    case 'end':
      return { label: 'End', text: '', options: [] };
    default:
      return { label: 'Node', text: '', options: [] };
  }
}

export function FlowProvider({ children }) {
  const [state, dispatch] = useReducer(flowReducer, initialState);

  const addNode = useCallback(
    (type, position) => dispatch({ type: 'ADD_NODE', payload: { type, position } }),
    []
  );

  const updateNode = useCallback(
    (id, data) => dispatch({ type: 'UPDATE_NODE', payload: { id, data } }),
    []
  );

  const moveNode = useCallback(
    (id, position) => dispatch({ type: 'MOVE_NODE', payload: { id, position } }),
    []
  );

  const deleteNode = useCallback(
    (id) => dispatch({ type: 'DELETE_NODE', payload: id }),
    []
  );

  const selectNode = useCallback(
    (id) => dispatch({ type: 'SELECT_NODE', payload: id }),
    []
  );

  const editNode = useCallback(
    (id) => dispatch({ type: 'EDIT_NODE', payload: id }),
    []
  );

  const addConnection = useCallback(
    (sourceId, targetId, sourcePort) =>
      dispatch({
        type: 'ADD_CONNECTION',
        payload: { sourceId, targetId, sourcePort },
      }),
    []
  );

  const deleteConnection = useCallback(
    (id) => dispatch({ type: 'DELETE_CONNECTION', payload: id }),
    []
  );

  const setPreview = useCallback(
    (previewState) => dispatch({ type: 'SET_PREVIEW', payload: previewState }),
    []
  );

  const loadFlow = useCallback(
    (data) => dispatch({ type: 'LOAD_FLOW', payload: data }),
    []
  );

  const value = {
    ...state,
    addNode,
    updateNode,
    moveNode,
    deleteNode,
    selectNode,
    editNode,
    addConnection,
    deleteConnection,
    setPreview,
    loadFlow,
  };

  return <FlowContext.Provider value={value}>{children}</FlowContext.Provider>;
}

export function useFlowContext() {
  const ctx = useContext(FlowContext);
  if (!ctx) throw new Error('useFlowContext must be used within FlowProvider');
  return ctx;
}
