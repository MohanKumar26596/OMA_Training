import React, { useEffect, useState } from "react";
import Header from "../reusableComponents/Header";
import "../casecading/TakeTest.css";
import DropUp from "../assets/images/dropup.png";
import DropDown from "../assets/images/dropdown.png";
import { useLocation, useNavigate } from "react-router-dom";
import Api from "./BaseURL";

function TakeTest() {
  const [categories, setCategories] = useState([]);
  const [openStates, setOpenStates] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const {state : navigateState} = location;
  const token = navigateState?.accessToken || "";
  const [getToken, setGetToken] = useState("");
  console.log(categories);

  useEffect(() => {
    caches.open("formValuesCache").then((cache) => {
      caches.match("formValuesCache").then((response) => {
        console.log("hi");
        if (response) {
          response.json().then((data) => {
            const { token } = data;
            console.log("Token from CachecStorage is",token);
            
            if (token) {
              setGetToken(token);
              const headers = {
                Authorization: `Bearer ${token}`,
              };
              console.log({ headers });
              
              Api.get("category/", { headers })
              .then((response) => {
                setCategories(response.data);
                console.log(
                  "API Response Data of all Categories :",
                  response.data
                  );
                  console.log("Getting token fron Login :", { token });
                })
                .catch((error) => {
                  console.error("Error in fetching categories :", error);
                });
            };
          });
        }
      });
    });
  }, []);

  const toggleDropdown = (categoryId) => {
    setOpenStates((prevStates) => {
      return {
        ...prevStates,
        [categoryId]: !prevStates[categoryId],
      };
    });
  };
  
  const goToInstruction = (category) => {
    const categoryId = category._id;
    if (categoryId) {
      navigate("/Instruction", {
        state: { categoryId, category, accessToken: getToken },
      });
      console.log("Navigating my Selected categoryId to Instruction Page..", {
        categoryId,
        category,
        getToken
      });
    } else {
      console.error("CategoryId is not defined.");
      console.log(error);
    }
  };

  return (
    <div className="take-Test">
      <Header />
      <div className="takeTest-Body">
        <h4 className="test-Head">Take Your Personalized Test</h4>
        {categories.map((category) => (
          <div key={category._id} className="test-Category">
            <div className="assesment-Test">
              <div className="assesment-1">
                <img
                  onClick={() => toggleDropdown(category._id)}
                  className="dropDown-Icon"
                  src={!openStates[category._id] ? DropDown : DropUp}
                />
                <h6 className="assesmentTest-Head">
                  {category.category} Assesment Test
                </h6>
              </div>
              <button
                className="startTest-Btn"
                onClick={() => goToInstruction(category)}
              >
                Start Test
              </button>
            </div>
            {openStates[category._id] && (
              <p key={category._id} className="about-Test">
                {category.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TakeTest;
