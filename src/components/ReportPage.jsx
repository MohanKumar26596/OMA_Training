import React from "react";
import "../casecading/ReportPage.css";
import Header from "../reusableComponents/Header";
import ArrangeArrow from "../assets/images/arrowupdown.png";
import Pdf from "../assets/images/downloadpdf.png";

function ReportPage() {
  return (
    <div className="report-Page">
      <Header />
      <div className="reports-Box">
        <h4 className="report-Head">Your Reports</h4>
        <div className="table-Box">
        <table className="report-Table">
          <thead className="table-Head">
            <th>
              Status <img className="arrange-Arrow" src={ArrangeArrow} />
            </th>
            <th>
              Test Sent <img className="arrange-Arrow" src={ArrangeArrow} />
            </th>
            <th>
              Complete <img className="arrange-Arrow" src={ArrangeArrow} />
            </th>
            <th>
              Report <img className="arrange-Arrow" src={ArrangeArrow} />
            </th>
            <th>
              Download <img className="arrange-Arrow" src={ArrangeArrow} />
            </th>
          </thead>
          <tbody className="table-Body">
            <tr className="table-Rows">
              <td>In Progress</td>
              <td>28.02.2023</td>
              <td>Complete Test</td>
              <td>link.com/applikationjck</td>
              <td>
                <img src={Pdf} className="pdf-Image" />
              </td>
            </tr>
            <tr className="table-Rows">
              <td>Not Started</td>
              <td>28.02.2023</td>
              <td>Start Test</td>
              <td>link.com/applikationjck</td>
              <td>
                <img src={Pdf} className="pdf-Image" />
              </td>
            </tr>
            <tr className="table-Rows">
              <td>Complete</td>
              <td>28.02.2023</td>
              <td>28.02.2023</td>
              <td>link.com/applikationjck</td>
              <td>
                <img src={Pdf} className="pdf-Image" />
              </td>
            </tr>
            <tr className="table-Rows">
              <td>Complete</td>
              <td>28.02.2023</td>
              <td>28.02.2023</td>
              <td>link.com/applikationjck</td>
              <td>
                <img src={Pdf} className="pdf-Image" />
              </td>
            </tr>
            <tr className="table-Rows">
              <td>Complete</td>
              <td>28.02.2023</td>
              <td>28.02.2023</td>
              <td>link.com/applikationjck</td>
              <td>
                <img src={Pdf} className="pdf-Image" />
              </td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}

export default ReportPage;
