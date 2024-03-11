import { useEffect, useState } from "react";
import SelectProjectComponent from "../Projects/SelectProjectComponenet";
import { ProjectOption } from "../../interfaces/CommonProps";
import { FilePdf, Image, PlusSquareDotted } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

import { handleApiError } from "../../utils/apiUtils";
import designUsingProjectService from "../../services/designs/designUsingProjectService";
interface DesignProps {
  fileName: string;
  designFile: string;
  projectId: string;
}

const DesignAndQuoteList = () => {
  const [designsList, setDesignsList] = useState<DesignProps[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectOption>({
    projectName: "",
    _id: "",
  });

  useEffect(() => {
    if (selectedProject?._id) {
      designUsingProjectService
        .getById<DesignProps[]>(selectedProject ? selectedProject._id : "")
        .then((res) => {
          setDesignsList(res.data);
        })
        .catch((err: any) => handleApiError(err));
    }
  }, [selectedProject]);

  const handleChangeProject = (project: ProjectOption) => {
    setSelectedProject(project);
  };

  return (
    <div className="container  ">
      <div className="row py-1 bg-body-secondary justify-content-center  d-flex align-items-center ">
        <div className="col-md-3 text-end   ">
          <SelectProjectComponent onChange={handleChangeProject} />
        </div>
        <div className="col-md-9 text-center  ">
          <h2 className=" fw-bold">
            {selectedProject?._id ? "Seleted Project -- " : "Select Project"}
            {selectedProject?.projectName}
          </h2>
        </div>
      </div>

      {selectedProject?._id.length >= 1 && (
        <div>
          {/* Finalized Designs box  */}

          <div className="row border my-2 ">
            <div className="row py-2">
              <div className="col-md-6">
                <h5>Finalized Designs</h5>
              </div>
              <div className="col-md-6 text-end">
                <Link
                  to={"/designs/new"}
                  state={{
                    projectId: selectedProject?._id,
                    projectName: selectedProject?.projectName,
                  }}
                >
                  <PlusSquareDotted size={30} />
                </Link>
              </div>
            </div>

            <div className=" row">
              {designsList.map((design) => (
                <div className=" col-md-2 pb-2">
                  <div className="card text-center">
                    <div className=" card-img-top ">
                      <Link
                        to={import.meta.env.VITE_API_URL + design.designFile}
                        className=" text-decoration-none "
                      >
                        {design.designFile.endsWith("pdf") ? (
                          <FilePdf size={100} color="red" className=" py-2" />
                        ) : (
                          <div className="text-center">
                            <Image size={100} className=" text-center " />
                          </div>
                        )}
                        <div className=" card-footer text-truncate ">
                          {design.fileName}
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/*  Finalized Quotation*/}

          <div className="row border my-2">
            <div className="row py-2">
              <div className="col-md-6">
                <h5>Finalized Quotation</h5>
              </div>
              <div className="col-md-6 text-end">
                Revise Quotation{" "}
                <Link
                  to={"/designs/quote/new"}
                  state={{
                    projectId: selectedProject?._id,
                    projectName: selectedProject?.projectName,
                    revised: true,
                    construction: true,
                  }}
                >
                  <PlusSquareDotted size={30} />
                </Link>
              </div>
            </div>

            <div className=" row ">
              <div className=" col-md-2  col-sm-6 pb-2">
                <div className="card text-center ">
                  <div className=" card-img-top ">
                    <Link to={"quote"} className="text-decoration-none  ">
                      <h1 className="    text-danger  my-4  ">R 1</h1>
                      <div className=" card-footer ">Quotation</div>
                    </Link>
                  </div>
                </div>
              </div>
              <div className=" col-md-2  col-sm-6 pb-2">
                <div className="card text-center ">
                  <div className=" card-img-top ">
                    <Link to={"quote"} className="text-decoration-none  ">
                      <h1 className="    text-danger  my-4  ">R 1</h1>
                      <div className=" card-footer ">Quotation</div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interior Quotation */}

          <div className="row border my-2">
            <div className="row py-2">
              <div className="col-md-6">
                <h5>Interior Quotation</h5>
              </div>
              <div className="col-md-6 text-end">
                Revise Quotation{" "}
                <Link
                  to={"/designs/quote/new"}
                  state={{
                    projectId: selectedProject?._id,
                    projectName: selectedProject?.projectName,
                    interior: true,
                  }}
                >
                  <PlusSquareDotted size={30} />
                </Link>
              </div>
            </div>

            <div className=" row">
              <div className=" col-md-2  col-sm-6 pb-2">
                <div className="card text-center ">
                  <div className=" card-img-top ">
                    <Link to={"quote"} className="text-decoration-none  ">
                      <h1 className="    text-danger  my-4  ">R 1</h1>
                      <div className=" card-footer ">Quotation</div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*Additional Items  */}

          <div className="row border my-2">
            <div className="row py-2">
              <div className="col-md-6">
                <h5>Additional Items Quotation</h5>
              </div>
              <div className="col-md-6 text-end">
                Revise Quotation{" "}
                <Link
                  to={"/designs/quote/new"}
                  state={{
                    projectId: selectedProject?._id,
                    projectName: selectedProject?.projectName,
                    additional: true,
                  }}
                >
                  <PlusSquareDotted size={30} />
                </Link>
              </div>
            </div>

            <div className=" row">
              <div className=" col-md-2  col-sm-6 pb-2">
                <div className="card text-center ">
                  <div className=" card-img-top ">
                    <Link to={"quote"} className="text-decoration-none  ">
                      <h1 className="    text-danger  my-4  ">R 1</h1>
                      <div className=" card-footer ">Quotation</div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesignAndQuoteList;
