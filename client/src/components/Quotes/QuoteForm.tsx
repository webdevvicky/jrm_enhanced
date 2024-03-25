import { useForm } from "react-hook-form";
import ArrayInput from "../Common/FormComponents/ArrayInputComponent";
import { ArrayField } from "../../interfaces/CommonProps";
import SubmitComponent from "../Common/FormComponents/SumitComponent";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { handleApiError } from "../../utils/apiUtils";
import EditButton from "../Common/AuthButtons/EditButton";
import quoteService from "../../services/quote/quoteService";

const QuoteForm = () => {
  const { id } = useParams();
  const isEdit = !!id;
  console.log(isEdit);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [totalValue, setTotalValue] = useState(0);
  const [editQuoate, setEditQuote] = useState<QuoteModelProps>();
  const { register, control, handleSubmit, watch, reset } =
    useForm<NewQuoteProps>();

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
    if (id) {
      quoteService.getById<QuoteModelProps>(id).then((res: AxiosResponse) => {
        reset(res.data);
        setEditQuote(res.data);
      });
    }
  }, [id]);

  const handleTotalChange = (total: string) => {
    setTotalValue(parseFloat(total));
  };

  const handleFormSubmit = (data: NewQuoteProps) => {
    if (isEdit) {
      const updatedDataWithId = {
        ...data,
        _id: id,
        isRejected: false,
      };
      quoteService
        .update(updatedDataWithId)
        .then((res: AxiosResponse) => {
          navigate(`/designs/quote/model/${res.data._id}`);
        })
        .catch((err: any) => {
          handleApiError(err);
        });
     
    } else {
      const UpdatedData: NewQuoteProps = {
        ...data,
        totalValue: totalValue,
        isConstruction: state.construction,
        isAdditional: state.additional,
        isInterior: state.interior,
        project: state.projectId,
      };

      quoteService
        .create(UpdatedData)
        .then((res: AxiosResponse) => {
          navigate(`/designs/quote/model/${res.data._id}`);
        })
        .catch((err) => {
          handleApiError(err);
        });

     
    }
  };

  return (
    <div className=" container">
      {state && (
        <div className="row">
          <div className="col-md-6">Site Name -- {state.projectName}</div>
          <div className="col-md-6">
            QuoteType --{" "}
            {state.additional
              ? "Adiitonal"
              : state.construction
              ? "Construction "
              : state.interior
              ? "Interior"
              : ""}
          </div>
        </div>
      )}
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
        {id ? (
          <span className="   border  text-white ">
            <EditButton
              isRejected={editQuoate?.isRejected || false}
              label="Edit"
            />
          </span>
        ) : (
          <SubmitComponent btnlable="New Quote" />
        )}
      </form>
    </div>
  );
};

export default QuoteForm;
