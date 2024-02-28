import { useEffect, useState } from "react";
import poService from "../../services/po/poService";
import { AxiosResponse } from "axios";
import { format } from "date-fns";
import { jwtDecode } from "jwt-decode";
import MyJwtPayload from "../../interfaces/MyJwtPayload";
import poApprovelService from "../../services/po/poApprovelService";
import { useParams } from "react-router-dom";
import poVerifyService from "../../services/po/poVerifyService";
const PoApprovelModel = () => {
  const [po, setPo] = useState<PoModelProps>();
  const token = localStorage.getItem("token");
  const decoded = token ? (jwtDecode(token) as MyJwtPayload) : null;
  const userRole = decoded?.role;

  const { id } = useParams();
  useEffect(() => {
    poService
      .getById<PoModelProps>(`${id}`)
      .then((res: AxiosResponse) => {
        setPo(res.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);
  const updateVerify = { _id: id ? id : "", isApproved: true };
  const handleVerify = () => {
    poVerifyService
      .update(updateVerify)
      .then((res: AxiosResponse) => {
        window.alert(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateApprove = { _id: id ? id : "", isApproved: true };
  const handleApprove = () => {
    poApprovelService
      .update(updateApprove)
      .then((res) => {
        window.alert(res.data.message);
        window.location.reload()
      })
      .catch((err: any) => {
        window.alert(err.response.data.message);
      });
  };
  return (
    <div className=" container printmodel">
      <table className=" table  table-bordered ">
        <thead>
          <tr>
            <th
              colSpan={4}
              rowSpan={2}
              className=" text-center"
              style={{ verticalAlign: "middle" }}
            >
              PURCHASE ORDER
            </th>
            <th>PO NO</th>
            <th colSpan={2}>{po?.poNumber}</th>
          </tr>
          <tr>
            <th>PO DATE</th>
            <th colSpan={2}>
              {po?.date ? format(new Date(po.date), "dd/MM/yyyy") : ""}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">SITE NAME</th>
            <td colSpan={6}>{po?.siteName}</td>
          </tr>
          <tr>
            <th scope="row">STAGE</th>
            <td colSpan={6}>{po?.stage}</td>
          </tr>
          <tr>
            <th scope="row">METERIAL CATAGERY</th>
            <td colSpan={6}>{po?.meterialCatagory}</td>
          </tr>
          <tr>
            <th scope="row">SUPPLIER</th>
            <td colSpan={6}>{po?.supplier}</td>
          </tr>
          <tr>
            <th>S.NO</th>
            <th>ITEM DESCRIPTION</th>
            <th>METERIAL FOR</th>
            <th>QUANTITY</th>
            <th>UNIT</th>
            <th>RATE</th>
            <th>Amount</th>
          </tr>
          {po?.items.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.description}</td>
              <td>{item.meterialFor}</td>
              <td>{item.quantity}</td>
              <td>{item.unit}</td>
              <td>{item.rate}</td>
              <td>{item.quantity * item.rate}</td>
            </tr>
          ))}
          <tr>
            <td colSpan={6} className=" text-end ">
              sub total
            </td>
            <td>{po?.subTotal}</td>
          </tr>
          <tr>
            <td colSpan={6} className=" text-end ">
              CGST {po?.cgst}%
            </td>
            <td>{po && (po.cgst * po.subTotal) / 100}</td>
          </tr>
          <tr>
            <td colSpan={6} className=" text-end ">
              SGST{po?.sgst}%
            </td>
            <td>{po && (po.sgst * po.subTotal) / 100}</td>
          </tr>
          <tr>
            <th colSpan={6} className=" text-end bg-info-subtle  ">
              Total Amount
            </th>
            <td className=" bg-info-subtle ">{po?.totalAmount.toFixed()}</td>
          </tr>
          <tr className="text-center">
            <td colSpan={7} className="pt-5">
              <div className="d-flex justify-content-between align-items-end ">
                <div>
                  {po?.isVerified ? (
                    <p className="m-0 p-0 fw-bold">{po?.verifiedBy}</p>
                  ) : (
                    <div>
                      {userRole === "admin" ? (
                        <button
                          className="btn btn-warning"
                          onClick={() => handleVerify()}
                        >
                          Verify
                        </button>
                      ) : (
                        <p className="m-0 p-0 text-bg-danger ">Not Verified</p>
                      )}
                    </div>
                  )}
                  <span>VERIFIED BY</span>
                </div>
                <div>
                  {po?.isApproved ? (
                    <p className="m-0 p-0 fw-bold">{po?.approvedBy}</p>
                  ) : (
                    <div>
                      {userRole === "admin" ? (
                        <button
                          className="btn btn-warning"
                          onClick={() => handleApprove()}
                        >
                          Approve
                        </button>
                      ) : (
                        <p className="m-0 p-0 text-bg-danger ">Not Approved</p>
                      )}
                    </div>
                  )}
                  <span>APPROVED BY</span>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PoApprovelModel;
