import React from "react";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

function FormField({
  labelText,
  fieldType,
  inputType,
  placeholder,
  error,
  value,
  setValue,
}) {
  return (
    <div id={fieldType}>
      <label
        className="block text-sm font-medium text-gray-700"
        htmlFor={fieldType}
      >
        {labelText}
      </label>
      <div className={`mt-1 ${error ? "relative rounded-md shadow-sm" : ""}`}>
        <input
          className={`block w-full rounded-md sm:text-sm ${
            error
              ? "border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500"
              : "border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          }`}
          id={fieldType}
          name={fieldType}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {error && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export default FormField;
