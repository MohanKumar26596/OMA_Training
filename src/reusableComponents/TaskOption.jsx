import React, { useState } from "react";
import "../reusableComponents/TaskOption.css";
import data from "../assets/json/question.json";

function TaskOption() {
  const { questions } = data;
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option, mark) => {
    setSelectedOption(option);
    onSelect(mark);
  };

  return (
    <div className="body-Task1" >
      <p>Once I'm on track, I don't like to change direction.</p>
     
      <div className="options">
      {questions.answers.map((answer) => (
        <button
          key={answer.option}
          className={`option-Btns ${
            selectedOption === answer.option ? "selected" : ""
          }`}
          onClick={() => handleOptionClick(answer.option, answer.mark)}
          disabled={selectedOption !== null}
        >
         {answer.option}
        </button>
      ))}
        <button className="option-Btns">2 Not often like me</button>
        <button className="option-Btns">3 Somewhat like me</button>
        <button className="option-Btns">4 Generally like me</button>
        <button className="option-Btns">5 Almost always like me</button>
      </div>
    </div>
  );
}

export default TaskOption;
