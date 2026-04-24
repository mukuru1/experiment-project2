import { nanoid } from 'nanoid';
import Button from '../UI/button';
import Input from '../UI/input';

export default function OptionEditor({ options, onChange }) {
  const handleAdd = () => {
    onChange([...options, { id: nanoid(6), label: '' }]);
  };

  const handleRemove = (index) => {
    onChange(options.filter((_, i) => i !== index));
  };

  const handleChange = (index, value) => {
    const updated = options.map((opt, i) =>
      i === index ? { ...opt, label: value } : opt
    );
    onChange(updated);
  };

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-neutral-600">Options</label>
      <div className="space-y-2">
        {options.map((opt, i) => (
          <div key={opt.id} className="flex items-center gap-2">
            <span className="text-xs text-neutral-400 w-5 text-right flex-shrink-0">
              {i + 1}
            </span>
            <input
              value={opt.label}
              onChange={(e) => handleChange(i, e.target.value)}
              placeholder={`Option ${i + 1}`}
              className="flex-1 px-3 py-1.5 text-sm rounded-md border border-neutral-300 bg-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors"
            />
            <button
              onClick={() => handleRemove(i)}
              className="p-1 rounded text-neutral-400 hover:text-error-500 hover:bg-error-50 transition-colors flex-shrink-0"
              title="Remove option"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
      <Button variant="ghost" size="sm" onClick={handleAdd} className="w-full">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12h14" />
        </svg>
        Add Option
      </Button>
    </div>
  );
}
