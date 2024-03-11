import { useEffect, useState } from "react";
import employeeService from "../../services/employee/employeeService";
import { AxiosResponse } from "axios";
import { handleApiError } from "../../utils/apiUtils";
import { Link } from "react-router-dom";
import { PlusCircleDotted } from "react-bootstrap-icons";

const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  useEffect(() => {
    employeeService
      .get<Employee[]>()
      .then((res: AxiosResponse) => setEmployees(res.data))
      .catch((err: any) => handleApiError(err));
  }, []);
  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <Link to={`/admin/employee/new`}>
            <PlusCircleDotted size={30} />
          </Link>
        </div>
      </div>
      <table className=" table table-borderless  table-hover   table-success ">
        <thead>
          <tr>
            <th>S.NO</th>
            <th>Name</th>
            <th>Designation</th>
            <th>Role</th>
            <th>View</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{employee.name}</td>
              <td>{employee.designation}</td>
              <td>{employee.role}</td>
              <td>
                <Link to="/admin/view/:id">view</Link>
              </td>
              <td>
                <Link to={`/admin/employee/edit/${employee._id}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
