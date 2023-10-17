import React from "react";
import "../casecading/MissingAnswer.css";
import alertImg from "../assets/images/alert.png";

function MissingAnswer({ onClose }) {
  const handlePopupClose = () => {
    onClose("AssesmentTest");
  };

  return (
    <div className="missing-Answer">
      <div className="popup-Alert">
        <span className="alert-Logo">
          <img src={alertImg} className="alert-Img" />
        </span>
        <h4>Missing Answers</h4>
        <p>You must answer all questions on this page before pressing ‘Next’</p>
        <button className="confirm-Btn" onClick={handlePopupClose}>
          Confirm and Continue
        </button>
      </div>
    </div>
  );
}

export default MissingAnswer;
