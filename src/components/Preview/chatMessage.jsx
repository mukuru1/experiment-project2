import { clsx } from 'clsx';

export default function ChatMessage({ message, isBot = true }) {
  return (
    <div
      className={clsx(
        'flex gap-2.5 animate-message-appear',
        isBot ? 'justify-start' : 'justify-end'
      )}
    >
      {isBot && (
        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center mt-0.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--primary-600)" strokeWidth="2.5">
            <path d="M12 2a3 3 0 00-3 3v1H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-3V5a3 3 0 00-3-3zm0 2a1 1 0 011 1v1h-2V5a1 1 0 011-1z" />
          </svg>
        </div>
      )}
      <div
        className={clsx(
          'max-w-[80%] px-3.5 py-2.5 text-sm leading-relaxed',
          isBot
            ? 'bg-white border border-neutral-200 text-neutral-800 rounded-2xl rounded-tl-md'
            : 'bg-primary-500 text-white rounded-2xl rounded-tr-md'
        )}
      >
        {message}
      </div>
    </div>
  );
}
