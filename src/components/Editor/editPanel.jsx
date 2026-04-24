import { useFlowContext } from '../../context/flowcontext';
import useNodeSelection from '../../hooks/useNodeSelection';
import NodeEditor from './nodeEditor';
import { validateFlow } from '../../utils/validation';

export default function EditPanel() {
  const { nodes, connections, editingNodeId } = useFlowContext();
  const { selectedNode, editingNode, clearSelection } = useNodeSelection();

  const errors = validateFlow(nodes, connections);

  return (
    <div className="w-72 bg-white border-l border-neutral-200 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-neutral-200 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-neutral-800">
          {editingNode ? 'Edit Node' : 'Properties'}
        </h2>
        {editingNode && (
          <button
            onClick={clearSelection}
            className="p-1 rounded-md text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Editor content */}
      <div className="flex-1 overflow-y-auto">
        <NodeEditor />
      </div>

      {/* Validation footer */}
      {errors.length > 0 && (
        <div className="border-t border-neutral-200 p-3 bg-warning-50">
          <p className="text-xs font-medium text-warning-700 mb-1.5">Issues</p>
          <ul className="space-y-1">
            {errors.map((err, i) => (
              <li key={i} className="text-xs text-warning-600 flex items-start gap-1.5">
                <span className="mt-0.5 flex-shrink-0">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L1 21h22L12 2zm0 4l8 14H4L12 6zm-1 4v5h2v-5h-2zm0 7v2h2v-2h-2z" />
                  </svg>
                </span>
                {err}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
