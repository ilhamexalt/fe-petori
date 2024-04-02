import React from "react";

export default function LabelComponent({
  label,
  htmlFor,
  className,
  children,
}) {
  return (
    <label
      className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${className}`}
      htmlFor={htmlFor}
    >
      {label}
      {children}
    </label>
  );
}
