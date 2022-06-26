import { Routes, Route } from "react-router-dom";
//import "./App.css";
import { UserAuthContextProvider } from "./context/UserAuthContext";

import Administrator from './components/administrator/Administrator';
import Radnik from './components/radnik/Radnik';
import FlightTrackerMap from './components/korisnik/FlightTrackerMap';
import Korisnik from './components/korisnik/Korisnik';

export default function App() {
  return (
    <div>
      <UserAuthContextProvider>
        <Routes>
          <Route path="/administrator" element={<Administrator />} />
          <Route path="/radnik" element={<Radnik />} />
          <Route path="/flight-tracker" element={<FlightTrackerMap />} />
          <Route path="/korisnik" element={<Korisnik />} />
        </Routes>
      </UserAuthContextProvider>
    </div>
  );
}

