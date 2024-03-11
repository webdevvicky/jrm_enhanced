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
   movedToBook:boolean
    }

interface Remarks{
        date:string,
        comment:string
    }

    interface EnquiryProps extends NewEnquiryProps{
        createdAt:string,
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
        isRejected:boolean
        items: QuoteItemProps[]
        totalValue: number;
        enquiryId:EnquiryProps
    }
   

    interface BookingMoved{
        _id:string
        name:string,
        location:string,
        fileNumber:number,
        mobileNumber:number,
        email:string

    }