import { useState, useCallback } from 'react';
import { useFlowContext } from '../context/flowcontext';
import CanvasWrapper from '../components/flowcanvas/canvasWrapper';
import EditPanel from '../components/Editor/editPanel';
import ChatWindow from '../components/Preview/chatWindow';
import PreviewControls from '../components/Preview/previewControls';
import Button from '../components/UI/button';
import { autoLayout } from '../utils/layout';

export default function BuilderPage() {
  const { nodes, connections, loadFlow } = useFlowContext();
  const [showPreview, setShowPreview] = useState(false);

  const handleAutoLayout = useCallback(() => {
    const laid = autoLayout(nodes, connections);
    loadFlow({ nodes: laid, connections });
  }, [nodes, connections, loadFlow]);

  return (
    <div className="flex flex-col h-screen">
      {/* Toolbar */}
      <header className="h-12 bg-white border-b border-neutral-200 flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary-500 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M4 6h16M4 12h16M4 18h10" />
              </svg>
            </div>
            <h1 className="text-sm font-bold text-neutral-800">SupportFlow</h1>
          </div>
          <span className="text-xs text-neutral-400 hidden sm:inline">Builder</span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleAutoLayout}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
            </svg>
            Auto Layout
          </Button>
          <Button
            variant={showPreview ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setShowPreview(!showPreview)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            {showPreview ? 'Hide Preview' : 'Preview'}
          </Button>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Canvas area */}
        <div className="flex-1 flex overflow-hidden">
          <CanvasWrapper />
        </div>

        {/* Preview panel */}
        {showPreview && (
          <div className="w-80 border-l border-neutral-200 flex flex-col bg-white animate-slide-in-right">
            <PreviewControls
              onRestart={() => {
                const el = document.querySelector('.chat-restart-trigger');
                if (el) el.click();
              }}
              onClose={() => setShowPreview(false)}
            />
            <div className="flex-1 overflow-hidden">
              <ChatWindow />
            </div>
          </div>
        )}

        {/* Edit panel */}
        <EditPanel />
      </div>
    </div>
  );
}
