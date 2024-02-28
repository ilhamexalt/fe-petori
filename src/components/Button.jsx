export default function ButtonComponent({
  onClick,
  type,
  className,
  children,
  title,
}) {
  return (
    <button
      title={title}
      type={type}
      onClick={onClick}
      className={`gap-1 w-28 text-white shadow-sm rounded-md hover:bg-white
       hover:text-black transition hover:ring-1 ${className}`}
    >
      {children}
    </button>
  );
}
