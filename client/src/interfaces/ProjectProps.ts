
interface NewProjectProps{
    projectName: string;
    fileNumber: number;
    name: string;
    mobileNumber: number;
    alternateMobile:number;
    email: string;
    occupation:string
    address:string

    projectLocation:string;
    plotArea:string
    projectAddress: string;

    floorsNumber:number
    buildUpArea:string
    facing:string,
    roadWidth:string,
    cementBrand:string,
    steelBrand:string,
    brickWork:string,
    plasteringWork:string

    architect:string,
    projectManager:string,
    siteEngineer:string,

    projectValue:number,
    password: string;
    status:boolean;

    enquiry:string
}

interface ProjectList {
    _id:string,
    fileNumber:number
    projectName:string
    mobileNumber:number
    email:string
}

interface ProjectApprovelList{
    _id:string,
    projectName:string
    fileNumber:number
    isRejected:boolean
    isApproved:boolean,

}


interface ProjectProps extends NewProjectProps{
    _id:string,
    
}

