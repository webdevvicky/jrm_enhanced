import { useEffect, useState } from "react";
import enquiryBookingServices from "../../services/enquiry/enquiryBookingServices";
import { AxiosResponse } from "axios";
import { handleApiError } from "../../utils/apiUtils";
import { Link } from "react-router-dom";

const ProjectList = () => {
  const [bookingList, setBookingList] = useState<BookingMoved[]>([]);
  useEffect(() => {
    enquiryBookingServices
      .getall<BookingMoved[]>()
      .then((res: AxiosResponse) => {
        console.log(res.data);
        setBookingList(res.data);
      })
      .catch((err: any) => {
        handleApiError(err);
      });
  }, []);

  return (
    <div className=" container ">
      <div className="row">
        <table className=" table  ">
          <thead>
            <tr>
              <th>S.no</th>
              <th>File No</th>
              <th>Name</th>
              <th>Location</th>
              <th>Book</th>
            </tr>
          </thead>
          <tbody>
            {bookingList.map((enquiry, i) => (
              <tr key={enquiry._id}>
                <td>{i + 1}</td>
                <td>{enquiry.fileNumber}</td>

                <td>{enquiry.name}</td>

                <td>{enquiry.location}</td>
                <td>
                  <Link
                    to={"new"}
                    state={{ ...enquiry, enquiryId: enquiry._id }}
                  >
                    KYC
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectList;
