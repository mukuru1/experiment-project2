import { clsx } from 'clsx';
import { getNodeConfig } from './nodeTypes';
import { NODE_WIDTH, getNodeHeight } from '../../utils/coordinates';

export default function FlowNode({
  node,
  selected,
  onPointerDown,
  onDoubleClick,
  onPortPointerDown,
  onPortPointerUp,
  connectingFrom,
}) {
  const config = getNodeConfig(node.type);
  const height = getNodeHeight(node);

  return (
    <div
      className={clsx(
        'absolute rounded-xl border-2 cursor-grab active:cursor-grabbing select-none',
        'transition-shadow duration-150',
        selected && 'ring-2 ring-primary-500/30 shadow-lg',
        !selected && 'shadow-sm hover:shadow-md'
      )}
      style={{
        left: node.position.x,
        top: node.position.y,
        width: NODE_WIDTH,
        height,
        backgroundColor: config.bgColor,
        borderColor: selected ? 'var(--primary-500)' : config.borderColor,
        zIndex: selected ? 15 : 10,
      }}
      onPointerDown={onPointerDown}
      onDoubleClick={onDoubleClick}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2 px-3 rounded-t-xl"
        style={{
          height: 36,
          color: config.color,
          borderBottom: `1px solid ${config.borderColor}`,
        }}
      >
        <span className="flex-shrink-0">{config.icon}</span>
        <span className="text-xs font-semibold truncate">
          {node.data.label || config.label}
        </span>
      </div>

      {/* Body */}
      <div className="px-3 py-2">
        {node.type === 'message' && (
          <p className="text-xs text-neutral-500 line-clamp-2">
            {node.data.text || 'No message text'}
          </p>
        )}
        {node.type === 'question' && (
          <>
            <p className="text-xs text-neutral-500 line-clamp-1 mb-1.5">
              {node.data.text || 'No question text'}
            </p>
            <div className="flex flex-col gap-1">
              {node.data.options?.map((opt, i) => (
                <div
                  key={opt.id}
                  className="text-xs px-2 py-1 rounded-md bg-white border border-neutral-200 text-neutral-600 truncate"
                >
                  {opt.label}
                </div>
              ))}
            </div>
          </>
        )}
        {node.type === 'start' && (
          <>
            {node.data.text && (
              <p className="text-xs text-neutral-500 line-clamp-1 mb-1.5">
                {node.data.text}
              </p>
            )}
            {node.data.options?.length > 0 ? (
              <div className="flex flex-col gap-1">
                {node.data.options.map((opt, i) => (
                  <div
                    key={opt.id}
                    className="text-xs px-2 py-1 rounded-md bg-white border border-primary-200 text-primary-600 truncate"
                  >
                    {opt.label}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-neutral-400 italic">Flow entry point</p>
            )}
          </>
        )}
        {node.type === 'end' && (
          <>
            {node.data.text ? (
              <p className="text-xs text-neutral-500 line-clamp-2">
                {node.data.text}
              </p>
            ) : (
              <p className="text-xs text-neutral-400 italic">Flow ends here</p>
            )}
          </>
        )}
      </div>

      {/* Input port (not for start nodes) */}
      {node.type !== 'start' && (
        <div
          className="node-port absolute -top-1.5 left-1/2 -translate-x-1/2"
          onPointerUp={(e) => {
            e.stopPropagation();
            onPortPointerUp?.(node.id);
          }}
        />
      )}

      {/* Output port (not for end nodes) */}
      {node.type !== 'end' && (
        <div
          className={clsx(
            'node-port absolute -bottom-1.5 left-1/2 -translate-x-1/2',
            connectingFrom?.nodeId === node.id && 'active'
          )}
          onPointerDown={(e) => {
            e.stopPropagation();
            onPortPointerDown?.(node.id, null);
          }}
        />
      )}

      {/* Option ports for question and start nodes with options */}
      {(node.type === 'question' || (node.type === 'start' && node.data.options?.length > 0)) &&
        node.data.options?.map((opt, i) => {
          const total = node.data.options.length;
          const spacing = NODE_WIDTH / (total + 1);
          return (
            <div
              key={opt.id}
              className={clsx(
                'node-port absolute -bottom-1.5',
                connectingFrom?.nodeId === node.id &&
                  connectingFrom?.port === i &&
                  'active'
              )}
              style={{ left: spacing * (i + 1) - 6 }}
              onPointerDown={(e) => {
                e.stopPropagation();
                onPortPointerDown?.(node.id, i);
              }}
            />
          );
        })}
    </div>
  );
}
