
interface QuoteItemProps {
    id: number;
    description: string;
    sqft: number;
    unit: string;
    rate: number;
    amount?: number;
    _id:string
    
  }

interface NewQuoteProps{
    project:string,
    rev:number | null,
    totalValue:number,
    isAdditional:boolean,
    isInterior:boolean,
    isConstruction:boolean,
    isRevised:boolean,
    items:QuoteItemProps[]
}

interface QuoteModelProps{
    _id: string;
    date: string; 
    isApproved: boolean;
    isRejected:boolean
    isAdditional:boolean;
    isConstruction:boolean;
    isInterior:boolean;
    isRevised:boolean;
    items: QuoteItemProps[];
    project: {
        _id: string;
        name: string;
        email:string,
        projectLocation:string,
        mobileNumber:number,
        fileNumber:number,
        projectName:string
      };
    rev: number;
    status: boolean; 
    totalValue: number;
      
    __v: number;
}

interface QuoteApprovelListProps{
  _id:string,
  isConstruction:boolean,
  isRevised:boolean,
  isInterior:boolean,
  isAdditional:boolean,
  isRejected:boolean,
  isApproved:boolean
  rev:number,
  project:{
    name:string,
    projectName:string
  }
}

