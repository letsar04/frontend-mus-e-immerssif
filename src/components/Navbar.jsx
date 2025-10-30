import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

function NavigationBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">🎬 Musée du Cinéma Burkinabè</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/">Accueil</Nav.Link>
            <Nav.Link href="/musee">Musée</Nav.Link>
            <Nav.Link href="/archives">Archives</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
