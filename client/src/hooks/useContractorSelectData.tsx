import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { FormSelectProps } from "../interfaces/CommonProps";

import contractorService from "../services/contractor/contractorService";

interface ContractorOption {
  _id: string;
  name: string;
}
export const useContractorSelectData = () => {
  const [selectOptions, setSelectOptions] = useState<FormSelectProps[]>([]);

  useEffect(() => {
    contractorService
      .getall<ContractorOption[]>()
      .then((res: AxiosResponse) => {
        const options: FormSelectProps[] = res.data.map(
          (vendor: ContractorOption) => ({
            value: vendor._id,
            option: vendor.name,
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
