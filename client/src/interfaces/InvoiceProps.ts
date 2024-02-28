interface NewInvoiceProps{
    invoiceNumber:number,
    projectId:string,
    subject:string,
    description:string,
    rate:number,
    modeOfPayment:string,
    refNumber:string,
    paymentMade:number, 
    balanceToBeMade:number,
    nextDue:string,
    dueDate:Date
}   

interface InvoiceListProps{
    _id:string,
    projectId:{
        _id:string,
        projectName:string,
        name:string,
    },
    name:string,
    isApproved:string,
    invoiceNumber:number,
    date:string,
   dueDate:Date
    subject:string,
    description:string,
    rate:number,
    modeOfPayment:string,
    refNumber:string,
    paymentMade:number, 
    balanceToBeMade:number,
    nextDue:string,
    

}

interface InvoiceModelProps {
    invoiceNumber: number;
    date:string,
   
    dueDate: string; 
    projectId: {
      _id: string;
      name: string;
      projectAddress: string;
      location: string;
      pinCode: string;
      fileNumber:number
    };
    subject: string;
    description: string;
    rate: number;
    paymentMade: number;
    modeOfPayment: string;
    refNumber: string;
    balanceToBeMade: number;
    nextDue: string;
    _id:string,
    isApproved:boolean
  }
  
 
  