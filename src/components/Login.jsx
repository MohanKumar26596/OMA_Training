import React, { useRef, useState } from "react";
import "../casecading/Login.css";
// import Google from '../assets/images/google.png'
import Logo from "../assets/images/logo.png";
import EyeClose from "../assets/images/eye-Close.svg";
import EyeOpen from "../assets/images/eye-Open.svg";
import { useNavigate } from "react-router-dom";
import Api from "./BaseURL";
import LoginValidation from "../reusableComponents/LoginValidation";

function Login() {
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const errors = {};
  const data = useRef(formValues);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formFail, setFormFail] = useState(false);
  const [authToken,setAuthToken] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFormErrors = LoginValidation(formValues);
    setFormErrors(newFormErrors);

    if (Object.keys(newFormErrors).length === 0) {
      const credentials = {
        email: formValues.email,
        password: formValues.password,
      };
      console.log("Login submitted with values :", formValues);

      Api.post("user/login", credentials)
        .then((response) => {
          console.log("Complete API Response :", response.data);

          const cacheKey = "formValuesCache";
          const formValuesCache = {
            email: formValues.email,
            password: formValues.password,
            token: response.data.token,
          };

          caches.open(cacheKey).then((cache) => {
            cache.put(cacheKey, new Response(JSON.stringify(formValuesCache)));
          });

          if (formValues.email && formValues.password) {
            const token = response.data.token;
            setAuthToken(token);
            setFormSuccess(true);
            setTimeout(() => {
              setFormSuccess(false);
              navigate("/TakeTest", {token});
            }, 2000);
            console.log("Navigating to Take Test page with login token", {token});
          } else {
            console.log("Email and Password is missing !!");
            return errors;
          }
        })
        .catch((error) => {
          console.error("Error during Login :", error);
        });
    } else {
      console.log("Login has errors. Please fix it..");
      console.log(data.current, "input data");
      setFormFail(true);
      setTimeout(() => {
        setFormFail(false);
      }, 2000);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const goToRegisterPage = () => {
    navigate("/RegisterPage");
    console.log("registerpage");
  };
  console.log(errors);

  return (
    <div className="container">
      <div className="login">
        <div className="logo">
          <img src={Logo} className="logo-Img" />
        </div>
        <div className="login-Content">
          <div className="greeting">
            <h4>Welcome</h4>
            <p className="greet-Inform">
              Please input your details to access the assessment.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="form">
            <div className="input">
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
                className="input-Field"
                ref={data}
              ></input>
            </div>
            <p className="input-Alert">{formErrors.email}</p>
            <div className="input">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={formValues.password}
                onChange={handleInputChange}
                className="input-Field"
                ref={data}
              ></input>
              <img
                className="eyeClose"
                src={showPassword ? EyeClose : EyeOpen}
                onClick={handleTogglePassword}
              />
            </div>
            <p className="input-Alert">{formErrors.password}</p>
            <div className="forgot">
              <p>Forgot Password</p>
            </div>
            <button
              type="submit"
              className="login-Btn"
              // onClick={() => goToStartTest()}
            >
              Log In
            </button>
            <div className="signup-Text">
              <p className="no-Account">Don’t have an account?</p>
              <p onClick={() => goToRegisterPage()} className="free-Signup">
                Sign up for free
              </p>
            </div>
          </form>
        </div>
      </div>

      <div className="image">
        <div className="content">
          <h5>
            We’re proud to be recognised as one of the top leadership
            development consultancies in the world.
          </h5>
          <br />
          <p>
            Our programmes break down preconceptions and help people to rebuild
            from the foundations up. <br />
            This isn’t just a training programme – it’s an experience that
            challenges and reinforces our self- belief, with enduring impact.
          </p>
        </div>
      </div>
      {formSuccess && (
        <div className="popup success show">
          <p className="popup-Text">Login Successful !!</p>
        </div>
      )}
      {formFail && (
        <div className="popup fail show">
          <p className="popup-Text">Your Login have errors !!</p>
        </div>
      )}
    </div>
  );
}

export default Login;
