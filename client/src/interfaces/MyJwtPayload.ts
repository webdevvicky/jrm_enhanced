import { JwtPayload } from "jwt-decode";

interface MyJwtPayload extends JwtPayload {
    role: string;
    userId: string;
    userCredId: string;
    exp: number;
    iat: number;
  }
  
  export default MyJwtPayload