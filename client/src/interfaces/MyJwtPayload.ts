import { JwtPayload } from "jwt-decode";

interface MyJwtPayload extends JwtPayload {
    role: string;
    id: string;
    allowedRoutes:string[]
    exp: number;
    iat: number;
  }
  
  export default MyJwtPayload