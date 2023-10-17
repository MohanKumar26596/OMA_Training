import { useEffect, useState } from "react";
import "../casecading/AssesmentTest.css";
import "../reusableComponents/TaskOption.css";
import Header from "../reusableComponents/Header";
import AppLogo from "../assets/images/appLogo.png";
import { useLocation, useNavigate } from "react-router-dom";
import MissingAnswer from "./MissingAnswer";
import CompleteAssessment from "./CompleteAssessment";
import Api from "./BaseURL";

export function AssesmentTest() {
  const location = useLocation();
  const categoryId = location.state && location.state.categoryId;
  const accessToken = location.state && location.state.accessToken;
  const [totalQuesitonPages, setTotalQuestionPages] = useState(0);
  const [questions, setQuestions] = useState([]);
  const totalQuestions = questions.length || 0;
  const totalTests = Math.ceil(totalQuestions / 5);
  const [currentTest, setCurrentTest] = useState(1);
  const [token, setToken] = useState("");
  const [selectedOption, setSelectedOption] = useState(
    Array(totalQuestions).fill("")
  );
  const [showCompletePopup, setShowCompletePopup] = useState(false);
  const [showIncompletePopup, setShowIncompletePopup] = useState(false);
  const [totalMarks, setTotalMarks] = useState(0);
  const isTestCompleted = () => {
    const currentTestOptions = selectedOption.slice(
      (currentTest - 1) * 5,
      currentTest * 5
    );
    return currentTestOptions.every((option) => option !== null);
  };
  const navigate = useNavigate();
  const [hoveredQuestionIndex, setHoverQuestionIndex] = useState(null);

  useEffect(() => {
    caches.open("formValuesCache").then((cache) => {
      caches.match("formValuesCache").then((response) => {
        if (response) {
          response.json().then((data) => {
            const { token: token } = data;
            setToken(token);
            console.log(token);

            if (token) {
              const headers = {
                Authorization: `Bearer ${token}`,
              };
              console.log({ headers });

              const fetchQuestions = async () => {
                try {
                  if ((categoryId, { headers })) {
                    const response = await Api.get(`question/${categoryId}`, {
                      headers,
                    });
                    // console.log("API Response Questions :", response.data);
                    if (response.status === 200 && response.data) {
                      setQuestions(response.data);
                      setTotalQuestionPages(response.data.length);
                      setSelectedOption(Array(response.data.length).fill(null));
                      // console.log("API Response data of CategoryId:", response.data);
                    } else {
                      console.error(
                        "API reponse does not contain data porperty..",
                        response.message
                      );
                    }
                  }
                } catch (error) {
                  console.log("Error fetching questopns :", error);
                }
              };
              if (categoryId) {
                fetchQuestions();
              }
            }
          });
        }
      });
    });
  }, [categoryId]);

  const handleClickOption = (questionIndex, optionIndex) => {
    const allQuestionIndex = questionIndex + (currentTest - 1) * 5;
    setSelectedOption((prevSelectedOption) => {
      const newSelectedOptions = [...prevSelectedOption];
      newSelectedOptions[allQuestionIndex] = optionIndex;
      return newSelectedOptions;
    });
  };
  const handleBack = () => {
    if (currentTest > 1) {
      setCurrentTest(currentTest - 1);
    }
  };

  const calculateTotalMarks = () => {
    let total = 0;
    selectedOption.forEach((option, index) => {
      const questionIndex = Math.floor(index / 5);
      const optionIndex = index % 5;
      if (questions[questionIndex] && questions[questionIndex].answers) {
        const answer = questions[questionIndex].answers[optionIndex];
        if (option !== null && answer) {
          total += answer.mark;
        }
      }
    });
    setTotalMarks(total);
    console.log("Total Marks :", total);
    return total;
  };

  useEffect(() => {
    const unansweredCurrentQuestion = selectedOption
      .slice((currentTest - 1) * 5, currentTest * 5)
      .some((option) => option === "");

    if (unansweredCurrentQuestion) {
      setShowIncompletePopup(true);
    } else {
      setShowCompletePopup(false);
    }
  }, [currentTest, selectedOption]);

  const handleNextTest = () => {
    if (isTestCompleted()) {
      if (currentTest < totalTests) {
        setCurrentTest(currentTest + 1);
        console.log(setSelectedOption);
      } else {
        calculateTotalMarks();
        setShowCompletePopup(true);
      }
    } else {
      setShowIncompletePopup(true);
    }
  };

  const handlePopupClose = () => {
    setShowCompletePopup(false);
    setShowIncompletePopup(false);
  };

  const calculateTotalAnswered = () => {
    const answeredQuestions = selectedOption.filter(
      (option) => option !== null
    );
    const answerPercentage =
      (answeredQuestions.length / questions.length) * 100;
    return answerPercentage;
  };

  // // CONSOLE MY DATAS
  console.log("selectedOption are", selectedOption);

  return (
    <div className="assessment-Page">
      {showIncompletePopup && (
        <MissingAnswer
          onClose={() => setShowIncompletePopup(false)}
          onContinue={() => handlePopupClose()}
        />
      )}
      {showCompletePopup && <CompleteAssessment />}
      <Header />
      <div className="appBody">
        <div className="app-BodyHeader">
          <div className="app-BodyNavbar">
            <button className="back-Btn" onClick={handleBack}>
              Back
            </button>
            <img src={AppLogo} className="app-Logo" />
            <button className="nextBtn" onClick={handleNextTest}>
              Next
            </button>
          </div>
          <div className="scroll-Box">
            <div className="scroll-Bar">
              <div
                className="filler"
                style={{ width: `${calculateTotalAnswered()}%` }}
              ></div>
            </div>
          </div>
        </div>
        <div className="body-Task">
          {questions &&
            questions
              .slice((currentTest - 1) * 5, currentTest * 5)
              .map((question, questionIndex) => {
                const isQuestionHovered =
                  hoveredQuestionIndex === questionIndex;
                return (
                  <div
                    className={`body-Task1 ${
                      isQuestionHovered ? "hovered" : ""
                    }`}
                    key={question._id}
                    onMouseEnter={() => setHoverQuestionIndex(questionIndex)}
                    onMouseLeave={() => setHoverQuestionIndex(null)}
                  >
                    <p>{question.question}</p>
                    <div className="options">
                      {question.answers.map((ans, optionIndex) => {
                        return (
                          <div key={optionIndex}>
                            <button
                              className={`option-Btns ${
                                selectedOption[
                                  questionIndex + (currentTest - 1) * 5
                                ] === optionIndex
                                  ? "selected"
                                  : ""
                              }`}
                              onClick={() =>
                                handleClickOption(questionIndex, optionIndex)
                              }
                            >
                              {ans.option}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
}

export default AssesmentTest;
