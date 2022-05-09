import { useUserAuth } from "../context/UserAuthContext";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { user, logOut } = useUserAuth();

  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/");
    }
    catch (err) {
      console.log(err);
    }
  }



  return (
    <>
      Home komponenta za {user.email}
      <br />
      <button onClick={handleLogOut}>LOG OUT</button>
    </>
  )
}

export default Home;