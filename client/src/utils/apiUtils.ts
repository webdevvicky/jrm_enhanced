
// apiUtils.ts
import { AxiosError } from 'axios';

interface CustomError {
  response?: {
    status: number;
    data: {
      message: string;
    };
  };
  request?: any;
  message?: string;
  error?:string
}

export const handleApiError = (error: AxiosError<CustomError>): void => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    window.alert(`Error: ${error.response.status} - ${error.response.data.message || error.response.data.error}`);
    console.log("Server Error", error.response.data);
  } else if (error.request) {
    // The request was made but no response was received
    window.alert("No response from the server");
    console.log("Request Error", error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    window.alert("An error occurred while processing your request");
    console.log("Error", error.message);
  }
};
