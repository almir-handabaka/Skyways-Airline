import { useState } from 'react';
import { useUserAuth } from "../context/UserAuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./signin.css";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '.././skyways-logo.png'; // with import


const defaultValues = {
  email: "",
  password: "",
  username: "",
}

export default function Register() {
  const navigate = useNavigate();
  const { signUp } = useUserAuth();

  const [registerInfo, setRegisterInfo] = useState(defaultValues);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRegisterInfo({ ...registerInfo, [name]: value });
  }

  const createAccount = async () => {
    console.log(registerInfo)

    try {
      await signUp(registerInfo.email, registerInfo.password);
      const new_user = {
        email: registerInfo.email,
        id: uuidv4(),
        type: "user",
        tickets: [],
        username: registerInfo.username
      }
      console.log("kreiranje profila");

      await setDoc(doc(db, "users", new_user.id), new_user);
      console.log(new_user);
      navigate("/");
    } catch (err) {
      setErrorMessage(err.message);
    }

  }


  return (
    <>
      <main class="form-signin w-100 mx-auto text-center">
        <div>
          <h1 class="h3 mb-3 fw-normal">Registracija</h1>
          <div>{errorMessage}</div>
          <div class="form-floating">
            <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" name="email" value={registerInfo.email} onChange={handleInputChange} />
            <label for="floatingInput">Email address</label>
          </div>
          <div class="form-floating">
            <input type="password" class="form-control" id="floatingPassword" placeholder="Password" name="password" value={registerInfo.password} onChange={handleInputChange}  />
            <label for="floatingPassword">Password</label>
          </div>
          <div class="form-floating">
            <input type="text" class="form-control" id="floatingPassword" placeholder="Korisničko ime" name="username" value={registerInfo.username} onChange={handleInputChange}  />
            <label for="floatingPassword">Korisničko ime</label>
          </div>

         
          <button class="w-100 btn btn-lg btn-primary" type="submit" onClick={createAccount}>Sign up</button>
          <p class="mt-5 mb-3 text-muted">&copy;2022</p>
        </div>
      </main>
    </>
  );
}