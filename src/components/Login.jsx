import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import Cookies from 'universal-cookie';

import "../App.css";

/*
almir.handabaka@gmail.com
123123

test@gmail.com
test123

*/


const defaultValues = {
  username: "",
  password: "",
};


export default function Login() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const { logIn, makeJWToken } = useUserAuth();

  const [loginInfo, setLoginInfo] = useState(defaultValues);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLoginInput = (event) => {
    const { name, value } = event.target;
    setLoginInfo({ ...loginInfo, [name]: value });

  }

  const loginInAccount = async () => {
    if (loginInfo.username === "" || loginInfo.password === "") {
      return;
    }

    try {
      await logIn(loginInfo.username, loginInfo.password);
      navigate('/home');
    } catch (err) {
      console.log(err);
      setErrorMessage(err.message);
    }



    /* makeJWToken(loginInfo).then((token) => {
      cookies.set('auth_token', token, { path: '/' });
      console.log("Token set", token);
    }).catch((error) => {
      console.log("catch greska");
    }); */




  }


  return (
    <>
      <main className="containerStyle">
        <h2>Welcome to login page!</h2>
        <div>{errorMessage}</div>
        <div className="childStyle" >
          <label>Username </label>
          <input style={{ width: "50%" }} type="text" name="username" value={loginInfo.username} onChange={handleLoginInput} />
        </div>
        <div className="childStyle">
          <label>Password </label>
          <input style={{ width: "50%" }} type="password" name="password" value={loginInfo.password} onChange={handleLoginInput} />
        </div>
        <div className="childStyle">
          <input type="button" value="Login" onClick={loginInAccount} />
        </div>
      </main>
      <nav>
        <Link to="/signup">You don't have account? Register here!</Link>
      </nav>
    </>
  );
}