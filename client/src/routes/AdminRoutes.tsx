import { Routes, Route } from "react-router-dom";
import UnAuthorised from "../components/Pages/UnAuthorised";
import NewEmployee from "../components/Employees/NewEmployee";
import EmployeeCard from "../components/Employees/EmployeeCard";
import EmployeeDashboard from "../components/Dashboard/EmployeeDashboard";

const AdminRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/admin">
          <Route index element={<EmployeeDashboard />} />
          <Route path="new" element={<NewEmployee />} />
          <Route path="list" element={<EmployeeCard />} />
        </Route>
        <Route path="*" element={<UnAuthorised />} />
      </Routes>
    </div>
  );
};

export default AdminRoutes;
