import { jwtDecode } from "jwt-decode";
import MyJwtPayload from "../interfaces/MyJwtPayload";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useTokenNavigationEffect = () => {
    const navigate = useNavigate();
    useEffect(() => {
      const handleTokenNavigation = () => {
        const token = localStorage.getItem('token');
  
        try {
          const decoded = token ? (jwtDecode(token) as MyJwtPayload) : null;
          const isTokenExpired = decoded?.exp && decoded.exp * 1000 < Date.now();
  
          // Use the setAllowedRoutes or any other logic from your original useEffect
          // setAllowedRoutes(decoded?.allowedRoutes);
  
          if (!token || isTokenExpired) {
            navigate('/login');
          }
        } catch (error) {
          console.error('Error decoding token:', error);
          navigate('/login');
        }
      };
  
      // Invoke the handleTokenNavigation function
      handleTokenNavigation();
    }, [navigate]);
  };


 
  export const getDecodedToken = (): MyJwtPayload | null => {
    const token = localStorage.getItem('token');
  
    try {
      const decodedToken = token ? jwtDecode(token) as MyJwtPayload : null;
  
      // Check if the token is expired
      const isTokenExpired = decodedToken?.exp && decodedToken.exp * 1000 < Date.now();
  
      return isTokenExpired ? null : decodedToken;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };


  
  export const isLoggedIn = (): boolean => {
    const token = getDecodedToken()
    return Boolean(token);
  };


  export const getAllowedRoutes = (): string[] => {
    const approvedRoutes = getDecodedToken()?.allowedRoutes || [];
    return approvedRoutes;
  };

  
  export const getUserRole = (): string | null => {
    const decodedToken = getDecodedToken();
    return decodedToken?.role || null;
  };
  


  export const isAdmin = (): boolean => getUserRole() === 'admin';


  export const isGeneralmanager = (): boolean => getUserRole() === 'generalmanager';


  export const isProjectManager = (): boolean => getUserRole() === 'projectmanager';


  export const hasVerifyAuth = (): boolean => {
    const role = getUserRole();
    return role === 'admin' || role === 'generalmanager' || role === 'projectmanager';
  };


  export const hasEditAuth = (): boolean => {
    const role = getUserRole();
    return role === 'isAdmin' || role === 'generalmanager' || role === 'projectmanager';
  };
  

 

 
