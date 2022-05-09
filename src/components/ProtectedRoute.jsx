import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import HorMenu from "./HorMenu";


const ProtectedRoute = ({ children }) => {
  // auth goes here
  // if user isn't auth, redirect to / route, else if user doesn't have access to that route redirect to his default /home page, else return children
  // check route acess inside the route
  const { user } = useUserAuth();


  if (!user) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <HorMenu />
      {children}
    </>

  );

};

export default ProtectedRoute;