import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import projectService from "../services/project/projectService";
import { ProjectOption } from "../interfaces/CommonProps";

export const useProjectData = () => {
  const [selectOptions, setSelectOptions] = useState<ProjectOption[]>([]);

  useEffect(() => {
    projectService
      .getall<ProjectOption[]>()
      .then((res: AxiosResponse) => {
        setSelectOptions(res.data);
      })
      .catch((err: any) => {
        window.alert(err.response.data.error);
      });
  }, []);

  return selectOptions;
};
