
interface NewProjectProps{
    projectName: string;
    fileNumber: number;
    name: string;
    projectAddress: string;
    projectLocation:string;
    startDate:Date;
    completionDate:Date
    pinCode: number;
    mobileNumber: number;
    alternateMobile:number;
    email: string;
    alternateEmail:string;
    password: string;
    completedDate:Date;
    isCompleted:boolean
    status:boolean;
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