import React from "react";

function InputField({
  label,
  type,
  id,
  value,
  onChange,
  placeholder,
  className = "",
}) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-[13px] font-semibold text-black/50">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className={`outline-none placeholder:text-sm placeholder:opacity-75 block w-full rounded-lg bg-white/70 text-gray-500 placeholder-gray-500 border-none shadow-sm focus:ring-2 focus:ring-blue-300 sm:text-base py-2 px-4 font-semibold transition  ${className}`}
      />
    </div>
  );
}

export default InputField;
