import { useState } from 'react';
import { useUserAuth } from "../context/UserAuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./signin.css";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';

const defaultValues = {
  username: "",
  password: "",
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
    try {
      await signUp(registerInfo.username, registerInfo.password);
      const new_user = {
        email: registerInfo.username,
        id: uuidv4(),
        type: "user",
        tickets: []
      }
      console.log("kreiranje profila");

      await setDoc(doc(db, "users", new_user.id), new_user);
      console.log(new_user);

    } catch (err) {
      setErrorMessage(err.message);
    }


    //addNewRegisteredUser(registerInfo);
    navigate("/home");
  }


  return (
    <>
      <main class="form-signin w-100 mx-auto text-center">
        <form>
          <img class="mb-4" src="" alt="" width="72" height="57" />
          <h1 class="h3 mb-3 fw-normal">Registracija</h1>

          <div class="form-floating">
            <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
            <label for="floatingInput">Email address</label>
          </div>
          <div class="form-floating">
            <input type="password" class="form-control" id="floatingPassword" placeholder="Password" />
            <label for="floatingPassword">Password</label>
          </div>
          <div class="form-floating">
            <input type="text" class="form-control" id="floatingPassword" placeholder="Korisničko ime" />
            <label for="floatingPassword">Korisničko ime</label>
          </div>

         
          <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
          <p class="mt-5 mb-3 text-muted">&copy; 2017–2022</p>
        </form>
      </main>
    </>
  );
}