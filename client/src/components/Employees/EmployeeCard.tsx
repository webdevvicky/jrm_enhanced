import React, { useState, useEffect } from "react";
import { AxiosError, AxiosResponse } from "axios";
import employeeService from "../../services/employee/employeeService";

const EmployeeCard: React.FC = () => {
  const [employees, setEmployees] = useState<EmployeeCardProps[]>([]);
  const [selectedEmployee, setSelectedEmployee] =
    useState<EmployeeCardProps | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    // Fetch employee information
    employeeService
      .getall<EmployeeCardProps>()
      .then((res: AxiosResponse) => {
        setEmployees(res.data);
      })
      .catch(() => {
        window.alert("Error fetching data");
      });
  }, []);

  const handleShowModal = (employee: EmployeeCardProps) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedEmployee(null);
    setShowModal(false);
    setNewPassword("");
  };

  const handleChangePassword = () => {
    if (!newPassword || newPassword.length < 5) {
      window.alert(
        "Please enter a password with a minimum length of 5 characters."
      );
      return;
    }
    if (selectedEmployee) {
      const update = { _id: selectedEmployee._id, newPassword };
      employeeService
        .update(update)
        .then((res: AxiosResponse) => {
          window.alert(res.data.message);
          handleCloseModal();
        })
        .catch((err: AxiosError) => {
          window.alert("Error updating password");
          console.error(err);
        });
    }
  };

  return (
    <div>
      <div className="container"></div>
      <div className=" container ">
        <h1 className="mb-4">Employee Information</h1>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {employees.map((employee) => (
            <div key={employee._id} className="col py-3">
              <div className="card py-3 shadow">
                <div className="card-body ">
                  <h5 className="card-title  py-2 text-warning-emphasis   text-capitalize">
                    {employee.empName}
                  </h5>
                  <p className="card-text"> ID: {employee.empId}</p>
                  <p className="card-text">Role: {employee.empRole}</p>
                  <p className="card-text">Email: {employee.empEmail}</p>
                  <p className="card-text">Mobile: {employee.empMobile}</p>

                  <div className="py-2  ">
                    {" "}
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => handleShowModal(employee)}
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className={showModal ? "modal fade show" : "modal fade"}
          style={{ display: showModal ? "block" : "none" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Change Password</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                >
                  {/* <span>&times;</span> */}
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="formNewPassword">New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="formNewPassword"
                    placeholder="Enter new password"
                    value={newPassword}
                    required
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary me-1"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleChangePassword}
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
