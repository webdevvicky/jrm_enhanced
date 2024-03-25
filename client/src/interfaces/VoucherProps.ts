interface VoucherFormProps{
    type:string
    name:string, 
    project: string;
    description: string;
    totalAmount:number;
    payableAmount: number;
    paymentMode: string;
    purchaseOrder:string,
    workOrder:string;
    vendor:string
    contractor:string

}


interface VoucherModelProps{
  type:string
  _id: string;
  name:string;
  voucherNumber: number;
  poNumber?:number;
  woNumber?:number;
  project: ProjectProps;
  date:string;
  description: string;
  totalAmount:number;
  payableAmount: number;
  balanceAmount:number
  paymentMode: string;
  createdBy: Employee;
  verifiedBy: Employee;
  approvedBy:Employee;

}

interface VoucherHistoryProps{
  _id:string
  voucherNumber:number,
  date:string,
  paidAmount:number,
  balanceAmount:number
}

interface VoucherDataProps{
  project:string,
  vendor:string,
  totalAmount:number,
  totalPaidAmount:number
  balanceAmountToPay:number
  vouchers:VoucherModelProps[]
}


interface UnverifiedVoucherProps{
 _id:string
 type:string
 date:string
 project:ProjectProps
 purchaseOrder:PoModelProps
 voucherNumber:number
 isApproved:boolean
 isRejected:boolean,
 
}
interface UnApprovedVoucherProps extends UnverifiedVoucherProps{
  verifiedBy:Employee
}