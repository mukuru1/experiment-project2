import { clsx } from 'clsx';

export default function Input({
  label,
  error,
  className,
  id,
  ...props
}) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-medium text-neutral-600"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={clsx(
          'w-full px-3 py-2 text-sm rounded-lg border bg-white',
          'placeholder:text-neutral-400',
          'transition-colors duration-150',
          'focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500',
          error
            ? 'border-error-500 focus:ring-error-500/20 focus:border-error-500'
            : 'border-neutral-300 hover:border-neutral-400',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-error-600">{error}</p>}
    </div>
  );
}
