import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import poService from "../../services/po/poService";
import { AxiosResponse } from "axios";
import { format } from "date-fns";
import Loader from "../Common/Loader/Loader";

const PoModel = () => {
  const { id } = useParams();
  const [po, setPo] = useState<PoModelProps>();

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
  return (
    <>
      {po ? (
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
                <td>{(po.cgst * po.subTotal) / 100}</td>
              </tr>
              <tr>
                <td colSpan={6} className=" text-end ">
                  SGST{po?.sgst}%
                </td>
                <td>{(po.sgst * po.subTotal) / 100}</td>
              </tr>
              <tr>
                <th colSpan={6} className=" text-end bg-info-subtle  ">
                  Total Amount
                </th>
                <td className=" bg-info-subtle ">
                  {po?.totalAmount.toFixed()}
                </td>
              </tr>
              <tr className=" text-center ">
                <td colSpan={7} className="pt-3 ">
                  <div className="d-flex  justify-content-between align-items-end ">
                    <div>
                      <p className="fw-bold p-0 m-0">
                        {" "}
                        {po?.isVerified ? (
                          po.verifiedBy
                        ) : (
                          <span className=" text-danger"> Not Verified</span>
                        )}
                      </p>
                      <span>VERIFIED BY</span>
                    </div>
                    <div>
                      <p className="fw-bold p-0 m-0">
                        {po?.isApproved ? (
                          po.approvedBy
                        ) : (
                          <span className=" text-danger"> Not Approved</span>
                        )}
                      </p>
                      <span>APPROVED BY</span>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default PoModel;
