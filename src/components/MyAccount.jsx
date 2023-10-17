import React, { useEffect, useState } from "react";
import Header from "../reusableComponents/Header";
import EyeClose from "../assets/images/eye-Close.svg";
import EyeOpen from "../assets/images/eye-Open.svg";
import "../casecading/MyAccount.css";
import Api from "./BaseURL";

function MyAccount() {
  const [isEditing, setIsEditing] = useState(false);
  const [editInputField, setEditInputField] = useState(null);
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState("");

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

              const fetchData = async () => {
                try {
                  const response = await Api.get("user/getUser", { headers });
                  setUserData(response.data);
                  console.log("adss", response.data);
                } catch (error) {
                  console.error("Fetching in error");
                }
              };
              fetchData();
            }
          });
        }
      });
    }, []);
  }, []);

  console.log("Updated UserData is", { userData });

  const handleEditClick = (fieldName) => {
    setIsEditing(true);
    setEditInputField(fieldName.toLowerCase());
  };

  const fieldEdit = (fieldName) => {
    return (
      isEditing &&
      editInputField &&
      editInputField.toLowerCase() === fieldName.toLowerCase()
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevDate) => ({
      ...prevDate,
      [name]: value,
    }));
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    console.log(userData);
    try {
      const response = await caches.match("formValuesCache");

      if (response) {
        const data = await response.json();
        console.log("Token for updation :", { data });
        const { token } = data;
        setToken(token);

        if (token) {
          const headers = {
            Authorization: `Bearer ${token}`,
          };
          console.log("Headers is ", { headers });

          const updateResponse = await Api.put("user/updateUser", userData, {
            headers,
          });
          console.log("dddd");
          if (updateResponse.status === 200) {
            console.log("yui");
            setIsEditing(false);
            console.log("UpdateResponse", updateResponse);
            console.log("Updates data Successfully..!!", userData);
          } else {
            console.error(
              "Error updating during userData.status :",
              updateResponse.status
            );
          }
        }
      }
    } catch (error) {
      console.error("Error Updating UserData", error);
    }
  };

  return (
    <div className="myAccount-Page">
      <Header />

      <div className="account-Body">
        <div className="account-Box">
          <h4 className="account-Name">
            {userData.firstname} {userData.lastname}
          </h4>
          <p className="account-Date">Joined: 28.02.2023</p>

          <form className="account-Login">
            <div className="field-1">
              <div className="login-InputField">
                <div className="login-Label">
                  <h6 className="label-Head">First Name</h6>
                  <p
                    className="label-Edit"
                    onClick={() => handleEditClick("firstname")}
                  >
                    Edit
                  </p>
                </div>
                <input
                  type="text"
                  className="login-Input"
                  name="firstname"
                  value={userData.firstname}
                  onChange={handleInputChange}
                  readOnly={!fieldEdit("firstname")}
                />
              </div>

              <div className="login-InputField">
                <div className="login-Label">
                  <h6 className="label-Head">Last Name</h6>
                  <p
                    className="label-Edit"
                    onClick={() => handleEditClick("lastname")}
                  >
                    Edit
                  </p>
                </div>
                <input
                  type="text"
                  className="login-Input"
                  name="lastname"
                  value={userData.lastname}
                  onChange={handleInputChange}
                  readOnly={!fieldEdit("lastname")}
                />
              </div>
            </div>

            <div className="field-1">
              <div className="login-InputField">
                <div className="login-Label">
                  <h6 className="label-Head">Email</h6>
                  <p
                    className="label-Edit"
                    onClick={() => handleEditClick("email")}
                  >
                    Edit
                  </p>
                </div>
                <input
                  type="email"
                  className="login-Input"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  readOnly={!fieldEdit("email")}
                />
              </div>

              <div className="login-InputField">
                <div className="login-Label">
                  <h6 className="label-Head">Password</h6>
                  <p
                    className="label-Edit"
                    onClick={() => handleEditClick("password")}
                  >
                    Edit
                  </p>
                </div>
                <div className="input-Box">
                  <input
                     type={showPassword ? "text" : "password"}
                    className="login-Password"
                    name="password"
                    value={userData.password}
                    onChange={handleInputChange}
                    readOnly={!fieldEdit("password")}
                  />
                  <img
                    className="eye-Open"
                    src={showPassword ? EyeClose : EyeOpen}
                    onClick={handleTogglePassword}
                  />
                </div>
              </div>
            </div>

            <div className="field-2">
              <button className="save-Btn" onClick={handleSaveChanges}>
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
