import React, { useEffect, useState } from "react";
import SelectProjectComponent from "../Projects/SelectProjectComponenet";
import quoteUsingProject from "../../services/quote/quoteUsingProject";
import { AxiosResponse } from "axios";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import Header from "../Common/Header/Header";

interface Project {
  _id: string;
  projectName: string;
}

const QuoteList: React.FC = () => {
  const [quotes, setQuotes] = useState<QuoteModelProps[]>([]);
  const [filteredQuotes, setFilteredQuotes] = useState<QuoteModelProps[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project>();
  const [filterType, setFilterType] = useState<string | null>("all");

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
  };

  const handleFilter = (type: string) => {
    setFilterType(type);
  };

  useEffect(() => {
    if (selectedProject) {
      quoteUsingProject
        .getById(selectedProject._id)
        .then((res: AxiosResponse) => {
          setQuotes(res.data);
          console.log(res.data);
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }, [selectedProject]);

  useEffect(() => {
    // Apply filtering based on selected type
    if (filterType === "all") {
      setFilteredQuotes(quotes);
    } else {
      const filtered = quotes.filter((quote) => {
        if (filterType === "construction") {
          return quote.isConstruction;
        } else if (filterType === "revised") {
          return quote.isRevised;
        } else if (filterType === "additional") {
          return quote.isAdditional;
        } else if (filterType === "interior") {
          return quote.isInterior;
        }
        return false;
      });
      setFilteredQuotes(filtered);
    }
  }, [filterType, quotes]);
  console.log("fil", filteredQuotes);
  console.log("ser", quotes);
  return (
    <div className=" container ">
      <div className="row pb-3">
        <div className="col-md-6">
          <Header lable="Select Project" />
          <SelectProjectComponent onChange={handleProjectSelect} />
        </div>
        <div className="col-md-6">
          <Header lable="Select type" />
          <select
            onChange={(event) => handleFilter(event.target.value)}
            className=" form-select  py-3"
          >
            <option value="all">All</option>
            <option value="construction">Construction</option>
            <option value="revised">Revised</option>
            <option value="additional">Additional</option>
            <option value="interior">Interior</option>
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <table className=" table table-active  table-hover  text-center ">
            <thead>
              <tr>
                <th>SNO</th>
                <th>Date</th>
                <th>Rev</th>
                <th>Type</th>
                <th>Value</th>
                <th>view</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuotes.length >= 1 ? (
                filteredQuotes?.map((quote, index:number) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                   
                      {quote ? format(new Date(quote.date), "dd/MM/yyyy") : ""}
                    </td>
                    <td>{quote.rev}</td>
                    <td>
                      {quote.isConstruction && "Construction"}
                      {quote.isRevised && "Revised"}
                      {quote.isAdditional && "Additional"}
                      {quote.isInterior && "Interior"}
                    </td>
                    <td>{quote.totalValue}</td>
                    <td>
                      <Link to={`/quote/${quote._id}`}>view</Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-5 text-danger">
                    No Quotes to Display
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QuoteList;
