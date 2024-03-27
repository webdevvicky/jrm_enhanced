
interface WorkOrderItems{
    id:number,
    description:string,
    unit:string,
    qty:number,
    rate:number,
    amount:number
    
}

interface workOrderItemsFromServer extends WorkOrderItems{
    _id:string,
    date:string
}


interface Terms{
    description:string
}

interface WorkOrderFormProps{
    project:string,
    contractor:string,
    subTotal:string,
    items:WorkOrderItems[]
    totalAmount:number
    terms:Terms[]

}



interface UnverifiedWorkOrderProps{
    _id:string
    woNumber:number,
    project:ProjectProps,
    contractor:ContractorProps
    isVerified:boolean,
    isApproved:boolean,
    isRejected:boolean
  }

  interface UnApprovedWorkOrderProps extends UnverifiedWorkOrderProps{
    approvedBy:Employee
  }


  interface WorkOrderModelProps {
    project :ProjectProps
    contractor:ContractorProps
    woNumber:number
    totalAmount:number
    date:string,
    items:workOrderItemsFromServer[] 
    terms:Terms[]
    vouchers:VoucherModelProps[]
    createdBy:Employee
    approvedBy:Employee
    verifiedBy:Employee
    
  }


  interface WorkOrderPendingPaymentProps{
    _id:string
    woNumber:number
    contractor:ContractorProps
    totalAmount:number
    payedAmount:number
    balanceAmount:number
    date:string
  }