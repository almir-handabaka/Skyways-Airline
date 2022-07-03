import { Routes, Route } from "react-router-dom";
//import "./App.css";
import { UserAuthContextProvider } from "./context/UserAuthContext";

import Administrator from './components/administrator/Administrator';
import Radnik from './components/radnik/Radnik';
import FlightTrackerMap from './components/korisnik/FlightTrackerMap';
import Korisnik from './components/korisnik/Korisnik';
import Login from './components/Login';
import MojeKarte from './components/korisnik/MojeKarte';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './components/Register';


export default function App() {
  return (
    <div>
      <UserAuthContextProvider>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute isAllowed={['administrator', 'employee', 'user']} >
                <Login/>
            </ProtectedRoute>
          }/>
          <Route path="/signup" element={
            <ProtectedRoute isAllowed={['administrator', 'employee', 'user']} >
                <Register/>
            </ProtectedRoute>
          } />
          
          <Route path="/administrator" element={
            <ProtectedRoute isAllowed={['administrator']} >
                <Administrator/>
            </ProtectedRoute>} />
            <Route path="/radnik" element={
            <ProtectedRoute isAllowed={['employee']} >
                <Radnik/>
            </ProtectedRoute>} />
            <Route path="/flight-tracker" element={
            <ProtectedRoute isAllowed={['administrator', 'employee', 'user']} >
                <FlightTrackerMap/>
            </ProtectedRoute>} />
            <Route path="/korisnik" element={
            <ProtectedRoute isAllowed={['user']} >
                <Korisnik/>
            </ProtectedRoute>} />
            <Route path="/karte" element={
            <ProtectedRoute isAllowed={['user']} >
                <MojeKarte/>
            </ProtectedRoute>} />
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </UserAuthContextProvider>
    </div>
  );
}

