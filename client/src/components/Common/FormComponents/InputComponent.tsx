import { FieldValues } from "react-hook-form";
import { InputProps } from "../../../interfaces/CommonProps";

const InputComponent = <T extends FieldValues>({
  type,
  name,

  label,
  register,
  error,
  notRequired,
  minlen,
  id,
  maxlen,
  isNumber,
  isDisabled,
  defaultValue,
}: InputProps<T>) => {
  const validationRules: Record<string, unknown> = {
    required: !notRequired,
    minLength: minlen,
    maxLength: maxlen,
  };

  // Apply custom pattern validation for numbers if isNumber is true
  if (isNumber) {
    validationRules.pattern = {
      value: /^[+-]?\d*\.?\d*$/,
      message: "This field allows only numbers",
    };
  }

  return (
    <div className="container">
      <div className="mb-3">
        <label
          className="form-label  fw-bold text-capitalize text-uppercase "
          id={id}
          htmlFor={label}
        >
          {label}
        </label>
        <input
          type={type || "text"}
          className="form-control py-3"
          id={label}
          aria-describedby="emailHelp"
          // placeholder={`Enter ${label}` || placeholder}
          {...register(name, {
            ...validationRules,
          })}
          disabled={isDisabled}
          value={defaultValue}
        />

        <div className="text-danger fs-6 ">
          {error && error.type === "required" && <p>{label} required</p>}
          {error && error.type === "minLength" && (
            <p>This field requires a minimum of {minlen} characters</p>
          )}
          {error && error.type === "maxLength" && (
            <p>This field allows only {maxlen} characters</p>
          )}
          {error && error.type === "pattern" && <p>{error.message}</p>}
        </div>
      </div>
    </div>
  );
};

export default InputComponent;
