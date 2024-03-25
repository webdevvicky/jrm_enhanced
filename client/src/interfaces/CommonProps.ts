 import { Path, UseFormRegister, FieldValues, ArrayPath, Control, UseFormWatch } from "react-hook-form";

 export interface InputProps<T extends FieldValues> {
  type?: string;
  name: Path<T>;
  placeholder?: string;
  label: string;
  register: UseFormRegister<T>;
  error?: any;
  notRequired?: boolean;
  minlen?: number;
  id?: string;
  maxlen?:number;
  isNumber?:boolean;
  defaultValue?:any
  isDisabled?:boolean
 }



 export interface ArrayInputProps<T extends FieldValues> {
  name: ArrayPath<T>;
  control: Control<T>;
  register: UseFormRegister<T>;
  fields: { name: string; label: string }[];
  multiplyFields?: [string, string];
  error?: any;
  notRequired?: boolean;
  onTotalChange?:(roundedTotal:string)=>void
  watch: UseFormWatch<T>;
  isNumberFields?: Record<string, boolean>;
  isSubtotal?:boolean
}

export interface ArrayField {
  name: string;
  label: string;
  type?:string
}


// floating input props


export interface ValidationRules {
  notRequired?: boolean;
  minlen?: number;
  maxlen?: number;
  isNumber?: boolean;
}

// type FieldNames<T extends Record<string, any>> = NestedFieldNames<T, keyof T>;
// type NestedFieldNames<T extends Record<string, any>, K extends keyof T> =
//   T[K] extends object
//     ? `<span class="math-inline">\{K\}\.</span>{NestedFieldNames<T[K], keyof T[K]>}`
//     : K;

export interface FieldData<T extends Record<string, any>> {
  label: string;
  name:ArrayPath<T>
  type?: string;
  defaultValue?: string;
  validation?: ValidationRules;
}


export interface FloatingInputProps<T extends FieldValues> {
  type?: string;
  name: Path<T>;
  placeholder?: string;
  label: string;
  register: UseFormRegister<T>;
  error?: any;
  validation?: ValidationRules;
  defaultValue?: any;
}




  export interface ProjectOption {
    _id: string 
    projectName: string;
  }

  export interface VendorOption {
    _id: string 
    name: string;
  }

  
  export interface EmployeeOption{
    _id:string;
    empName:string
  }

  // export interface SelectOptions {
  //   value: string;
  //   option: string;
  // }

  
  export  interface FormSelectProps {
      value: any;
      option: string;
    }
    

  export interface SelectProps<T extends FieldValues> {
    options: FormSelectProps[]; 
    name: Path<T>;
    register: UseFormRegister<T>;
    label?: string; 
    emptyLabel?:string
    error: any;
    defaultValue?:any
    notRequired?:boolean
    isDisabled?:boolean
  }
  
 
  











