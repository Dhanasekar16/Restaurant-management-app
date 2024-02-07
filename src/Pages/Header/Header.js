import React from 'react'
// import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { FaUtensils } from "react-icons/fa";
import './Header.scss'

export const Header = () => {
  return (
    <>
        <Navbar expand="lg" className="px-5">
                <Navbar.Brand><NavLink className="banner_title" to="/Home"><FaUtensils /> Restoran</NavLink></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <Nav.Link><NavLink className="nav_link" to="/Home">Home</NavLink></Nav.Link>
                    <Nav.Link><NavLink className="nav_link" to="/Form">Contact Us</NavLink></Nav.Link>
                </Nav>
                </Navbar.Collapse>
        </Navbar>
    </>
  )
}
