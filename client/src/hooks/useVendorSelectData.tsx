import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { FormSelectProps, VendorOption } from "../interfaces/CommonProps";
import vendorService from "../services/vendor/vendorService";

export const useVendorSelectData = () => {
  const [selectOptions, setSelectOptions] = useState<FormSelectProps[]>([]);

  useEffect(() => {
    vendorService
      .getall<VendorOption[]>()
      .then((res: AxiosResponse) => {
        const options: FormSelectProps[] = res.data.map(
          (vendor: VendorOption) => ({
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
