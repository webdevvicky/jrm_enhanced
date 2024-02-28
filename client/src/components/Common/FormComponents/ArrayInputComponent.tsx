import { Path, ArrayPath, FieldArray, useFieldArray } from "react-hook-form";
import { Trash, ArrowUp, ArrowDown, PlusSquare } from "react-bootstrap-icons";
import { ArrayInputProps } from "../../../interfaces/CommonProps";

const ArrayInput = <T extends {}>({
  name,
  control,
  register,
  fields,
  multiplyFields,
  isNumberFields,
  notRequired,
}: ArrayInputProps<T>) => {
  const {
    fields: arrayFields,
    append,
    remove,
    move,
    insert,
  } = useFieldArray({ name, control });

  const validationRules: Record<string, unknown> = {
    required: !notRequired,
  };

  // Apply custom pattern validation for numbers if isNumber is true
  if (isNumberFields) {
    validationRules.pattern = {
      value: /^[+-]?\d*\.?\d*$/,
      message: "This field allows only numbers",
    };
  }

  const calculateTotal = (field: Record<string, any>) => {
    if (!multiplyFields) return 0;

    const [field1, field2] = multiplyFields;
    const value1 = field[field1] || 0;
    const value2 = field[field2] || 0;
    return value1 * value2;
  };

  validationRules.pattern = {
    value: /^[+-]?\d*\.?\d*$/,
    message: "This field allows only numbers",
  };

  return (
    <div>
      <table className="table table-bordered border-primary-subtle">
        <thead className=" text-center">
          <tr>
            <th>S.No</th>

            {fields.map((field) => (
              <th key={field.name}>{field.label || field.name}</th>
            ))}

            {multiplyFields && <th>Total</th>}

            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {arrayFields.map((field, index) => (
            <tr key={field.id}>
              <td className="text-center">{index + 1}</td>
              {fields.map((arrayField) => (
                <>
                  <td key={arrayField.name}>
                    <input
                      style={{ width: "100%" }}
                      {...register(
                        `${name}.${index}.${arrayField.name}` as Path<T>,
                        {
                          ...validationRules,
                          pattern: isNumberFields?.[arrayField.name]
                            ? /^[+-]?\d*\.?\d*$/
                            : undefined,
                        }
                      )}
                    />
                  </td>
                </>
              ))}
              {multiplyFields && <td>{calculateTotal(field)}</td>}
              <td>
                <div className="d-flex align-items-center">
                  <PlusSquare
                    size={"22px"}
                    className="cursor-pointer me-2 text-success"
                    onClick={() =>
                      insert(index + 1, {} as FieldArray<T, ArrayPath<T>>)
                    }
                  />
                  <ArrowUp
                    size={"22px"}
                    className="cursor-pointer me-2 text-primary"
                    onClick={() => move(index, index - 1)}
                  />
                  <ArrowDown
                    size={"22px"}
                    className="cursor-pointer me-2 text-primary"
                    onClick={() => move(index, index + 1)}
                  />
                  <Trash
                    size={"22px"}
                    color="red"
                    cursor={"pointer"}
                    onClick={() => remove(index)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        {multiplyFields && (
          <tfoot>
            <tr>
              <td
                colSpan={multiplyFields ? fields.length + 1 : fields.length}
                className=" text-end "
              >
                Total
              </td>
              <td colSpan={2}>
                {(() => {
                  const totalSum = arrayFields.reduce((sum, field) => {
                    const total = calculateTotal(field);
                    return sum + total;
                  }, 0);

                  const roundedTotal = totalSum.toFixed(2);

                  return roundedTotal;
                })()}
              </td>
            </tr>
          </tfoot>
        )}
      </table>
      <div>
        <PlusSquare
          size={"29px"}
          className="cursor-pointer me-2 text-success"
          onClick={() => {
            append({} as FieldArray<T, ArrayPath<T>>);
          }}
        />
      </div>
    </div>
  );
};

export default ArrayInput;
