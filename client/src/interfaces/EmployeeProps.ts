interface IncrementDetail {
    incrementDate: Date;
    incrementAmount: number;
  }
  
  interface SalaryDetails {
    currentSalary?: number;
    incrementDetails?: IncrementDetail[];
  }

  interface IdProofDeatils{
    idType:string,
    idNumber:String
  }
  interface AccountDetails{
    AccountNumber:number,
    ifsc:string,
    gpay:number
  }
  
  interface Employee {
    _id:string
    name: string;
    email: string;
    mobileNumber: number;
    alternateMobileNumber?: number;
    employeeId: string;
    joiningDate: string;
    endDate?: string;
    active: boolean;
    dateOfBirth?: string;
    bloodGroup?: string;
    fatherName?: string;
    fatherPhoneNumber?: number;
    motherName:string,
    motherPhoneNumber:number
    address?: string;
    salaryDetails?: SalaryDetails;
    accountDeatails:AccountDetails;
    idProofDetails:IdProofDeatils
    role: 'admin' | 'generalmanager' | 'projectmanager' | 'architech' | 'coordinater' | 'siteengineer' | 'marketting';
    designation?: string;
    department?:string
    profilePicture?: string;
    password?: string;
  }