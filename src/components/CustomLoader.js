import React from "react";
import { Oval } from "react-loader-spinner";

const CustomLoader = ({ message = "Loading..." }) => {
  return (
    <div className="custom-loader-overlay">
      <div className="custom-loader-container" style={{ textAlign: "center" }}>
        <Oval
          height={60}
          width={60}
          color="blue"
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="white"
          strokeWidth={4}
          strokeWidthSecondary={2}
        />
        <p className="custom-loader-message" style={{ marginTop: "10px", marginLeft: "-27px" }}>
          {message}
        </p>
      </div>
    </div>
  );
};

export default CustomLoader;
