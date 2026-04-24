import { clsx } from 'clsx';

const variants = {
  primary: 'bg-primary-500 hover:bg-primary-600 text-white border-primary-500 hover:border-primary-600',
  secondary: 'bg-white hover:bg-neutral-50 text-neutral-700 border-neutral-300 hover:border-neutral-400',
  danger: 'bg-error-500 hover:bg-error-600 text-white border-error-500 hover:border-error-600',
  ghost: 'bg-transparent hover:bg-neutral-100 text-neutral-600 border-transparent hover:border-neutral-200',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs rounded-md',
  md: 'px-4 py-2 text-sm rounded-lg',
  lg: 'px-5 py-2.5 text-sm rounded-lg',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  disabled,
  ...props
}) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center gap-2 font-medium border transition-all duration-150',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
