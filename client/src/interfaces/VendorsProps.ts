
interface NewVendorProps{
    shopName:string,
    shopType:string,
    shopAddress:string,
    meterialsAvailable:string,
    shopMobile:number,
    shopLandLine:number,
    AlternateNumber:number,
    salesPersonName:string,
    salesPersonMobile:number,
    accountNumber:number,
    ifsc:string,
    gpay:number,
}

interface VendorProps extends NewVendorProps{
    _id:string
}