import { clsx } from 'clsx';

export default function Card({ children, className, ...props }) {
  return (
    <div
      className={clsx(
        'bg-white border border-neutral-200 rounded-xl shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

Card.Header = function CardHeader({ children, className, ...props }) {
  return (
    <div
      className={clsx(
        'px-4 py-3 border-b border-neutral-200 font-medium text-sm text-neutral-800',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

Card.Body = function CardBody({ children, className, ...props }) {
  return (
    <div className={clsx('p-4', className)} {...props}>
      {children}
    </div>
  );
};
