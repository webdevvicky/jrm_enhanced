import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { AxiosResponse } from "axios";

import Loader from "../Common/Loader/Loader";
import Header from "../Common/Header/Header";
import {
  Bank,
  CartCheck,
  CurrencyRupee,
  GeoAlt,
  Paypal,
  Person,
  Phone,
  Telephone,
  TelephoneForward,
} from "react-bootstrap-icons";
import contractorService from "../../services/contractor/contractorService";

const ContractorInfo = () => {
  const { id } = useParams();

  const {
    isLoading,
    isError,
    data: contractor,
  } = useQuery({
    queryKey: ["contractor", id],
    queryFn: async () => {
      const res: AxiosResponse<ContractorProps> =
        await contractorService.getById(`${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <Loader isError />;
  }
  return (
    <div className=" container">
      <div className=" bg-white p-3 border shadow-sm rounded-3 mb-3">
        <Header lable="Contractor Details" />

        <div className="row">
          <div className="col-md-8 d-flex  align-items-center">
            <Person size={30} color="solid" />
            <span className=" fw-bold  ps-4 fs-5"> {contractor?.name}</span>
          </div>
          <div className="col-md-4 d-flex  align-items-center">
            <Phone size={30} />
            <span className=" fw-bold  ps-4 fs-5">
              {" "}
              {contractor?.mobileNumber}
            </span>
          </div>
        </div>

        <div className="row py-3">
          <div className="col-md-12">
            permanent <GeoAlt size={30} />
            <span className=" fw-bold  ps-4 fs-5">
              {" "}
              {contractor?.permanentAddress}
            </span>
          </div>
          <div className="col-md-12">
            Temparary <GeoAlt size={30} />
            <span className=" fw-bold  ps-4 fs-5">
              {" "}
              {contractor?.temporaryAddress}
            </span>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 d-flex  align-items-center">
            <CartCheck size={30} />
            <span className=" fw-bold  ps-4 fs-5"> {contractor?.category}</span>
          </div>
          <div className="col-md-6 d-flex  align-items-center">
            <CurrencyRupee size={30} />
            <span className=" fw-bold  ps-4 fs-5"> {contractor?.rate}</span>
          </div>
        </div>

        <div className="my-5">
          <Header lable=" Account Details" />
        </div>

        <div className="row mb-3">
          <div className="col-md-6 d-flex  align-items-center">
            <b>Account Number :</b>
            <span className=" fw-bold  ps-4 fs-5">
              {" "}
              {contractor?.accountDetails.accountNumber}
            </span>
          </div>
          <div className="col-md-6 d-flex  align-items-center">
            <b>IFSC :</b>
            <span className=" fw-bold  ps-4 fs-5">
              {" "}
              {contractor?.accountDetails.ifsc}
            </span>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 d-flex  align-items-center">
            <Bank size={30} />
            <span className=" fw-bold  ps-4 fs-5">
              {" "}
              {contractor?.accountDetails.branchName}
            </span>
          </div>
          <div className="col-md-6 d-flex  align-items-center">
            <Paypal size={30} />
            <span className=" fw-bold  ps-4 fs-5">
              {" "}
              {contractor?.accountDetails.upi}
            </span>
          </div>
        </div>

        <div className="my-5">
          <Header lable="Contact Deatails" />
        </div>
        <div className="row">
          <div className="col-md-4 d-flex  align-items-center">
            <Phone size={30} />
            <span className=" fw-bold  ps-4 fs-5">
              {" "}
              {contractor?.mobileNumber}
            </span>
          </div>{" "}
          <div className="col-md-4 d-flex  align-items-center">
            <Telephone size={30} />
            <span className=" fw-bold  ps-4 fs-5">
              {contractor?.alternateMobile}
            </span>
          </div>
        </div>

        <div className="row py-3">
          <div className="col-md-4 d-flex  align-items-center">
            <Person size={30} />
            <span className=" fw-bold  ps-4 fs-5">
              {contractor?.alternatePerson}
            </span>
          </div>
          <div className="col-md-4 d-flex  align-items-center">
            <TelephoneForward size={30} />
            <span className=" fw-bold  ps-4 fs-5">
              {contractor?.alternateMobile}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractorInfo;
