interface NewContractor{
    contractName:string,
    ownerName:string,
    contractorMobile:number,
    alternateMobile:number,
    contractorEmail:string,
    gpayNumber:number,
    accountNumber:number,
    ifsc:string,
    contractorType:string
}

interface ContractorProps extends NewContractor{
    _id:string
}