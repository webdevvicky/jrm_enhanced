import { useState, useEffect } from "react";

interface LoaderProps {
  isError?: boolean;
}
const Loader = ({ isError }: LoaderProps) => {
  const [showError, setShowError] = useState(false || isError);

  useEffect(() => {
    // Set a timeout to show the error after 15 seconds
    const timeoutId = setTimeout(() => {
      setShowError(true);
    }, 15000);

    // Clear the timeout when the component is unmounted or when the data is loaded successfully
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div
      className="m-5 d-flex justify-content-center align-items-center"
      // style={{ height: "70vh" }}
    >
      {showError ? (
        <div className="alert alert-danger" role="alert">
          Error loading data. Please try again.
        </div>
      ) : (
        <div className="spinner-border text-white" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default Loader;
