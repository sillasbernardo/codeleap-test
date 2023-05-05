import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Login.scss";
import Input from "../../components/Utils/Input/Input";
import Button from "../../components/Utils/Button/Button";

const Login = () => {
  // Gray out button if empty
  const [inputUsername, setInputUsername] = useState("");

  const navigate = useNavigate();

  // Handle input value
  const inputValueHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;

    setInputUsername(val);
  }

  // Handle login btn
  const loginBtnHandler = () => {
    const user = {
      id: Math.random(),
      username: inputUsername
    }

    // Save user section on session storage
    sessionStorage.setItem("loginId", JSON.stringify(user));

    // Navigate to feed
    navigate("/feed");
  };

  useEffect(() => {
    const userLoginSession = sessionStorage.getItem("loginId");

    if (userLoginSession){
      navigate("/feed");
    }
  }, [])

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter"){
      loginBtnHandler()
    }
  }

  return (
    <div className="login__container">
      <div className="login__item">
        <h2>Welcome to CodeLeap network!</h2>
        <Input onKeyDown={handleKeyPress} onChange={inputValueHandler} title="Please enter your username" placeholder="John doe" />
        <Button disabled={!inputUsername} className="login__btn" color={inputUsername ? "blue" : ""} onClick={loginBtnHandler}>
          ENTER
        </Button>
      </div>
    </div>
  );
};

export default Login;
