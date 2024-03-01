import { Route, Routes } from "react-router-dom";
import NewEnquiry from "../components/Enquiries/NewEnquiry";
import UnAuthorised from "../components/Pages/UnAuthorised";
import EnquiriesList from "../components/Enquiries/EnquiryList";
import EnquiryQuotation from "../components/Enquiries/EnquiryQuotation";
import EnquiryQuoteList from "../components/Enquiries/EnquiryQuoteList";
import EnquiryQuoteModel from "../components/Enquiries/EnquiryQuoteModel";

const MarkettingRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/marketting">
          <Route path="new" element={<NewEnquiry />} />
          <Route path="list" element={<EnquiriesList />} />
          <Route path="edit/:id" element={<NewEnquiry />} />
          <Route path="quote/list/:id" element={<EnquiryQuoteList />} />
          <Route path="quote/form/:id" element={<EnquiryQuotation />} />
          <Route path="quote/form/edit" element={<EnquiryQuotation />} />
          <Route path="quote/model/:id" element={<EnquiryQuoteModel />} />
        </Route>
        <Route path="*" element={<UnAuthorised />} />
      </Routes>
    </div>
  );
};

export default MarkettingRoutes;
