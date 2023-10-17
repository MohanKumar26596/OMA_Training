import React, { useState } from "react";
import "../reusableComponents/Header.css";
import Logo from "../assets/images/logo.png";
import MenuBtn from "../assets/images/menu.png";
import CloseBtn from "../assets/images/closeBtn.png";
import { useNavigate, useLocation } from 'react-router-dom';

function Header() {
  const [toggle, setToggle] = useState(true);
  const [logout, setLogout] =  useState(false);

  const handleLogout = () => {
    console.log("Logging out..");

    const cacheKey = "formValuesCache";
    caches.open(cacheKey).then ((cache) => {
      cache.delete (cacheKey).then (() => {
        console.log("Cache cleared scuccessfully..");

        setLogout(true);
        setTimeout(() => {
          setLogout(false);
          navigate("/Login");
        },2000);
      })
    })
  }

  const navigate = useNavigate();
  const location = useLocation();

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  const goToReportPage = () => {
    navigate("/ReportPage");
    console.log("reportpage");
  }
  const goToTakeTest = () => {
    navigate("/TakeTest");
    console.log("taketest");
  }

  const goToMyAccount  = () => {
    navigate("/MyAccount");
    console.log("myaccount");
  }
  
  return (
    <>
     {logout && (
        <div className="popup success show">
          <p>Logout Successfully !!</p>
        </div>
      )}
      <div className="header">
        <div className="header-Left">
          <img src={Logo} className="logo-Pic" />
        </div>
        <div className="header-Right">
          <h5 className={`page-Name ${location.pathname === '/TakeTest' ? 'active' : ''}`} onClick={() => goToTakeTest()}>Test</h5>
          <h5 className={`page-Name ${location.pathname === '/ReportPage' ? 'active' : ''}`} onClick={() => goToReportPage()}>Report</h5>
          <h5 className={`page-Name ${location.pathname === '/MyAccount' ? 'active' : ''}`} onClick={() => goToMyAccount()}>My Account</h5>
          <button className="logout-Btn"  onClick={handleLogout}>Log Out</button>

          <div className="navbar">
            <img
              src={toggle ? MenuBtn : CloseBtn}
              className="menu-Btn"  
              onClick={handleToggle}
            />
            {/* <img src={CloseBtn} className='close-Btn'   /> */}
          </div>
        </div>
      </div>
      {!toggle ? (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "83vh",
            background: "#00737F",
            zIndex:1,
          }}
          className="menu-Bar"
        >
          <h5 className={`head-Name ${location.pathname === '/TakeTest' ? 'active' : ''}`} onClick={() => goToTakeTest()}>Test</h5>
          <h5 className={`head-Name ${location.pathname === '/ReportPage' ? 'active' : ''}`} onClick={() => goToReportPage()}>Report</h5>
          <h5 className={`head-Name ${location.pathname === '/MyAccount' ? 'active' : ''}`} onClick={() => goToMyAccount()}>My Account</h5>
          <button className="navbar-Logout" onClick={handleLogout}>Log Out</button>
        </div>
      ) : null}
    </>
  );
}

export default Header;
