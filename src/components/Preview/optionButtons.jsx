import { clsx } from 'clsx';

export default function OptionButtons({ options, onSelect, disabled }) {
  return (
    <div className="flex flex-col gap-2 animate-message-appear">
      {options.map((opt, i) => (
        <button
          key={opt.id || i}
          onClick={() => onSelect(i)}
          disabled={disabled}
          className={clsx(
            'w-full px-4 py-2.5 text-sm font-medium rounded-xl border-2 transition-all duration-150',
            'text-left',
            disabled
              ? 'opacity-50 cursor-not-allowed border-neutral-200 bg-neutral-50 text-neutral-400'
              : 'border-primary-200 bg-primary-50 text-primary-700 hover:bg-primary-100 hover:border-primary-300 active:scale-[0.98]'
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
