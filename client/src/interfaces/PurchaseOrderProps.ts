interface PoItemProps {
    id: number;
    description: string;
    meterialFor: number;
    quantity:number;
    unit: string;
    rate: number;
    amount?: number;
  }

interface NewPoProps{
    projectId:string,
    stage:string,
    meterialCatagory:string,
    vendorId:string,
    items:PoItemProps[],
    subTotal:number,
    sgst:number ,
    cgst:number,
    totalAmount:number,
   
}

interface UnApprovelPo extends NewPoProps{
  _id:string
siteName:string,
poNumber:number,
date:string
}

interface PoModelProps{
  _id:string
    siteName:string,
    poNumber:string,
    date:string,
    stage:string,
    meterialCatagory:string,
    supplier:string,
    items:PoItemProps[],
    subTotal:number,
    sgst:number ,
    cgst:number,
    totalAmount:number,
    isApproved:boolean,
    approvedBy:string,  
    isVerified:boolean,
    verifiedBy:string
}

interface SearchDescriptionResults {
    _id: string;
    description: string;
    rate: string;
    unit: string;
    meterialFor: string;
  }