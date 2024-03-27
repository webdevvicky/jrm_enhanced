import { AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import quoteUsingProject from "../../services/quote/quoteUsingProject";
import { Link } from "react-router-dom";
import { FileEarmarkCheck, PlusSquareDotted } from "react-bootstrap-icons";

interface selected {
  selectedProject: {
    _id: string;
    projectName: string;
  };
}
const QuoationList = ({ selectedProject }: selected) => {
  const [quoteList, setQuoteList] = useState<QuoteModelProps[]>([]);
  useEffect(() => {
    quoteUsingProject
      .getById(selectedProject._id)
      .then((res: AxiosResponse) => setQuoteList(res.data))
      .catch((err) => console.log(err));
  }, [selectedProject]);

  const constructionQuotes = quoteList.filter(
    (quote) => quote.isConstruction || quote.isRevised
  );
  const interiorQuotes = quoteList.filter((quote) => quote.isInterior);
  const additionalQuotes = quoteList.filter((quote) => quote.isAdditional);
  console.log(constructionQuotes);
  return (
    <>
      {/* Construction Quotes */}
      <div className=" container  bg-white  border rounded-3 py-2">
        <div className="row">
          <div className="col-md-6 pt-1">
            <h5>Construction Quote</h5>
          </div>
          <div className="col-md-6 text-end">
            <Link
              to={"/designs/quote/new"}
              state={{
                projectId: selectedProject?._id,
                projectName: selectedProject?.projectName,
                revised: true,
                construction: true,
              }}
            >
              <PlusSquareDotted size={30} className="me-4 my-1" />
            </Link>
          </div>
        </div>
        <div className="row ">
          {constructionQuotes.map((quote) => (
            <div className=" col-md-2 ">
              <div className="card text-center">
                <div className=" card-img-top ">
                  <Link to={`/designs/quote/model/${quote._id}`}>
                    <FileEarmarkCheck size={100} className="p-1" />
                    <div className=" card-footer bg-white ">
                      REV - {quote.rev}
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Quotes */}

      <div className=" container  bg-white  border rounded-3 my-3 py-2">
        <div className="row">
          <div className="col-md-6 pt-1">
            <h5>Additional Quote</h5>
          </div>
          <div className="col-md-6 text-end">
            <Link
              to={"/designs/quote/new"}
              state={{
                projectId: selectedProject?._id,
                projectName: selectedProject?.projectName,
                additional: true,
              }}
            >
              <PlusSquareDotted size={30} className="me-4 my-1" />
            </Link>
          </div>
        </div>
        <div className="row ">
          {additionalQuotes.map((quote) => (
            <div className=" col-md-2 ">
              <div className="card text-center">
                <div className=" card-img-top ">
                  <Link to={`/designs/quote/model/${quote._id}`}>
                    <FileEarmarkCheck size={100} className="p-1" />
                    <div className=" card-footer bg-white ">
                      REV - {quote.rev}
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interior Quotes */}

      <div className=" container  bg-white  border rounded-3 py-2">
        <div className="row">
          <div className="col-md-6 pt-1">
            <h5>Interior Quote</h5>
          </div>
          <div className="col-md-6 text-end">
            <Link
              to={"/designs/quote/new"}
              state={{
                projectId: selectedProject?._id,
                projectName: selectedProject?.projectName,
                interior: true,
              }}
            >
              <PlusSquareDotted size={30} className="me-4 my-1" />
            </Link>
          </div>
        </div>
        <div className="row ">
          {interiorQuotes.map((quote) => (
            <div className=" col-md-2">
              <div className="card text-center">
                <div className=" card-img-top ">
                  <Link to={`/designs/quote/model/${quote._id}`}>
                    <FileEarmarkCheck size={100} className="p-1" />
                    <div className=" card-footer bg-white ">
                      REV - {quote.rev}
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default QuoationList;
