import React, { useEffect } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { Trash, ArrowUp, ArrowDown, PlusSquare } from "react-bootstrap-icons";

const GSTForm = () => {
  const { register, control, handleSubmit, setValue } = useForm();
  const { fields, append, remove, move, insert } = useFieldArray({
    control,
    name: "items",
  });

  const watchFields = useWatch({ control, name: "items" });

  // useEffect(() => {
  //   updateTotalAmount();
  // }, [fields, watchFields]);

  // const calculateGST = (amount: number, percentage: number) => {
  //   return (amount * percentage) / 100;
  // };

  // const updateTotalAmount = () => {
  //   fields.forEach((field, index) => {
  //     const amount = parseFloat(watchFields[index]?.amount || 0);
  //     const cgstPercentage = parseFloat(watchFields[index]?.cgst || 0);
  //     const sgstPercentage = parseFloat(watchFields[index]?.sgst || 0);
  //     const igstPercentage = parseFloat(watchFields[index]?.igst || 0);

  //     const cgst = calculateGST(amount, cgstPercentage);
  //     const sgst = calculateGST(amount, sgstPercentage);
  //     const igst = calculateGST(amount, igstPercentage);
  //     const totalAmount = amount + cgst + sgst + igst;

  //     setValue(`items.${index}.cgstAmount`, cgst);
  //     setValue(`items.${index}.sgstAmount`, sgst);
  //     setValue(`items.${index}.igstAmount`, igst);
  //     setValue(`items.${index}.totalAmount`, totalAmount);
  //   });
  // };

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="container-fluid">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="table-responsive">
          <table className=" table-bordered border-primary-subtle table-sm ">
            <thead className="text-center">
              <tr>
                <th>S.No</th>
                <th>Date</th>
                <th>Address</th>
                <th>Invoice Number</th>
                <th>Vendor GST No.</th>
                <th>Item</th>
                <th>Amount</th>
                <th>CGST %</th>
                <th>SGST %</th>
                <th>IGST %</th>
                <th>CGST Amount</th>
                <th>SGST Amount</th>
                <th>IGST Amount</th>
                <th>Total Amount</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {fields.map((field, index) => (
                <tr key={field.id}>
                  <td className="text-center">{index + 1}</td>
                  <td>
                    <input {...register(`items.${index}.date`)} type="date" />
                  </td>
                  <td>
                    <input {...register(`items.${index}.address`)} />
                  </td>
                  <td>
                    <input {...register(`items.${index}.invoiceNumber`)} />
                  </td>
                  <td>
                    <input {...register(`items.${index}.vendorGSTNo`)} />
                  </td>
                  <td>
                    <input {...register(`items.${index}.item`)} />
                  </td>
                  <td>
                    <input {...register(`items.${index}.amount`)} />
                  </td>
                  <td>
                    <input {...register(`items.${index}.cgst`)} />
                  </td>
                  <td>
                    <input {...register(`items.${index}.sgst`)} />
                  </td>
                  <td>
                    <input {...register(`items.${index}.igst`)} />
                  </td>
                  <td>
                    <input {...register(`items.${index}.cgstAmount`)} />
                  </td>
                  <td>
                    <input {...register(`items.${index}.sgstAmount`)} />
                  </td>
                  <td>
                    <input {...register(`items.${index}.igstAmount`)} />
                  </td>
                  <td>
                    <input {...register(`items.${index}.totalAmount`)} />
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <PlusSquare
                        size={"22px"}
                        className="cursor-pointer me-2 text-success"
                        onClick={() => insert(index + 1, {})}
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
          </table>
        </div>
        <div>
          <PlusSquare
            size={"29px"}
            className="cursor-pointer me-2 text-success"
            onClick={() => {
              append({});
            }}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default GSTForm;
