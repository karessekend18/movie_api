import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import  Button  from "react-bootstrap/Button";
import Container  from "react-bootstrap/Container";
import  Navbar  from "react-bootstrap/Navbar";
import  Nav  from "react-bootstrap/Nav";
import { NavLink, useLocation } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../home/SearchBar";
import './header.css';

const Header = ({ user, onSignOut, onSearch }) => {
    const location = useLocation();
    const isAuthPage = location.pathname.toLowerCase() === '/login' || location.pathname.toLowerCase() === '/register';
    const hideAuthButtons = location.pathname === '/login' || location.pathname === '/register';
    const hideNavLinks = hideAuthButtons;

    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef();

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="header-navbar">
            <Container fluid>
                <Navbar.Brand href="/" className="header-brand">
                    <FontAwesomeIcon icon={faVideoSlash} />
                    <span className="header-title" style={{ color: 'gold', marginLeft: 8 }}>Movimate</span>
                </Navbar.Brand>
                {!isAuthPage && <>
                  <Navbar.Toggle aria-controls="navbarScroll" />
                  <Navbar.Collapse id="navbarScroll" className="header-navbar-collapse">
                      <Nav className="me-auto my-2 my-lg-0 header-nav" navbarScroll>
                          {!hideNavLinks && <>
                              <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                              <Nav.Link as={NavLink} to="/watchlist">Watchlist</Nav.Link>
                          </>}
                      </Nav>
                      <div className="header-searchbar-container">
                          <SearchBar onSearch={onSearch} />
                      </div>
                      {user ? (
                          <div className="header-user" ref={menuRef}>
                              <span className="header-username">
                                  {user.name}
                              </span>
                              <FontAwesomeIcon icon={faUserCircle} className="header-user-icon" onClick={() => setShowMenu(v => !v)} />
                              {showMenu && (
                                  <div className="header-user-menu">
                                      <div className="header-user-menu-item" onClick={onSignOut}>Sign Out</div>
                                  </div>
                              )}
                          </div>
                      ) : (
                          !hideAuthButtons && <>
                          <Nav.Link as={NavLink} to="/login">
                            <Button variant="outline-info" className="ms-2">Login</Button>
                          </Nav.Link>
                          <Nav.Link as={NavLink} to="/register">
                            <Button variant="outline-info" className="ms-2" style={{ marginRight: 16 }}>Register</Button>
                          </Nav.Link>
                          </>
                      )}
                  </Navbar.Collapse>
                </>}
            </Container>
        </Navbar>
    )}

export default Header;
