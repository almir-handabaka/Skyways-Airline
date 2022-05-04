import React from "react";

const ProtectedRoute = ({ children }) => {
  // auth goes here
  // if user isn't auth, redirect to / route, else if user doesn't have access to that route redirect to his default /home page, else return children

  return children;
};

export default ProtectedRoute;