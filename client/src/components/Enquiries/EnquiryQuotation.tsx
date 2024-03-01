import { useForm } from "react-hook-form";
import ArrayInput from "../Common/FormComponents/ArrayInputComponent";
import { ArrayField } from "../../interfaces/CommonProps";
import SubmitComponent from "../Common/FormComponents/SumitComponent";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import enquiryQuoteServices from "../../services/enquiry/enquiryQuoteServices";
import { AxiosResponse } from "axios";
import { handleApiError } from "../../utils/apiUtils";
import EditButton from "../Common/AuthButtons/EditButton";

const EnquiryQuotation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [totalValue, setTotalValue] = useState(0);
  const [editQuoate, setEditQuote] = useState<EnquiryQuoteModelProps>();

  const { register, control, handleSubmit, watch, reset } =
    useForm<EnquiryQuoteProps>();

  const itemFields: ArrayField[] = [
    {
      name: "description",
      label: "Description",
    },
    {
      name: "sqft",
      label: "Sq.Ft",
    },
    {
      name: "unit",
      label: "Unit",
    },
    {
      name: "rate",
      label: "Rate",
    },
  ];

  useEffect(() => {
    if (state._id) {
      enquiryQuoteServices
        .getById<EnquiryQuoteModelProps>(state._id)
        .then((res: AxiosResponse) => {
          reset(res.data);
          setEditQuote(res.data);
        });
    }
  }, [state.isEdit]);

  const handleTotalChange = (total: string) => {
    setTotalValue(parseFloat(total));
  };

  const handleFormSubmit = (data: EnquiryQuoteProps) => {
    const UpdatedData = { ...data, enquiryId: id, totalValue: totalValue };

    if (state._id) {
      const updatedDataWithId = {
        ...UpdatedData,
        _id: state._id,
        isCorrection: false,
      };
      enquiryQuoteServices
        .update(updatedDataWithId)
        .then((res: AxiosResponse) => {
          navigate(`/marketting/quote/model/${res.data._id}`);
        })
        .catch((err: any) => {
          handleApiError(err);
        });
    } else {
      enquiryQuoteServices
        .create(UpdatedData)
        .then((res: AxiosResponse) => {
          navigate(`/marketting/quote/model/${res.data._id}`);
        })
        .catch((err) => {
          handleApiError(err);
        });
    }
  };

  return (
    <div className=" container">
      <div className="row">Name -- {state.name}</div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <ArrayInput
          register={register}
          fields={itemFields}
          control={control}
          multiplyFields={["sqft", "rate"]}
          name="items"
          onTotalChange={handleTotalChange}
          watch={watch}
        />
        {/* <SubmitComponent btnlable={state.isEdit ? "Edit Quote" : "New Quote"} /> */}
        {state.isEdit ? (
          <EditButton isRejected={editQuoate?.isCorrection || false} />
        ) : (
          <SubmitComponent btnlable="New Quote" />
        )}
      </form>
    </div>
  );
};

export default EnquiryQuotation;
