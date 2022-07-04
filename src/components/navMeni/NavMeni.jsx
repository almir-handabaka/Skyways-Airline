import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../.././context/UserAuthContext";

export default function NavMeni() {
  const navigate = useNavigate();
  const { user, logOut } = useUserAuth();

  switch(user.type) {
  case 'administrator':
    return (
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand href=""></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate('/administrator')} >Home</Nav.Link>
            <Nav.Link onClick={() => navigate('/flight-tracker')} >Flight tracker</Nav.Link>
            <Nav.Link className="ml-auto" onClick={() => {logOut(); navigate('/')}} >Odjavi se</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
  case 'employee':
    return (
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand href=""></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate('/radnik')} >Home</Nav.Link>
            <Nav.Link onClick={() => navigate('/flight-tracker')} >Flight tracker</Nav.Link>
            <Nav.Link onClick={() => {logOut(); navigate('/')}} >Odjavi se</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
  case 'user':
    return (
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand href=""></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate('/korisnik')} >Home</Nav.Link>
            <Nav.Link onClick={() => navigate('/karte')} >Moje karte</Nav.Link>
            <Nav.Link onClick={() => navigate('/flight-tracker')} >Flight tracker</Nav.Link>
            <Nav.Link onClick={() => {logOut(); navigate('/')}} >Odjavi se</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
  default:
    return ""
} 



}