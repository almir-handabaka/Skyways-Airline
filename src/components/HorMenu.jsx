import React from 'react';
import { useUserAuth } from "../context/UserAuthContext";
import { Navbar, Container, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function HorMenu() {
  const { user } = useUserAuth();

  if (!user) {
    return ("nije auth za meni");
  }

  if (user.type === 'user') {
    return (


      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Buy a ticket</Nav.Link>
            <Nav.Link href="#pricing">Flight map</Nav.Link>
            <Nav.Link href="#pricing">Settings</Nav.Link>
          </Nav>
        </Container>
      </Navbar>


    );
  }

  if (user.type === 'admin') {
    return (
      <>
        <Nav className="justify-content-center" activeKey="/home">
          <Nav.Item>
            <Nav.Link href="/home">Staff management</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-1">Flights</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-2">Users</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-2">Settings</Nav.Link>
          </Nav.Item>
        </Nav>
      </>
    );
  }

  if (user.type === 'staff') {
    return (
      <>
        <Nav className="justify-content-center" activeKey="/home">
          <Nav.Item>
            <Nav.Link href="/home">Tickets</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-1">Flights</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-2">Flight map</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-2">Settings</Nav.Link>
          </Nav.Item>
        </Nav>
      </>
    );
  }

  return "meni";
}
