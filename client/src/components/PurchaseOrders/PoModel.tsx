import { useParams } from "react-router-dom";

import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import Loader from "../Common/Loader/Loader";
import poModelService from "../../services/po/poModelService";

const PoModel = () => {
  const { id } = useParams();

  const {
    isLoading,
    isError,
    data: po,
  } = useQuery({
    queryKey: ["unApprovedPoList", "unVerifiPoList"],
    queryFn: async () => {
      const res: AxiosResponse<PoModelProps> = await poModelService.getById(`${id}`);
      return res.data;
    },
  });

  if (isLoading || !po?._id) {
    return <Loader />;
  }
  if (isError) {
    return <Loader isError />;
  }

  console.log(po)
  return (
    <>
      {po? (
        <div className=" container printmodel">
          <table className=" table  table-bordered  ">
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
            <tbody key={po._id}>
              <tr>
                <th scope="row">SITE NAME</th>
                <td colSpan={6}>{po?.project?.projectName}</td>
              </tr>
              <tr>
                <th scope="row">STAGE</th>
                <td colSpan={6}>{po?.stage}</td>
              </tr>
              <tr>
                <th scope="row">METERIAL CATAGERY</th>
                <td colSpan={6}>{po?.meterialCategory}</td>
              </tr>
              <tr>
                <th scope="row">SUPPLIER</th>
                <td colSpan={6}>{po?.vendor?.name}</td>
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
                  <td>{item.item}</td>
                  <td>{item.meterialFor}</td>
                  <td>{item.qty}</td>
                  <td>{item.unit}</td>
                  <td>{item.rate}</td>
                  <td>{(item.qty * item.rate).toFixed(2)}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={6} className=" text-end ">
                  sub total
                </td>
                <td>{po?.subTotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan={6} className=" text-end ">
                  CGST {po?.cgst}%
                </td>
                <td>{((po.cgst * po.subTotal) / 100).toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan={6} className=" text-end ">
                  SGST{po?.sgst}%
                </td>
                <td>{((po.sgst * po.subTotal) / 100).toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan={6} className=" text-end ">
                  IGST{po?.igst}%
                </td>
                <td>{((po.igst * po.subTotal) / 100).toFixed(2)}</td>
              </tr>
              <tr>
                <th colSpan={6} className=" text-end bg-info-subtle  ">
                  Total Amount
                </th>
                <td className=" bg-info-subtle ">{po?.totalAmount}</td>
              </tr>
              <tr className=" text-center ">
                <td colSpan={7} className="pt-3 ">
                  <div className="d-flex  justify-content-around mt-4 align-items-end ">
                    <div>
                      <p className="fw-bold p-0 m-0"> {po.createdBy.name}</p>
                      <span>PREPARED BY</span>
                    </div>
                    <div>
                      <p className="fw-bold p-0 m-0">
                        {po.isVerified ? (
                          po.verifiedBy.name
                        ) : (
                          <span className=" text-danger ">Not Verified</span>
                        )}{" "}
                      </p>
                      <span>VERIFIED BY</span>
                    </div>
                    <div>
                      <p className="fw-bold p-0 m-0">
                        {po.isApproved ? (
                          po.approvedBy?.name
                        ) : (
                          <span className=" text-danger ">Not Approved</span>
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
