
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

    enquiryId:string
}

interface ProjectCardProps{
    _id: string;
    projectName: string;
    name: string;
    projectAddress: string;
    projectLocation: string;
    city: string;
    fileNumber: number;
    pinCode: string;
    mobileNumber: number;
    email: string;
    status: boolean;
    userCredentialsId: string;
    alternateEmail:string,
    alternateMobile:number,
    ProjectValue:number,
    startDate:string,
    completionDate:string,
    __v: number;
}

interface CompletedProjectProps{
    projectName:string,
    completedDate:string
}