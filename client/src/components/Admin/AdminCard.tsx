import { useEffect, useState } from "react";
import adminService from "../../services/admin/adminService";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
interface AdminProps {
  adminName: string;
  adminEmail: string;
  adminMobile: number;
  adminPassword: string;
  _id: string;
}

const AdminCard = () => {
  const [admins, setAdmins] = useState<AdminProps[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    adminService
      .getall<AdminProps[]>()
      .then((res: AxiosResponse) => [setAdmins(res.data)])
      .catch((err: any) => {
        window.alert(err.response.data.error);
        navigate("/");
      });
  }, []);
  return (
    <div className=" container ">
      {admins.map((admin) => (
        <div key={admin._id} className="col py-3">
          <div className="card py-3 shadow">
            <div className="card-body ">
              <h5 className="card-title  py-2 text-warning-emphasis   text-capitalize">
                {admin.adminName}
              </h5>
              <p className="card-text">Email: {admin.adminEmail}</p>
              <p className="card-text">Mobile: {admin.adminMobile}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminCard;
