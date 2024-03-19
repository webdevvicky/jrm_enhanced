interface ContractorFormProps{
    name:string,
    mobileNumber:string,
    category:number,
    rate:number,
    alternateMobile:string,
    alternatePerson:number,
    permanentAddress:number,
    temporaryAddress:string,
    accountDetails:AccountDetails,
    idProofType:string,
    idProofNumber:string
}


interface ContractorListProps{
    _id:string,
    name:string,
    mobileNumber:number,
    category:string
    rate:string
    accountDetails:AccountDetails,


}

interface ContractorsListPagiantionProps{
    contractors:ContractorListProps[],
    currentPage:number,
    totalPages:number
}

interface ContractorProps extends ContractorFormProps{
    _id:string
}

interface ContractorApprovelListProps{
    _id:string,
    name:string,
    
    catagory:string
    rate:string
    isApproved:boolean,
    isRejected:boolean
}