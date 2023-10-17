import React, { useState } from "react";
import Header from "../reusableComponents/Header";
import CompleteTick from "../assets/images/completeTick.png";
import "../casecading/CompleteAssessment.css";
import { useNavigate } from "react-router-dom";
import ReportPage from "./ReportPage";

function CompleteAssessment() {
  const navigate = useNavigate();
  const [showResultPage, setShowResultPage] = useState(false);

  const handleViewResults = () => {
    setShowResultPage(true);
    setShowCompletePopup(true);
    navigate("/ReportPage");
  };

  return (
    <div className="assesment-Complete">
      {showResultPage && <ReportPage />}
      <Header />
      <div className="assesement-Body">
        <div className="assesment-Box">
          <img src={CompleteTick} className="complete-Tick" />
          <h4 className="assesment-Head">Assessment Complete</h4>
          <p className="assesment-Para">
            Thank you for completing your assessment. You can view your results
            in your Account area or by clicking the button below.
          </p>
          <button className="result-Btn" onClick={() => handleViewResults()}>
            View Results
          </button>
        </div>
      </div>
    </div>
  );
}

export default CompleteAssessment;
