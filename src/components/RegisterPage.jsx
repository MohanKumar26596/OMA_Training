import React, { useState } from "react";
import "../casecading/RegisterPage.css";
// import Google from '../assets/images/google.png'
import Logo from "../assets/images/logo.png";
import EyeClose from "../assets/images/eye-Close.svg";
import EyeOpen from "../assets/images/eye-Open.svg";
import { useNavigate } from "react-router-dom";
import Api from "./BaseURL";
import RegisterValidation from "../reusableComponents/RegisterValidation";

function RegisterPage() {
  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formSuccess, setFormSuccess] = useState(false);
  const [formFail, setFormFail] = useState(false);
  const [registerFail,setRegisterFail] = useState(false);
  const errors = {};
  const [authToken,setAuthToken] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFormErrors = RegisterValidation(formValues);
    setFormErrors(newFormErrors);

    if (Object.keys(newFormErrors).length === 0) {
      const credentials = {
        username: formValues.username,
        email: formValues.email,
        password: formValues.password,
      };
      console.log("Registratoin submitted with values:", formValues);

      Api.post("user/register", credentials)
        .then((response) => {
          console.log("Complete Api Response :", response.data);

          const cacheKey = "formValuesCache";
          const formValuesCache = {
            username: formValues.username,
            email: formValues.email,
            password: formValues.password,
            token: response.data.accessToken,
          };

          caches.open(cacheKey).then((cache) => {
            cache.put(cacheKey, new Response(JSON.stringify(formValuesCache)));
          });

          if (formValues.username && formValues.email && formValues.password) {
            const token = response.data.accessToken;
            setAuthToken(token);
            setFormSuccess(true);
            setTimeout(() => {
              setFormSuccess(false);
              navigate("/TakeTest", {state :{accesToken: token}});
            }, 2000);
            console.log("Navigating to Take Test page with Register token", {token});
          } else {
            console.log("Username, Email and Password are missing !!");
            return errors;
          }
        })
        .catch((error) => {
          console.error("Error during Registration :", error);
          setRegisterFail(true);
          setTimeout(() =>{
            setRegisterFail(false);
          },2000);
        });
    } else {
      console.log("Registration has errors. Please fix it...");
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

  const goToLogin = () => {
    navigate("/Login");
    console.log("login");
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
            {/* <div className='greet-Option'>
                        <div className='line'></div>
                        <p>or</p>
                        <div  className='line'></div>
                    </div> */}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input">
              <input
                type="text"
                name="username"
                value={formValues.username}
                onChange={handleInputChange}
                placeholder="Username"
                className="input-Field"
              ></input>
            </div>
            <p className="input-Alert">{formErrors.username}</p>
            <div className="input">
              <input
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="input-Field"
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
              ></input>
              <img
                className="eyeClose"
                src={showPassword ? EyeClose : EyeOpen}
                onClick={handleTogglePassword}
              />
            </div>
            <p className="input-Alert">{formErrors.password}</p>
            <button type="submit" className="Login-Btn">
              Sign Up
            </button>
            <div className="signin-Text">
              <p className="already-Account">Already have an account?</p>
              <p onClick={() => goToLogin()} className="Signup-Here">
                Sign in here
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
          <p className="popup-Text">Registration Successful !!</p>
        </div>
      )}
      {formFail && (
        <div className="popup fail show">
          <p className="popup-Text">Your Registration have error !!</p>
        </div>
      )}
      {registerFail && (
        <div className="popup fail show">
          <p className="popup-Text">Email already exist !!</p>
        </div>
      )}
    </div>
  );
}

export default RegisterPage;
