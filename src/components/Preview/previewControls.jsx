import Button from '../UI/button';

export default function PreviewControls({ onRestart, onClose }) {
  return (
    <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-neutral-200">
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
          Preview
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onRestart}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 4v6h6M23 20v-6h-6" />
            <path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15" />
          </svg>
          Restart
        </Button>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
          Close
        </Button>
      </div>
    </div>
  );
}
