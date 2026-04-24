import { getOutputPortPosition, getInputPortPosition, getOptionPortPosition, getNodeHeight } from '../../utils/coordinates';

export default function Connections({ nodes, connections, connectingFrom, mousePos }) {
  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 5 }}
    >
      <defs>
        <marker
          id="arrowhead"
          markerWidth="8"
          markerHeight="6"
          refX="8"
          refY="3"
          orient="auto"
        >
          <polygon
            points="0 0, 8 3, 0 6"
            fill="var(--color-connection)"
          />
        </marker>
        <marker
          id="arrowhead-active"
          markerWidth="8"
          markerHeight="6"
          refX="8"
          refY="3"
          orient="auto"
        >
          <polygon
            points="0 0, 8 3, 0 6"
            fill="var(--color-connection-highlight)"
          />
        </marker>
      </defs>

      {/* Existing connections */}
      {connections.map((conn) => {
        const sourceNode = nodes.find((n) => n.id === conn.sourceId);
        const targetNode = nodes.find((n) => n.id === conn.targetId);
        if (!sourceNode || !targetNode) return null;

        const from =
          conn.sourcePort !== null && conn.sourcePort !== undefined
            ? getOptionPortPosition(
                sourceNode,
                conn.sourcePort,
                sourceNode.data.options?.length || 1
              )
            : getOutputPortPosition(sourceNode);

        const to = getInputPortPosition(targetNode);

        return (
          <g key={conn.id}>
            <ConnectionPath from={from} to={to} />
          </g>
        );
      })}

      {/* Active connection being drawn */}
      {connectingFrom && mousePos && (() => {
        const sourceNode = nodes.find((n) => n.id === connectingFrom.nodeId);
        if (!sourceNode) return null;

        const from =
          connectingFrom.port !== null && connectingFrom.port !== undefined
            ? getOptionPortPosition(
                sourceNode,
                connectingFrom.port,
                sourceNode.data.options?.length || 1
              )
            : getOutputPortPosition(sourceNode);

        return (
          <ConnectionPath
            from={from}
            to={mousePos}
            active
          />
        );
      })()}
    </svg>
  );
}

function ConnectionPath({ from, to, active = false }) {
  const dx = Math.abs(to.x - from.x);
  const dy = to.y - from.y;
  const curvature = Math.max(50, Math.min(150, dy * 0.5, dx * 0.3));

  const path = `M ${from.x} ${from.y} C ${from.x} ${from.y + curvature}, ${to.x} ${to.y - curvature}, ${to.x} ${to.y}`;

  return (
    <>
      {/* Invisible wider path for easier clicking */}
      <path
        d={path}
        fill="none"
        stroke="transparent"
        strokeWidth={16}
        style={{ pointerEvents: 'stroke', cursor: 'pointer' }}
      />
      {/* Visible path */}
      <path
        d={path}
        fill="none"
        stroke={active ? 'var(--color-connection-highlight)' : 'var(--color-connection)'}
        strokeWidth={2}
        strokeDasharray={active ? '6 4' : 'none'}
        markerEnd={active ? 'url(#arrowhead-active)' : 'url(#arrowhead)'}
        className={active ? 'connection-line-animated' : ''}
      />
    </>
  );
}
