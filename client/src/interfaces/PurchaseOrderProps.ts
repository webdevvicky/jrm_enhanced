interface PoItemProps {
    id: number;
    item: string;
    meterialFor: number;
    qty:number;
    unit: string;
    rate: number;
    amount?: number;
  }

interface PoFormProps{
    project:string,
    stage:string,
    meterialCategory:string,
    vendor:string,
    items:PoItemProps[],
    subTotal:number,
    sgst:number ,
    cgst:number,
    igst:number
    totalAmount:number,
   
}

interface PoModelProps {
  _id:string,
  createdBy:Employee
  approvedBy:Employee
  verifiedBy:Employee
  isApproved:boolean,
  isVerified:boolean
  date:string
  poNumber:number
  project:ProjectProps
  stage:string,
  meterialCategory:string,
  vendor:VendorProps
  items:PoItemProps[],
    subTotal:number,
    sgst:number ,
    cgst:number,
    igst:number
    totalAmount:number,
}


interface PoPendingPaymentProps{
  poNumber:number,
  date:string,
  stage:string,
  totalAmount:number,
  payedAmount:number
  balanceAmount:number,
  _id:string

}

interface PoListProps{
  _id:string,
  poNumber:number,
  date:string,
  stage:string,
  vendor:VendorProps
  totalAmount:number,
  

}

interface UnverifiedPoProps{
  _id:string
  poNumber:number,
  project:ProjectProps,
  stage:string,
  isVerified:boolean,
  isApproved:boolean,
  isRejected:boolean
}
interface UnApprovedPoProps extends UnverifiedPoProps{
  approvedBy:Employee
}







interface SearchDescriptionResults {
    _id: string;
    description: string;
    rate: string;
    unit: string;
    meterialFor: string;
  }