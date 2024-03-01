import { FieldValues } from "react-hook-form";
import { SelectProps } from "../../../interfaces/CommonProps";
import { useState } from "react";

const SelectComponent = <T extends FieldValues>({
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
    <div className="container">
      <div className=" mb-3 ">
        {label && (
          <label className="form-label  fw-bold text-capitalize">{label}</label>
        )}
        <select
          {...register(name, { required: !notRequired })}
          className=" form-select form-control  py-3 "
          value={selected || defaultValue}
          onChange={(event) => setSelected(event.target.value || "")}
        >
          <option value={ ""}>{emptyLabel || "select an option"}</option>
          {options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.option}
            </option>
          ))}
        </select>
        <div className="text-danger fs-6 ">
          {error && error.type === "required" && <p>This field required</p>}
        </div>
      </div>
    </div>
  );
};

export default SelectComponent;
