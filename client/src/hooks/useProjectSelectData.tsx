import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import projectService from "../services/project/projectService";
import { FormSelectProps, ProjectOption } from "../interfaces/CommonProps";

export const useProjectSelectData = () => {
  const [selectOptions, setSelectOptions] = useState<FormSelectProps[]>([]);

  useEffect(() => {
    projectService
      .getall<ProjectOption[]>()
      .then((res: AxiosResponse) => {
        const options: FormSelectProps[] = res.data.map(
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
