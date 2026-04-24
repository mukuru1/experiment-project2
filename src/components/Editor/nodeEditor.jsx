import { useFlowContext } from '../../context/flowcontext';
import useNodeSelection from '../../hooks/useNodeSelection';
import Input from '../UI/input';
import TextArea from '../UI/textArea';
import Button from '../UI/button';
import OptionEditor from './optionEditor';
import { getNodeConfig } from '../flowcanvas/nodeTypes';

export default function NodeEditor() {
  const { updateNode, deleteNode } = useFlowContext();
  const { editingNode } = useNodeSelection();

  if (!editingNode) {
    return (
      <div className="flex items-center justify-center h-full text-neutral-400 text-sm p-6 text-center">
        Select a node and double-click to edit its properties
      </div>
    );
  }

  const config = getNodeConfig(editingNode.type);

  const handleChange = (field, value) => {
    updateNode(editingNode.id, { [field]: value });
  };

  return (
    <div className="p-4 space-y-4 animate-fade-in">
      {/* Node type badge */}
      <div className="flex items-center gap-2 pb-3 border-b border-neutral-200">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${config.color}15`, color: config.color }}
        >
          {config.icon}
        </div>
        <div>
          <p className="text-sm font-semibold text-neutral-800">{config.label}</p>
          <p className="text-xs text-neutral-400">{config.description}</p>
        </div>
      </div>

      {/* Label */}
      <Input
        label="Label"
        value={editingNode.data.label || ''}
        onChange={(e) => handleChange('label', e.target.value)}
        placeholder="Node label"
      />

      {/* Message text */}
      {editingNode.type === 'message' && (
        <TextArea
          label="Message"
          value={editingNode.data.text || ''}
          onChange={(e) => handleChange('text', e.target.value)}
          placeholder="Type the message to send..."
          rows={4}
        />
      )}

      {/* Question text and options */}
      {editingNode.type === 'question' && (
        <>
          <TextArea
            label="Question"
            value={editingNode.data.text || ''}
            onChange={(e) => handleChange('text', e.target.value)}
            placeholder="Type the question to ask..."
            rows={3}
          />
          <OptionEditor
            options={editingNode.data.options || []}
            onChange={(options) => handleChange('options', options)}
          />
        </>
      )}

      {/* Start node text and options */}
      {editingNode.type === 'start' && (
        <>
          <TextArea
            label="Welcome Message"
            value={editingNode.data.text || ''}
            onChange={(e) => handleChange('text', e.target.value)}
            placeholder="Welcome message for the user..."
            rows={3}
          />
          <OptionEditor
            options={editingNode.data.options || []}
            onChange={(options) => handleChange('options', options)}
          />
        </>
      )}

      {/* End node text */}
      {editingNode.type === 'end' && (
        <TextArea
          label="Closing Message"
          value={editingNode.data.text || ''}
          onChange={(e) => handleChange('text', e.target.value)}
          placeholder="Message when flow ends..."
          rows={3}
        />
      )}

      {/* Delete button */}
      {editingNode.type !== 'start' && (
        <div className="pt-3 border-t border-neutral-200">
          <Button
            variant="danger"
            size="sm"
            onClick={() => deleteNode(editingNode.id)}
            className="w-full"
          >
            Delete Node
          </Button>
        </div>
      )}
    </div>
  );
}
