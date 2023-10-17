import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
// import StartTest from "./components/StartTest.jsx";
import Instruction from "./components/Instruction.jsx";
import AssesmentTest from "./components/AssesmentTest.jsx";
import MissingAnswer from "./components/MissingAnswer.jsx";
import MyAccount from "./components/MyAccount.jsx";
import RegisterPage from "./components/RegisterPage.jsx";
import TakeTest from "./components/TakeTest.jsx";
import ReportPage from "./components/ReportPage.jsx";
import CompleteAssessment from "./components/CompleteAssessment.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>} />
      <Route path="Login" element={<Login />} />
      <Route path="RegisterPage" element={<RegisterPage />} />
      <Route path="TakeTest" element={<TakeTest />} />
      {/* <Route path="StartTest" element={<StartTest />} /> */}
      <Route path="Instruction" element={<Instruction />} />
      <Route path="AssesmentTest" element={<AssesmentTest />} />
      <Route path="MissingAnswer" element={<MissingAnswer />} />
      <Route path="MyAccount" element={<MyAccount />}/>
      <Route path="ReportPage" element={<ReportPage />} />
      <Route path="CompleteAssessment" element={<CompleteAssessment />} />
    </Routes>
  </BrowserRouter>                         
);
