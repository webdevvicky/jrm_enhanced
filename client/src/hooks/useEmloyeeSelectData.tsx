import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { SelectOptions, EmployeeOption } from "../interfaces/CommonProps";
import employeeService from "../services/employee/employeeService";

export const useEmployeeSelectData = () => {
  const [selectOptions, setSelectOptions] = useState<SelectOptions[]>([]);

  useEffect(() => {
    employeeService
      .getall<EmployeeOption[]>()
      .then((res: AxiosResponse) => {
        const options: SelectOptions[] = res.data.map(
          (employee: EmployeeOption) => ({
            value: employee._id,
            option: employee.empName,
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
