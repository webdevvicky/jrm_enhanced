import { useEffect, useState } from "react";

const LogoutOnClose = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleBeforeUnload = (event:any) => {
    // Check if the page is being closed and not just refreshed
    if (event && !isRefreshing) {
      // Perform logout logic here
      localStorage.removeItem("token");
      // Additional cleanup logic, if needed
    }
  };

  useEffect(() => {
    // Set the flag when the page is about to be refreshed
    const handleBeforeRefresh = () => {
      setIsRefreshing(true);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("beforeunload", handleBeforeRefresh);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("beforeunload", handleBeforeRefresh);
    };
  }, [isRefreshing]);

  return null; // This component doesn't render anything
};

export default LogoutOnClose;
