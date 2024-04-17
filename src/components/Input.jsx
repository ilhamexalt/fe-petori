export default function InputComponent({
  placeholder,
  className,
  onChange,
  value,
  id,
  type,
  props,
  onFocus,
  onBlur,
  required,
  disabled,
  ref,
  autoFocus,
  readOnly,
}) {
  return (
    <input
      readOnly={readOnly}
      autoFocus={autoFocus}
      ref={ref}
      disabled={disabled}
      required={required}
      {...props}
      id={id}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      type={type}
      placeholder={placeholder}
      className={`appearance-none block w-full text-xs bg-gray-200 text-gray-700 border border-gray-200 rounded-sm py-3 px-4 leading-tight focus:border-b-indigo-500 focus:border-t-0 focus:border-r-0 focus:border-l-0 focus:rounded-none focus:outline-none focus:bg-white ${className}`}
      // focus:outline-none focus:bg-white focus:border-gray-500
    />
  );
}
