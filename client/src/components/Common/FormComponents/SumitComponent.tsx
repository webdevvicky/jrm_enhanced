import React, { useState } from "react";

interface SubmitProps {
  btnlable: string;
}

const SubmitComponent: React.FC<SubmitProps> = ({ btnlable }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleButtonClick = () => {
    setIsClicked(true); // Disable the button

    console.log("first");

    setTimeout(() => {
      setIsClicked(false); // Re-enable the button after 20 seconds
    }, 15000);
  };

  return (
    <div className="container py-3">
      <button
        type="submit"
        className="btn form-control text-white fs-5"
        style={{ backgroundColor: "#151e59" }}
        onSubmit={handleButtonClick}
        disabled={isClicked}
      >
        {!isClicked && btnlable}
        {isClicked && (
          <div className="spinner-border text-white" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </button>
    </div>
  );
};

export default SubmitComponent;
