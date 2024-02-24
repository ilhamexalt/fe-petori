export default function InputComponent({ placeholder, className }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-md  focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pl-1 md:pl-3 pt-1 pb-1 w-28 md:w-48 text-xs md:text-base ${className}`}
    />
  );
}
