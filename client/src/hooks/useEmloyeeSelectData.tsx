import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import employeeService from "../services/employee/employeeService";
import { EmployeeOption, FormSelectProps } from "../interfaces/CommonProps";

export const useEmployeeSelectData = () => {
  const [selectOptions, setSelectOptions] = useState<FormSelectProps[]>([]);

  useEffect(() => {
    employeeService
      .getall<EmployeeOption[]>()
      .then((res: AxiosResponse) => {
        const options: FormSelectProps[] = res.data.map(
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
