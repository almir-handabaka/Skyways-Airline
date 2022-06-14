import { Routes, Route } from "react-router-dom";
//import "./App.css";
import { UserAuthContextProvider } from "./context/UserAuthContext";

import Administrator from './components/administrator/Administrator';
import Radnik from './components/radnik/Radnik';

export default function App() {
  return (
    <div>
      <UserAuthContextProvider>
        <Routes>
          <Route path="/administrator" element={<Administrator />} />
          <Route path="/radnik" element={<Radnik />} />
        </Routes>
      </UserAuthContextProvider>
    </div>
  );
}

