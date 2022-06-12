import { Routes, Route } from "react-router-dom";
//import "./App.css";
import { UserAuthContextProvider } from "./context/UserAuthContext";

import Administrator from './components/administrator/Administrator';


export default function App() {
  return (
    <div>
      <UserAuthContextProvider>
        <Routes>
          <Route path="/administrator" element={<Administrator />} />
        </Routes>
      </UserAuthContextProvider>
    </div>
  );
}

