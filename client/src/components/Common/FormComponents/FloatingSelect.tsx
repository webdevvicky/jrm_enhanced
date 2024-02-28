import { FieldValues } from "react-hook-form";
import { SelectProps } from "../../../interfaces/CommonProps";
import { useState } from "react";

const FloatingSelect = <T extends FieldValues>({
  name,
  register,
  options,
  label,
  error,
  defaultValue = "",
  notRequired,
  emptyLabel,
}: SelectProps<T>) => {
  const [selected, setSelected] = useState<string>();
  return (
    <div className="  form-floating ">
      <select
        {...register(name, { required: !notRequired })}
        className=" form-select  "
        id="floatingSelect"
        aria-label="Floating label select example"
        value={selected || defaultValue}
        onChange={(event) => setSelected(event.target.value || "")}
      >
        <option selected defaultChecked>
          {emptyLabel || "select an option"}
        </option>
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.option}
          </option>
        ))}
      </select>

      {label && (
        <label
          htmlFor="floatingSelect"
          className=" fw-bold  text-primary-emphasis fs-5"
        >
          {label}
        </label>
      )}
      <div className="text-danger fs-6 ">
        {error && error.type === "required" && <p>This field required</p>}
      </div>
    </div>
  );
};

export default FloatingSelect;
