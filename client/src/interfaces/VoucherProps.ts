interface NewEmployeeVoucherProps{
    voucherNumber: number;
    projectId: string;
    description: string;
    paymentAmount: number;
    paymentMethod: string;
    printedById: string;
    transferredById: string;
    receiverId: string;
}


interface VoucherModelProps{
    _id: string;
  voucherNumber: number;
  projectId: string;
  clientName: string;
  projectName: string;
  voucherDate: string;
  description: string;
  paymentAmount: number;
  paymentMethod: string;
  printedByName: string;
  printedById: string;
  transferredByName: string;
  transferredById: string;
  receiverName: string;
  receiverId: string;
  receiverNMR: number;
}