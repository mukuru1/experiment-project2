export const NODE_TYPES = {
  start: {
    label: 'Start',
    color: 'var(--color-start)',
    bgColor: 'var(--bg-node-start)',
    borderColor: 'var(--border-node-start)',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    ),
    description: 'Entry point of the flow',
  },
  message: {
    label: 'Message',
    color: 'var(--color-message)',
    bgColor: 'var(--bg-node-message)',
    borderColor: 'var(--border-node-message)',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
    description: 'Send a message to the user',
  },
  question: {
    label: 'Question',
    color: 'var(--color-question)',
    bgColor: 'var(--bg-node-question)',
    borderColor: 'var(--border-node-question)',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" />
      </svg>
    ),
    description: 'Ask a question with options',
  },
  end: {
    label: 'End',
    color: 'var(--color-end)',
    bgColor: 'var(--bg-node-end)',
    borderColor: 'var(--border-node-end)',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
      </svg>
    ),
    description: 'End of the flow',
  },
};

export function getNodeConfig(type) {
  return NODE_TYPES[type] || NODE_TYPES.message;
}
