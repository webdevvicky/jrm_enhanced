import { useState } from "react";
import "./inputcss.css";
import { FieldValues } from "react-hook-form";
import { FloatingInputProps } from "../../../interfaces/CommonProps";

const FloatingLabelInput = <T extends FieldValues>({
  type,
  label,
  register,
  name,
  error,
  validation,
  defaultValue,
}: FloatingInputProps<T>) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(!!defaultValue);

  const validationRules: Record<string, unknown> = {
    required: !validation?.notRequired,
    minLength: validation?.minlen,
    maxLength: validation?.maxlen,
  };

  // Apply custom pattern validation for numbers if isNumber is true
  if (validation?.isNumber) {
    validationRules.pattern = {
      value: /^[+-]?\d*\.?\d*$/,
      message: "This field allows only numbers",
    };
  }

  return (
    <div className="">
      <div className="mb-3">
        <div
          className={`floating-label-input ${
            isFocused || inputValue ? "active" : ""
          }`}
        >
          <input
            type={type || "text"}
            className={`form-control py-3 ${error && "border-danger"}`}
            {...register(name, {
              ...validationRules,
              value: defaultValue,
              onChange: (e) => setInputValue(e.target.value),
            })}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />

          <label htmlFor={name}>{label}</label>
        </div>

        <div className="text-danger fs-6  ms-2">
          {error && error.type === "required" && <p>{label} required</p>}
          {error && error.type === "minLength" && (
            <p>
              This field requires a minimum of {validation?.minlen} characters
            </p>
          )}
          {error && error.type === "maxLength" && (
            <p>This field allows only {validation?.maxlen} characters</p>
          )}
          {error && error.type === "pattern" && <p>{error.message}</p>}
        </div>
      </div>
    </div>
  );
};

export default FloatingLabelInput;
