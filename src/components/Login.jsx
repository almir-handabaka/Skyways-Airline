import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import Cookies from 'universal-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./signin.css";

/*
almir.handabaka@gmail.com
123123

test@gmail.com
test123

*/


const defaultValues = {
  email: "",
  password: "",
};


export default function Login() {
  const navigate = useNavigate();
  const { logIn, makeJWToken } = useUserAuth();

  const [loginInfo, setLoginInfo] = useState(defaultValues);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLoginInput = (event) => {
    const { name, value } = event.target;
    setLoginInfo({ ...loginInfo, [name]: value });

  }

  const loginInAccount = async () => {
    if (loginInfo.email === "" || loginInfo.password === "") {
      return;
    }

    try {
      await logIn(loginInfo.email, loginInfo.password);
      navigate('/administrator');
      console.log("login okej")
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
      <main class="form-signin w-100 mx-auto text-center">
        <div>
          <h1 class="h3 mb-3 fw-normal">Login</h1>
          <div>{errorMessage}</div>
          <div class="form-floating">
            <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" name="email" value={loginInfo.email} onChange={handleLoginInput} />
            <label for="floatingInput">Email address</label>
          </div>
          <div class="form-floating">
            <input type="password" class="form-control" id="floatingPassword" placeholder="Password" name="password" value={loginInfo.password} onChange={handleLoginInput}  />
            <label for="floatingPassword">Password</label>
          </div>
          <button class="w-100 btn btn-lg btn-primary" type="submit" onClick={loginInAccount}>Sign in</button>
          <p class="mt-5 mb-3 text-muted">&copy;2022</p>
        </div>
      </main>
    </>
  );
}