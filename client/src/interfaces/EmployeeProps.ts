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
    accountNumber:number,
    ifsc:string,
    gpay:number
  }

  interface PersonalDetails{
    fatherName?: string;
    fatherPhoneNumber?: number;
    motherName:string,
    motherPhoneNumber:number;
  }
  
  interface Employee {
    _id:string;
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
    personalDetails:PersonalDetails;
    address?: string;
    salaryDetails?: SalaryDetails;
    accountDeatails:AccountDetails;
    idProofDetails:IdProofDeatils;
    selectedOptions: { value: string; label: string }[];
    allowedRoutes:string[];
    role: 'admin' | 'generalmanager' | 'projectmanager' |'leadarchitech'| 'architech' | 'coordinater' | 'siteengineer' | 'marketting'|'others';
    designation?: string;
    department?:string;
    profilePicture?: string;
    password?: string;
  }