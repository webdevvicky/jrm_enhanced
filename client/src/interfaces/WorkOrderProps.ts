
interface WorkOrderItems{
    id:number,
    description:string,
    unit:string,
    area:string,
    rate:number,
    amount:number
}

interface NewWorkOrder{
    projectId:string,
    contractorId:string,
    subTotal:string,
    terms:string;
}