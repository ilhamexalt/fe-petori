import React from "react";

export default function LabelComponent({ label, htmlFor }) {
  return (
    <label
      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
      htmlFor={htmlFor}
    >
      {label}
    </label>
  );
}
