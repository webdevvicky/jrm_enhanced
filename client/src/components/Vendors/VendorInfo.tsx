import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import vendorService from "../../services/vendor/vendorService";
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
  Shop,
  Telephone,
  TelephoneForward,
  TelephonePlus,
} from "react-bootstrap-icons";

const VendorInfo = () => {
  const { id } = useParams();

  const {
    isLoading,
    isError,
    data: vendor,
  } = useQuery({
    queryKey: ["vendor", id],
    queryFn: async () => {
      const res: AxiosResponse<VendorProps> = await vendorService.getById(
        `${id}`
      );
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
      <Header lable=" Vendor Deatails" />
      <div className=" bg-white p-3 border shadow-sm rounded-3 mb-3">
        <Header lable="Shop Details" />
        <div className="row">
          <div className="col-md-8 d-flex  align-items-center">
            <Shop size={30} color="solid" />
            <span className=" fw-bold  ps-4 fs-5"> {vendor?.name}</span>
          </div>
          <div className="col-md-4 d-flex  align-items-center">
            <b>GST :</b>
            <span className=" fw-bold  ps-4 fs-5"> {vendor?.name}</span>
          </div>
        </div>
        <div className="row py-3">
          <div className="col-md-12">
            <GeoAlt size={30} />
            <span className=" fw-bold  ps-4 fs-5"> {vendor?.address}</span>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 d-flex  align-items-center">
            <CartCheck size={30} />
            <span className=" fw-bold  ps-4 fs-5"> {vendor?.items}</span>
          </div>
          <div className="col-md-6 d-flex  align-items-center">
            <CurrencyRupee size={30} />
            <span className=" fw-bold  ps-4 fs-5"> {vendor?.rate}</span>
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
              {vendor?.accountDetails.accountNumber}
            </span>
          </div>
          <div className="col-md-6 d-flex  align-items-center">
            <b>IFSC :</b>
            <span className=" fw-bold  ps-4 fs-5">
              {" "}
              {vendor?.accountDetails.ifsc}
            </span>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 d-flex  align-items-center">
            <Bank size={30} />
            <span className=" fw-bold  ps-4 fs-5">
              {" "}
              {vendor?.accountDetails.branchName}
            </span>
          </div>
          <div className="col-md-6 d-flex  align-items-center">
            <Paypal size={30} />
            <span className=" fw-bold  ps-4 fs-5">
              {" "}
              {vendor?.accountDetails.upi}
            </span>
          </div>
        </div>

        <div className="my-5">
          <Header lable="Contact Deatails" />
        </div>
        <div className="row">
          <div className="col-md-4 d-flex  align-items-center">
            <Phone size={30} />
            <span className=" fw-bold  ps-4 fs-5"> {vendor?.mobileNumber}</span>
          </div>{" "}
          <div className="col-md-4 d-flex  align-items-center">
            <Telephone size={30} />
            <span className=" fw-bold  ps-4 fs-5">
              {vendor?.landlineNumber}
            </span>
          </div>
          <div className="col-md-4 d-flex  align-items-center">
            <TelephonePlus size={30} />
            <span className=" fw-bold  ps-4 fs-5">
              {vendor?.alternateNumber}
            </span>
          </div>
        </div>

        <div className="row py-3">
          <div className="col-md-4 d-flex  align-items-center">
            <Person size={30} />
            <span className=" fw-bold  ps-4 fs-5">
              {vendor?.salesPersonName}
            </span>
          </div>
          <div className="col-md-4 d-flex  align-items-center">
            <TelephoneForward size={30} />
            <span className=" fw-bold  ps-4 fs-5">
              {vendor?.salesPersonMobile}
            </span>
          </div>
        </div>

        {(vendor?.ownerName || vendor?.ownerNumber) && (
          <div>
            <div className="py-3">
              <Header lable=" Owner Details" />
            </div>
            <div className="row">
              <div className="col-md-4 d-flex  align-items-center">
                <Person size={30} />
                <span className=" fw-bold  ps-4 fs-5">{vendor?.ownerName}</span>
              </div>{" "}
              <div className="col-md-4 d-flex  align-items-center">
                <Phone size={30} />
                <span className=" fw-bold  ps-4 fs-5">
                  {vendor?.ownerNumber}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorInfo;
