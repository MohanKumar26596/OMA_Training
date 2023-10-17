import React from "react";
import "../casecading/Instruction.css";
import AppLogo from "../assets/images/appLogo.png";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../reusableComponents/Header";

function Instruction() {
  const navigate = useNavigate();
  const location = useLocation();
  const categoryId = location.state && location.state.categoryId;

  const goToAssessmentTest = () => {
    const {categoryId,accessToken} = location.state;
    navigate("/AssesmentTest", { state: { categoryId, accessToken } });
    console.log("Navigating categoryId to Assessment Test page..", {
      state: { categoryId, accessToken },
    });
  };
  
  return (
    <div className="Custom-Instruct">
      <Header />
      <div className="instruct-Box">
        <div className="instruct-Content">
          <img src={AppLogo} className="app-Logo" />
          <h4 className="instruct-Head">Instructions</h4>
          <p className="instruct-Para">
            1. Find a time and place where you will not be interrupted <br />
            2. Complete the assessment in one sitting <br />
            3. Do not use the “Back” button on your browser
          </p>
          <p className="instruct-Para">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
        </div>
        <div className="continue-Btn">
          <button onClick={() => goToAssessmentTest()} className="continue-Btn">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default Instruction;
