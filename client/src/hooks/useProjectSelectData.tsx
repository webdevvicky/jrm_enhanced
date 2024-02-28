import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import projectService from "../services/project/projectService";
import { SelectOptions, ProjectOption } from "../interfaces/CommonProps";

export const useProjectSelectData = () => {
  const [selectOptions, setSelectOptions] = useState<SelectOptions[]>([]);

  useEffect(() => {
    projectService
      .getall<ProjectOption[]>()
      .then((res: AxiosResponse) => {
        const options: SelectOptions[] = res.data.map(
          (project: ProjectOption) => ({
            value: project._id,
            option: project.projectName,
          })
        );
        setSelectOptions(options);
      })
      .catch((err) => {
        window.alert(err);
      });
  }, []);

  return selectOptions;
};
