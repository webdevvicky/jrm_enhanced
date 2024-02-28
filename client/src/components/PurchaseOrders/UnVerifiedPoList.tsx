import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import ConfirmationModal from "../Common/Confirmation/ConfirmationModal";
import useConfirmation from "../../hooks/useConfirmation";
import poService from "../../services/po/poService";
import { handleApiError } from "../../utils/apiUtils";
import PoForm from "./PoForm";
import poVerifyService from "../../services/po/poVerifyService";

const UnVerifiedPoList = () => {
  const confirmation = useConfirmation();
  const [poList, setPoList] = useState<UnApprovelPo[]>([]);
  const [selectedPo, setSelectedPo] = useState<UnApprovelPo>();

  const handleDelete = (po: UnApprovelPo) => {
    poService
      .delete(po._id)
      .then((res: AxiosResponse) => {
        window.alert(res.data);
        setPoList((prevPoList) =>
          prevPoList.filter((pos) => pos._id !== po._id)
        );
      })
      .catch((err: any) => handleApiError(err));
    confirmation.hideConfirmation();
  };

  const handleEdit = (po: UnApprovelPo) => {
    setSelectedPo(po);
    console.log(po);
    confirmation.hideConfirmation();
  };

  useEffect(() => {
    poVerifyService
      .getall<UnApprovelPo[]>()
      .then((res: AxiosResponse) => {
        setPoList(res.data);
      })
      .catch((err: any) => {
        console.log(err);
        window.alert(err.response.data.message);
      });
  }, []);
  return (
    <div className="    ">
      {!selectedPo && (
        <div className="row">
          <div className="col-md-12">
            <table className="table table-primary text-center text-center ">
              <thead>
                <tr>
                  <th>S NO</th>
                  <th>Date</th>
                  <th>PO NUMBER</th>
                  <th>Site Name</th>
                  <th>Stage</th>
                  <th>View</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {poList.length >= 1 ? (
                  poList.map((po, index) => (
                    <tr key={po._id}>
                      <td>{index + 1}</td>
                      <td>
                        {po.date ? format(new Date(po.date), "dd-MM-yyyy") : ""}
                      </td>
                      <td>{po.poNumber}</td>
                      <td>{po.siteName}</td>
                      <td>{po.stage}</td>
                      <td>
                        <Link to={`/purchase/verify/${po._id}`}>Open</Link>
                      </td>
                      <td>
                        <button
                          className="btn btn-outline-danger "
                          onClick={() =>
                            confirmation.showConfirmation(
                              "Edit Confirmation",
                              "Are you sure you want to Edit this Purchase Order?",
                              () => handleEdit(po)
                            )
                          }
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-outline-danger "
                          onClick={() =>
                            confirmation.showConfirmation(
                              "Delete Confirmation",
                              "Are you sure you want to delete this Purchase Order?",
                              () => handleDelete(po)
                            )
                          }
                        >
                          delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center text-bg-danger ">
                      No Purchase Orders to Approve
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <div>{selectedPo && <PoForm po={selectedPo} isEdit />}</div>
      <div>
        <ConfirmationModal
          show={confirmation.show}
          handleClose={confirmation.hideConfirmation}
          handleConfirm={confirmation.onConfirm}
          title={confirmation.title}
          message={confirmation.message}
        />
      </div>
    </div>
  );
};

export default UnVerifiedPoList;
