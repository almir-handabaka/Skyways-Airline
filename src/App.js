import { Routes, Route } from "react-router-dom";
import "./App.css";
import { UserAuthContextProvider } from "./context/UserAuthContext";

import Login from "./loginAndRegister.js"
import ProtectedRoute from "./ProtectedRoute.js"
import Register from "./loginAndRegister.js"
import PocetnaStranica from "./PocetnaStranica.js"


export default function App() {
  return (
    <div>
      <UserAuthContextProvider>
        <Routes>
          <Route
            path="/home"
            element={
              <ProtectedRoute>

                <PocetnaStranica/>
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Routes>
      </UserAuthContextProvider>
    </div>
  );
}

