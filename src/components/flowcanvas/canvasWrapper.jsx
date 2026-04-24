import { useFlowContext } from '../../context/flowcontext';
import { NODE_TYPES } from './nodeTypes';
import FlowCanvas from './flowCanvas';

export default function CanvasWrapper() {
  const { addNode } = useFlowContext();

  const handleDragStart = (e, type) => {
    e.dataTransfer.setData('nodeType', type);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const nodeTypes = [
    { type: 'message', ...NODE_TYPES.message },
    { type: 'question', ...NODE_TYPES.question },
    { type: 'end', ...NODE_TYPES.end },
  ];

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Node palette sidebar */}
      <div className="w-56 bg-white border-r border-neutral-200 flex flex-col">
        <div className="px-4 py-3 border-b border-neutral-200">
          <h2 className="text-sm font-semibold text-neutral-800">Nodes</h2>
          <p className="text-xs text-neutral-400 mt-0.5">Drag to canvas</p>
        </div>
        <div className="flex-1 p-3 space-y-2 overflow-y-auto">
          {nodeTypes.map(({ type, label, color, icon, description }) => (
            <div
              key={type}
              draggable
              onDragStart={(e) => handleDragStart(e, type)}
              className="flex items-start gap-3 p-3 rounded-lg border border-neutral-200 bg-white cursor-grab active:cursor-grabbing hover:border-neutral-300 hover:shadow-sm transition-all duration-150"
            >
              <div
                className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${color}15`, color }}
              >
                {icon}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-neutral-700">{label}</p>
                <p className="text-xs text-neutral-400 mt-0.5">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Canvas */}
      <FlowCanvas />
    </div>
  );
}
