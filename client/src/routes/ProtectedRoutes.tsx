import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../components/Dashboard/AdminDashboard";
import EmployeeDashboard from "../components/Dashboard/EmployeeDashboard";
import DesignAndQuoteList from "../components/Designs/DesignAndQuoteList";
import DesignsUpload from "../components/Designs/DesignsUpload";
import EmployeeList from "../components/Employees/EmployeeList";
import NewEmployee from "../components/Employees/NewEmployee";
import EnquiriesList from "../components/Enquiries/EnquiryList";
import EnquiryQuotation from "../components/Enquiries/EnquiryQuotation";
import EnquiryQuoteList from "../components/Enquiries/EnquiryQuoteList";
import EnquiryQuoteModel from "../components/Enquiries/EnquiryQuoteModel";
import NewEnquiry from "../components/Enquiries/NewEnquiry";
import UnAuthorised from "../components/Pages/UnAuthorised";
import NewProject from "../components/Projects/NewProject";

import Login from "../components/Pages/Login";

import { getAllowedRoutes, getUserRole, isLoggedIn } from "../utils/auth";
import UnApprovedPoList from "../components/PurchaseOrders/UnApprovedPoList";
import UnVerifiedPoList from "../components/PurchaseOrders/UnVerifiedPoList";
import ApprovelList from "../components/Admin/ApprovelList";
import VendorList from "../components/Vendors/VendorList";
import ContractorList from "../components/Contractors/ContractorList";
import ProjectList from "../components/Projects/ProjectList";
import Projectstatus from "../components/Projects/Projectstatus";
import ProjectInfo from "../components/Projects/ProjectInfo";
import QuoteForm from "../components/Quotes/QuoteForm";
import QuoteModel from "../components/Quotes/QuoteModel";
import GstPage from "../components/Gst/GstPage";
import GstForm from "../components/Gst/GstForm";
import VendorForm from "../components/Vendors/VendorForm";
import ContractorForm from "../components/Contractors/ContractorForm";
import PoList from "../components/PurchaseOrders/PoList";
import AccountsHome from "../components/Accounts/AccountsHome";
import VendorInfo from "../components/Vendors/VendorInfo";
import VendorsStatus from "../components/Vendors/VendorsStatus";
import AccountsStatus from "../components/Accounts/AccountsStatus";
import ContractorInfo from "../components/Contractors/ContractorInfo";
import ContractorStatus from "../components/Contractors/ContractorStatus";
import PoForm from "../components/PurchaseOrders/PoForm";
import PoModel from "../components/PurchaseOrders/PoModel";
import VoucherModel from "../components/Vouchers/VoucherModel";
import Voucher from "../components/Vouchers/Voucher";
import ProjectTimeline from "../components/Projects/ProjectTimeline";
import NmrAttendanceForm from "../components/Attendance/NmrAttendanceForm";
import WorkOrderForm from "../components/WorkOrder/WorkOrderForm";
import WorkOrderModel from "../components/WorkOrder/WorkOrderModel";
import WorkOrderList from "../components/WorkOrder/WorkOrderList";
import ExecutionStatus from "../components/Execution/ExecutionStatus";

const ProtectedRoutes = () => {
  const isAdmin = getUserRole() === "admin";
  const allowedRoutes = getAllowedRoutes();
  if (!isLoggedIn()) {
    // If no token or decoded user information, navigate to the login page
    return (
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Login />} />
      </Routes>
    );
  }
  return (
    <div>
      <div>
        <Routes>
          <Route
            path="/"
            index
            element={isAdmin ? <AdminDashboard /> : <EmployeeDashboard />}
          />

          {(allowedRoutes.includes("marketting") || isAdmin) && (
            <Route path="/marketting">
              <Route path="enquiry">
                <Route path="new" element={<NewEnquiry />} />
                <Route path="list" element={<EnquiriesList />} />
                <Route path="edit/:id" element={<NewEnquiry />} />
              </Route>
              <Route path="quote">
                <Route path="list/:id" element={<EnquiryQuoteList />} />
                <Route path="form/:id" element={<EnquiryQuotation />} />
                <Route path="form/edit" element={<EnquiryQuotation />} />
                <Route path="model/:id" element={<EnquiryQuoteModel />} />
              </Route>
            </Route>
          )}

          {(allowedRoutes.includes("designs") || isAdmin) && (
            <Route path="/designs">
              <Route path="booking">
                <Route index element={<ProjectList />} />
                <Route path="new" element={<NewProject />} />
                <Route path="edit/:id" element={<NewProject />} />
                <Route path="status" element={<Projectstatus />} />
                <Route path="info/:id" element={<ProjectInfo />} />
              </Route>

              <Route path="new" element={<DesignsUpload />} />
              <Route path="list" element={<DesignAndQuoteList />} />
              <Route path="edit/:id" element={<NewEnquiry />} />

              <Route path="quote">
                <Route path="new" element={<QuoteForm />} />
                <Route path="edit/:id" element={<QuoteForm />} />
                <Route path="model/:id" element={<QuoteModel />} />
              </Route>
            </Route>
          )}

          {(allowedRoutes.includes("accounts") || isAdmin) && (
            <Route path="/accounts">
              <Route index element={<AccountsHome />} />
              <Route path="gst">
                <Route index element={<GstPage />} />
                <Route path="new" element={<GstForm />} />
                <Route path="edit/:id" element={<GstForm />} />
              </Route>

              <Route path="vendor">
                <Route index element={<VendorList />} />
                <Route path="new" element={<VendorForm />} />
                <Route path="edit/:id" element={<VendorForm />} />
                <Route path="view/:id" element={<VendorInfo />} />
                <Route path="status" element={<VendorsStatus />} />
              </Route>

              <Route path="contractor">
                <Route index element={<ContractorList />} />
                <Route path="new" element={<ContractorForm />} />
                <Route path="edit/:id" element={<ContractorForm />} />
                <Route path="view/:id" element={<ContractorInfo />} />
                <Route path="status" element={<ContractorStatus />} />
              </Route>

              <Route path="purchaseorder">
                <Route index element={<PoList />} />
                <Route path="new" element={<PoForm />} />
                <Route path="edit/:id" element={<PoForm />} />
                <Route path="view/:id" element={<PoModel />} />
              </Route>

              <Route path="voucher">
                <Route index element={<PoList />} />
                <Route path="new" element={<Voucher />} />
                <Route path="edit/:id" element={<Voucher />} />
                <Route path="view/:id" element={<VoucherModel />} />
              </Route>

              <Route path="status" element={<AccountsStatus />} />
            </Route>
          )}

          {(allowedRoutes.includes("execution") || isAdmin) && (
            <Route path="/execution">
              <Route path="timeline" element={<ProjectTimeline />} />
              <Route path="project" element={<ProjectInfo />} />

              <Route path="nmr">
                <Route path="new" element={<NmrAttendanceForm />} />
                <Route path="edit/:id" element={<NmrAttendanceForm />} />
              </Route>

              <Route path="workorder">
                <Route index element={<WorkOrderList />} />
                <Route path="new" element={<WorkOrderForm />} />
                <Route path="edit/:id" element={<WorkOrderForm />} />
                <Route path="view/:id" element={<WorkOrderModel />} />
              </Route>

              <Route path="status" element={<ExecutionStatus />} />
            </Route>
          )}

          {isAdmin && (
            <Route path="/admin">
              <Route index element={<AdminDashboard />} />

              <Route path="employee">
                <Route index element={<EmployeeList />} />
                <Route path="new" element={<NewEmployee />} />
                <Route path="edit/:id" element={<NewEmployee />} />
              </Route>

              <Route path="project">
                <Route path="new" element={<NewProject />} />
                <Route path="edit/:id" element={<NewProject />} />
              </Route>

              <Route path="approvel" element={<ApprovelList />} />
              <Route path="vendor" element={<VendorList />} />
              <Route path="cont" element={<ContractorList />} />
              <Route path="po" element={<UnApprovedPoList />} />
              <Route path="invoice " element={<UnVerifiedPoList />} />
            </Route>
          )}
          <Route path="*" element={<UnAuthorised />} />
        </Routes>
      </div>
    </div>
  );
};

export default ProtectedRoutes;
