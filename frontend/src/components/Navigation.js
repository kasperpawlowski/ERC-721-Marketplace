import React from 'react';
import {Link} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import logo from '../logo.png';

// maintains navigation bar based on current phase
export default function Navigation() {
    return (
        <Navbar expand="lg">
        <Container>
            <Navbar.Brand as={Link} to="/">
                <img src={logo} className="me-4 d-inline-block align-center" alt="Project logo"/>
                NFT Marketplace
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/marketplace">Explore</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    )
}