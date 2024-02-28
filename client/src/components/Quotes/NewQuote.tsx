// import { useState } from "react";
// import SelectProjectComponent from "../Projects/SelectProjectComponenet";

import QuoteForm from "./QuoteForm";

// import QuoteForm from "./QuoteForm";

// const NewQuote = () => {
//   const [selectedProject, setSelectedProject] = useState<ProjectOption>();
//   const onSelectProject = (project: ProjectOption) => {
//     setSelectedProject(project);
//   };
//   return (
//     <div>
//       {!selectedProject ? (
//         <div className="container">

//           <div>
//             <h4 className=" text-danger-emphasis ">Select Project For new Quote</h4>
//           </div>
//           <SelectProjectComponent onChange={onSelectProject} />
//         </div>
//       ) : (
//         <QuoteForm
//           projectName={selectedProject.projectName}
//           _id={selectedProject._id}
//         />
//       )}
//     </div>
//   );
// };

// export default NewQuote;

const NewQuote = () => {
  return <div><QuoteForm/></div>;
};

export default NewQuote;
