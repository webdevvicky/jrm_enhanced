import { JwtPayload, jwtDecode } from "jwt-decode";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import NavBar from "../components/Common/NavBar/NavBar";
import EmployeeDashboard from "../components/Dashboard/EmployeeDashboard";
import AdminDashboard from "../components/Dashboard/AdminDashboard";
import ClientDashboard from "../components/Dashboard/ClientDashboard";
import Login from "../components/Pages/Login";
import UnAuthorised from "../components/Pages/UnAuthorised";
import NewProject from "../components/Projects/NewProject";
import ProjectCard from "../components/Projects/ProjectCard";
import NewInvoice from "../components/Invoices/NewInvoice";
import InvoiceList from "../components/Invoices/InvoiceList";
import Invoice from "../components/Invoices/Invoice";
import QuoteModel from "../components/Quotes/QuoteModel";
import QuoteList from "../components/Quotes/QuoteList";
import NewEmployee from "../components/Employees/NewEmployee";
import EmployeeCard from "../components/Employees/EmployeeCard";
import NewEmployeeVoucher from "../components/Vouchers/NewEmployeeVoucher";
import VoucherModel from "../components/Vouchers/VoucherModel";
import VoucherList from "../components/Vouchers/VoucherList";
import NewAdmin from "../components/Admin/NewAdmin";
import AdminCard from "../components/Admin/AdminCard";
import NewPo from "../components/PurchaseOrders/NewPo";
import PoModel from "../components/PurchaseOrders/PoModel";
import UnApprovedList from "../components/PurchaseOrders/UnApprovedPoList";
import PoApprovelModel from "../components/PurchaseOrders/PoApprovelModel";
import UnVerifiedPoList from "../components/PurchaseOrders/UnVerifiedPoList";
import PoList from "../components/PurchaseOrders/PoList";
import CompletedProjects from "../components/Projects/CompletedProjects";
import NewContractor from "../components/Contractors/NewContractor";
import ContractorList from "../components/Contractors/ContractorList";
import QuoteForm from "../components/Quotes/QuoteForm";
import QuoteApprovel from "../components/Quotes/QuoteApprovel";
import InvoiceApprovel from "../components/Invoices/InvoiceApprovel";
import NewVendor from "../components/Vendors/NewVendorForm";
import VendorList from "../components/Vendors/VendorList";
import NewEnquiry from "../components/Enquiries/NewEnquiry";

interface MyJwtPayload extends JwtPayload {
  role: string;
  userId: string;
  userCredId: string;
  exp: number;
  iat: number;
}

const ProtectedRoutes = () => {
  const token = localStorage.getItem("token");
  const decoded = token ? (jwtDecode(token) as MyJwtPayload) : null;
  const userRole = decoded?.role;
  const isTokenExpired = decoded?.exp && decoded.exp * 10000 < Date.now();
  const navigate = useNavigate();

  const employeenav = [
    { to: "projects" },
    { to: "newinvoice", label: "New Invoice" },
    { to: "invoices" },
    { to: "newvoucher", label: "New Voucher" },
    { to: "uploadimage", label: "upload image" },
    { to: "vouchers" },
    {
      to: "Purchase Order",
      subcategories: [
        { to: "/purchase/new", label: "New" },
        { to: "/purchase/list", label: "purchase List" },
        { to: "/purchase/verify", label: "Verification" },
      ],
    },
  ];
  const adminnav: NavItem[] = [
    { to: "/", label: "Home" },
    {
      to: "projects",
      subcategories: [
        { to: "/projects/new", label: "New" },
        { to: "/projects/ongoing", label: "Ongoing" },
        { to: "/projects/completed", label: "completed" },
      ],
    },
    {
      to: "Quotes",
      subcategories: [
        { to: "/quote/new", label: "New" },
        { to: "/quote/list", label: " Quote List" },
        { to: "/quote/approvel", label: " Approvel" },
      ],
    },
    {
      to: "Invoice",
      subcategories: [
        { to: "/invoice/new", label: "New" },
        { to: "/invoice/list", label: "Invoice List" },
        { to: "/invoice/approvel", label: " Approvel" },
      ],
    },
    {
      to: "Purchase Order",
      subcategories: [
        { to: "/purchase/new", label: "New" },
        { to: "/purchase/list", label: "purchase List" },
        { to: "/purchase/approvel", label: "Approvel" },
        { to: "/purchase/vendors", label: "New Vendor" },
        { to: "/purchase/vendors/list", label: "vendors List" },
      ],
    },
    {
      to: "Voucher",
      subcategories: [
        { to: "/voucher/empnew", label: "Employee Voucher" },
        { to: "/voucher/labournew", label: "Labour Voucher" },
        { to: "/voucher/list", label: " Voucher list" },
      ],
    },
    {
      to: "Employee",
      subcategories: [
        { to: "/employee/new", label: "New Employee" },
        { to: "/employee/list", label: " Employee list" },
        { to: "/contractor/new", label: "New Contractor" },
        { to: "/contractor/list", label: "Contractor list" },
      ],
    },

    {
      to: "Admin",
      subcategories: [
        { to: "/enquiry/new", label: "Enquiry New" },
        { to: "/enquiry/list", label: "Enquiry List" },
        { to: "/admin/new", label: "New" },
        { to: "/admin/list", label: "Admin List" },
      ],
    },
  ];

  // Check for token and decoded user information
  if (!token || !decoded || isTokenExpired) {
    // If no token or decoded user information, navigate to the login page
    return (
      <Routes>
        <Route path="login" element={<Login />} />
      </Routes>
    );
  }

  // If there is a token and decoded user information, navigate to the specific page based on the user's role
  switch (userRole) {
    case "user":
      return (
        <Routes>
          <Route path="/" element={<Navigate to="/user/" />} />
          <Route path="user/*" element={<ClientDashboard />} />
        </Routes>
      );
    case "admin":
      return (
        <div>
          <div>
            <NavBar navItems={adminnav} />
          </div>
          <Routes>
            <Route path="/">
              <Route index element={<AdminDashboard />} />
              <Route path="/projects/new" element={<NewProject />} />
              <Route path="/projects/ongoing" element={<ProjectCard />} />
              <Route
                path="/projects/completed"
                element={<CompletedProjects />}
              />
              <Route path="/invoice/new" element={<NewInvoice />} />
              <Route path="/invoice/list" element={<InvoiceList />} />
              <Route path="invoice/:id" element={<Invoice />} />
              <Route path="invoice/approvel" element={<InvoiceApprovel />} />
              <Route path="/quote/new" element={<QuoteForm />} />
              <Route path="/quote/:id" element={<QuoteModel />} />
              <Route path="/quote/list" element={<QuoteList />} />
              <Route path="/quote/approvel" element={<QuoteApprovel />} />
              <Route path="/employee/new" element={<NewEmployee />} />
              <Route path="/employee/list" element={<EmployeeCard />} />
              <Route path="/purchase/new" element={<NewPo />} />
              <Route path="/purchase/approvel" element={<UnApprovedList />} />
              <Route
                path="/purchase/approvel/:id"
                element={<PoApprovelModel />}
              />
              <Route path="purchase/list" element={<PoList />} />
              <Route path="/purchase/:id" element={<PoModel />} />
              <Route path="/purchase/vendors" element={<NewVendor />} />
              <Route path="/purchase/vendors/list" element={<VendorList />} />
              <Route path="/voucher/empnew" element={<NewEmployeeVoucher />} />
              <Route path="/voucher/list" element={<VoucherList />} />
              <Route path="/contractor/new" element={<NewContractor />} />
              <Route path="/contractor/list" element={<ContractorList />} />
              <Route path="/voucher/model/:id" element={<VoucherModel />} />
              <Route path="/admin/new" element={<NewAdmin />} />
              <Route path="/admin/list" element={<AdminCard />} />
              <Route path="/enquiry/new" element={<NewEnquiry />} />
              <Route path="/*" element={<Navigate to="/" />} />
            </Route>
          </Routes>
        </div>
      );
    case "employee":
      return (
        <div>
          <div>
            <NavBar navItems={employeenav} />
          </div>
          <Routes>
            <Route path="/">
              <Route index element={<EmployeeDashboard />} />
              <Route path="/purchase/new" element={<NewPo />} />
              <Route path="/purchase/verify" element={<UnVerifiedPoList />} />
              <Route
                path="/purchase/verify/:id"
                element={<PoApprovelModel />}
              />
              <Route path="purchase/list" element={<PoList />} />
              <Route path="/purchase/model/:id" element={<PoModel />} />
              <Route path="/*" element={<Navigate to="/" />} />
            </Route>
          </Routes>
        </div>
      );
    default:
      // If the user role is not recognized, navigate to the unauthorized page
      navigate("/unauthorised");
      return (
        <Routes>
          <Route path="/unauthorised" element={<UnAuthorised />} />
        </Routes>
      );
  }
};

export default ProtectedRoutes;
