import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import voucherService from "../../services/voucher/voucherService";
const VoucherList = () => {
  const [voucherlist, setVoucherlist] = useState<VoucherModelProps[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    voucherService
      .getall<VoucherModelProps[]>()
      .then((res) => {
        setVoucherlist(res.data);
      })
      .catch((err: any) => {
        window.alert(err.response.data.error);
        navigate("/");
      });
  }, []);
  return (
    <div className="container">
      {voucherlist.map((voucher) => voucher.clientName)}
    </div>
  );
};

export default VoucherList;
