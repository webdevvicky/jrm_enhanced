import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { FormSelectProps, VendorOption } from "../interfaces/CommonProps";
import vendorService from "../services/vendor/vendorService";
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
