import { useForm } from "react-hook-form";
import { ArrayField } from "../../interfaces/CommonProps";
import ArrayInput from "../Common/FormComponents/ArrayInputComponent";
import SubmitComponent from "../Common/FormComponents/SumitComponent";
import { useNavigate, useParams } from "react-router-dom";
import InputComponent from "../Common/FormComponents/InputComponent";
import { useEffect, useState } from "react";
import SelectComponent from "../Common/FormComponents/SelectComponent";
import { useQuery } from "@tanstack/react-query";
import vendorService from "../../services/vendor/vendorService";
import { AxiosResponse } from "axios";
import poService from "../../services/po/poService";
import { useProjectSelectData } from "../../hooks/useProjectSelectData";
import { handleApiError } from "../../utils/apiUtils";

const PoForm = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const [editPo, setEditPo] = useState<PoFormProps>();
  const [includeGST, setIncludeGST] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const [cgstPercentage, setCgstPercentage] = useState(0);
  const [sgstPercentage, setSgstPercentage] = useState(0);
  const [igstPercentage, setIgstPercentage] = useState(0);

  const cgstAmount = !isNaN(cgstPercentage)
    ? (subTotal * cgstPercentage) / 100
    : 0;
  const sgstAmount = !isNaN(sgstPercentage)
    ? (subTotal * sgstPercentage) / 100
    : 0;
  const igstAmount = !isNaN(igstPercentage)
    ? (subTotal * igstPercentage) / 100
    : 0;
  const totalAmount = (subTotal + sgstAmount + cgstAmount + igstAmount).toFixed(
    2
  );

  const {
    register,
    formState: { errors },
    watch,
    reset,
    control,
    handleSubmit,
  } = useForm<PoFormProps>();
  const itemFields: ArrayField[] = [
    {
      name: "item",
      label: "Item",
    },
    {
      name: "meterialFor",
      label: "Meterial For",
    },
    {
      name: "qty",
      label: "Quantity",
    },
    {
      name: "unit",
      label: "Unit",
    },
    { name: "rate", label: "Rate" },
  ];

  useEffect(() => {
    if (isEdit) {
      poService
        .getById<PoFormProps>(id ? id : "")
        .then((res: AxiosResponse<PoFormProps>) => {
          setEditPo(res.data);
          reset(res.data);
          setIgstPercentage(res.data.igst);
          setCgstPercentage(res.data.cgst);
          setSgstPercentage(res.data.sgst);
          setIncludeGST(true);
        });
    }
  }, [isEdit]);

  //get vendors deails

  const { data: vendorSelectList = [] } = useQuery({
    queryKey: ["vendorSelectList"],
    queryFn: async () => {
      const res: AxiosResponse<VendorListProps[]> =
        await vendorService.getall();
      return res.data;
    },
  });

  const handleTotalChange = (total: string) => {
    setSubTotal(parseFloat(total));
  };

  const handlePoFormSubmit = (data: PoFormProps) => {
    const PoData: PoFormProps = {
      ...data,
      cgst: cgstPercentage,
      sgst: sgstPercentage,
      igst: igstPercentage,
      totalAmount: parseFloat(totalAmount),
      subTotal: subTotal,
    };
    if (isEdit) {
      poService
        .update({ _id: id, ...PoData })
        .then((res: AxiosResponse<PoModelProps>) => {
          navigate(`/accounts/purchaseorder/view/${res.data._id}`);
        })
        .catch((err: any) => handleApiError(err));
    } else {
      poService
        .create(PoData)
        .then((res: AxiosResponse) =>
          navigate(`/accounts/purchaseorder/view/${res.data._id}`)
        )
        .catch((err: any) => handleApiError(err));
    }
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit(handlePoFormSubmit)}>
          <div className="row">
            <table className="">
              <tbody>
                <tr>
                  <td>
                    <SelectComponent
                      register={register}
                      label="Project"
                      name="project"
                      error={errors.project}
                      options={useProjectSelectData()}
                      defaultValue={editPo?.project}
                    />
                  </td>
                  <td>
                    <InputComponent
                      register={register}
                      name="stage"
                      error={errors.stage}
                      label="Stage"
                    />
                  </td>
                  <td>
                    <InputComponent
                      register={register}
                      name="meterialCategory"
                      error={errors.meterialCategory}
                      label="Meterial Category"
                    />
                  </td>
                  <td>
                    <SelectComponent
                      register={register}
                      label="Vendor"
                      name="vendor"
                      error={errors.vendor}
                      options={vendorSelectList.map((vendor) => ({
                        option: vendor.name,
                        value: vendor._id,
                      }))}
                      defaultValue={editPo?.vendor}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <ArrayInput
            register={register}
            fields={itemFields}
            control={control}
            multiplyFields={["qty", "rate"]}
            name="items"
            onTotalChange={handleTotalChange}
            watch={watch}
            isSubtotal
          />

          <div className="form-check mt-3">
            <input
              className="form-check-input"
              type="checkbox"
              checked={includeGST}
              onChange={() => setIncludeGST(!includeGST)}
              id="defaultCheck1"
            />
            <label className="form-check-label" htmlFor="defaultCheck1">
              Include Gst
            </label>
          </div>

          {includeGST && (
            <div className=" row d-flex justify-content-end ">
              <div className=" table-responsive col-md-12  ">
                <table className="table text-end border-primary-subtle  table-sm  table-bordered  ">
                  <tbody>
                    <tr>
                      <th scope=" row" className=" w-75">
                        CGST %
                      </th>
                      <td>
                        <input
                          onChange={(e) =>
                            setCgstPercentage(parseFloat(e.target.value))
                          }
                          value={cgstPercentage}
                        />
                      </td>
                      <td className="w-25 text-center ">{cgstAmount}</td>
                    </tr>
                    <tr>
                      <th scope=" row">SGST %</th>
                      <td>
                        <input
                          onChange={(e) =>
                            setSgstPercentage(parseFloat(e.target.value))
                          }
                          value={sgstPercentage}
                        />
                      </td>
                      <td className="text-center">{sgstAmount}</td>
                    </tr>
                    <tr>
                      <th scope=" row">IGST %</th>
                      <td>
                        <input
                          onChange={(e) =>
                            setIgstPercentage(parseFloat(e.target.value))
                          }
                          value={igstPercentage}
                        />
                      </td>
                      <td className="text-center">{igstAmount}</td>
                    </tr>
                    <tr>
                      <th scope=" row" colSpan={2}>
                        Total Amount
                      </th>

                      <td className="text-center">{totalAmount}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {!isNaN(parseFloat(totalAmount)) && (
            <SubmitComponent btnlable="submit" />
          )}
        </form>
      </div>
    </>
  );
};

export default PoForm;
