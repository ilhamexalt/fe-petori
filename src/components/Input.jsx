export default function InputComponent({
  placeholder,
  className,
  onChange,
  value,
  id,
  type,
}) {
  return (
    <input
      id={id}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      className={`appearance-none block w-full text-xs bg-gray-200 text-gray-700 border border-gray-200 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${className}`}
    />
  );
}
