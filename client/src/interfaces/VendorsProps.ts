interface accountDetails{
  
        accountNumber:number,
        branchName:string,
        ifsc:string,
        upi:number,
  
}
interface VendorFormProps{
    name:string,
    address:string,
    gst:string,
    accountDetails:accountDetails,
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

interface VendorListProps{
    _id:string,
    name:string,
    address:string
    mobileNumber:number,
    items:string
    rate:string
    accountDetails:accountDetails,


}

interface VendorListPagiantionProps{
    vendors:VendorListProps[],
    currentPage:number,
    totalPages:number
}


interface VendorApprovelListProps{
    _id:string,
    name:string,
    address:string
    items:string
    rate:string
    isApproved:boolean,
    isRejected:boolean
}

interface VendorProps extends VendorFormProps{
    _id:string
}