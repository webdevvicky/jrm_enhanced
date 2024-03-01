interface NewEnquiryProps{
   priority:number,
   name:string,
   location:string,
   mobileNumber:string,
   email:string,
   quotationSent:boolean,
   siteVisit:boolean,
   officeVisit:boolean,
   schemeSent:boolean,
   source:string,
   initialRemark:string
   remarks?:Remarks[]
    }

interface Remarks{
        date:string,
        comment:string
    }

    interface EnquiryProps extends NewEnquiryProps{
        createdAt:Date,
        _id:string,
        date:Date,
        fileNumber:number
    }



    interface QuoteItemProps {
        id: number;
        description: string;
        sqft: number;
        unit: string;
        rate: number;
        amount?: number;
        _id:string
        
      }

    interface EnquiryQuoteProps{
        enquiryId: string;
        items: QuoteItemProps[]
        totalValue: number;
    }

    interface EnquiryQuoteModelProps {
        _id:string
        date:Date,
        rev:number,
        fileNumber:number
        isApproved:boolean,
        isCorrection:boolean
        items: QuoteItemProps[]
        totalValue: number;
        enquiryId:EnquiryProps
    }
   