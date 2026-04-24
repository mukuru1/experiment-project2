import { useState, useCallback, useRef, useEffect } from 'react';
import { useFlowContext } from '../../context/flowcontext';
import useTraversal from '../../hooks/useTraversal';
import ChatMessage from './chatMessage';
import OptionButtons from './optionButtons';

export default function ChatWindow() {
  const { nodes, connections, setPreview } = useFlowContext();
  const { getNextNode, getStart } = useTraversal();
  const [messages, setMessages] = useState([]);
  const [currentNode, setCurrentNode] = useState(null);
  const [waitingForInput, setWaitingForInput] = useState(false);
  const [ended, setEnded] = useState(false);
  const scrollRef = useRef(null);

  const startChat = useCallback(() => {
    const start = getStart();
    if (!start) return;

    setMessages([]);
    setEnded(false);
    setWaitingForInput(false);

    processNode(start);
  }, [nodes, connections]);

  const processNode = useCallback(
    (node) => {
      if (!node) {
        setEnded(true);
        setWaitingForInput(false);
        return;
      }

      setCurrentNode(node);

      if (node.type === 'start') {
        if (node.data.text) {
          setMessages((prev) => [
            ...prev,
            { type: 'bot', text: node.data.text },
          ]);
        }
        if (node.data.options?.length > 0) {
          setWaitingForInput(true);
        } else {
          const next = getNextNode(node.id);
          if (next) {
            setTimeout(() => processNode(next), 400);
          } else {
            setEnded(true);
            setWaitingForInput(false);
          }
        }
      } else if (node.type === 'message') {
        setMessages((prev) => [
          ...prev,
          { type: 'bot', text: node.data.text || 'No message' },
        ]);
        const next = getNextNode(node.id);
        if (next) {
          setTimeout(() => processNode(next), 400);
        } else {
          setEnded(true);
          setWaitingForInput(false);
        }
      } else if (node.type === 'question') {
        setMessages((prev) => [
          ...prev,
          { type: 'bot', text: node.data.text || 'No question' },
        ]);
        if (node.data.options?.length > 0) {
          setWaitingForInput(true);
        } else {
          setEnded(true);
          setWaitingForInput(false);
        }
      } else if (node.type === 'end') {
        setMessages((prev) => [
          ...prev,
          { type: 'bot', text: node.data.text || 'Conversation ended. Thank you!' },
        ]);
        setEnded(true);
        setWaitingForInput(false);
      }
    },
    [getNextNode]
  );

  const handleOptionSelect = useCallback(
    (optionIndex) => {
      if (!currentNode) return;

      const option = currentNode.data.options?.[optionIndex];
      if (option) {
        setMessages((prev) => [
          ...prev,
          { type: 'user', text: option.label },
        ]);
      }

      setWaitingForInput(false);
      const next = getNextNode(currentNode.id, optionIndex);
      if (next) {
        setTimeout(() => processNode(next), 400);
      } else {
        setEnded(true);
      }
    },
    [currentNode, getNextNode, processNode]
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, waitingForInput]);

  useEffect(() => {
    startChat();
  }, []);

  return (
    <div className="flex flex-col h-full bg-neutral-50">
      {/* Chat header */}
      <div className="px-4 py-3 bg-white border-b border-neutral-200 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary-600)" strokeWidth="2">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-semibold text-neutral-800">Support Bot</p>
          <p className="text-xs text-secondary-500">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <ChatMessage key={i} message={msg.text} isBot={msg.type === 'bot'} />
        ))}

        {waitingForInput && currentNode?.data.options && (
          <OptionButtons
            options={currentNode.data.options}
            onSelect={handleOptionSelect}
            disabled={false}
          />
        )}

        {ended && (
          <div className="text-center py-4">
            <p className="text-xs text-neutral-400 mb-3">Chat ended</p>
            <button
              onClick={startChat}
              className="px-4 py-2 text-xs font-medium rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors"
            >
              Restart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
