
interface VendorFormProps{
    name:string,
    address:string,
    gst:string,
    accountNumber:number,
    branchName:string
    ifsc:string,
    gpay:number,
    items:string,
    rate:string
    mobileNumber:number,
    landlineNumber:number,
    alternateNumber:number,
    salesPersonName:string,
    salesPersonMobile:number,
    ownerName:string,
    ownerNumber:number
    
}

interface VendorProps extends VendorFormProps{
    _id:string
}