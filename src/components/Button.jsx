export default function ButtonComponent({
  onClick,
  type,
  className,
  children,
  title,
  disabled,
}) {
  return (
    <button
      disabled={disabled}
      title={title}
      type={type}
      onClick={onClick}
      className={`gap-1 w-28 bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-sm rounded-md hover:bg-indigo-600
        transition hover:ring-1 ${className}`}
    >
      {children}
    </button>
  );
}
