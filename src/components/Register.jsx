import { useState } from 'react';
import { useUserAuth } from "../context/UserAuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

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
      <main className="containerStyle">
        <h2>Register your account!</h2>
        <div>{errorMessage}</div>
        <div className="childStyle" >
          <label>Username: </label>
          <input style={{ width: "50%" }} type="text" name="username" value={registerInfo.username} onChange={handleInputChange} />
        </div>
        <div className="childStyle">
          <label>Password: </label>
          <input style={{ width: "50%" }} type="password" name="password" value={registerInfo.password} onChange={handleInputChange} />
        </div>
        <div className="childStyle">
          <input type="button" value="Register" onClick={createAccount} />
        </div>
      </main>
      <nav>
        <Link to="/">You already have account? Click here to login!</Link>
      </nav>
    </>
  );
}