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
      navigate('/administrator');
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
        <form>
          <img class="mb-4" src="../assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" />
          <h1 class="h3 mb-3 fw-normal">Login</h1>

          <div class="form-floating">
            <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
            <label for="floatingInput">Email address</label>
          </div>
          <div class="form-floating">
            <input type="password" class="form-control" id="floatingPassword" placeholder="Password" />
            <label for="floatingPassword">Password</label>
          </div>

          <div class="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
          <p class="mt-5 mb-3 text-muted">&copy; 2017–2022</p>
        </form>
      </main>
    </>
  );
}