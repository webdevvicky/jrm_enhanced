import React, { useState } from "react";
import { useProjectData } from "../../hooks/useProjectData";
import { ProjectOption } from "../../interfaces/CommonProps";

interface SelectProjectComponentProps {
  onChange: (selectedProject: ProjectOption) => void;
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
  className?: string;
}

const SelectProjectComponent: React.FC<SelectProjectComponentProps> = ({
  onChange,
  placeholder = "Select a Project",
  defaultValue = "",
  required = false,
  className = "form-select py-3",
}) => {
  const projectOptions: ProjectOption[] = useProjectData();
  const [selectedProject, setSelectedProject] = useState<string>("");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProjectId = event.target.value;
    const selectedProject = projectOptions.find(
      (project) => project._id === selectedProjectId
    );
    onChange(selectedProject || { _id: "", projectName: "" });
    setSelectedProject(selectedProjectId);
  };

  return (
    <div className="">
      <select
        onChange={handleSelectChange}
        value={selectedProject || defaultValue}
        required={required}
        className={className}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {projectOptions.map((project) => (
          <option key={project._id} value={project._id}>
            {project.projectName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectProjectComponent;
