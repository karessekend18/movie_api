import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import  Button  from "react-bootstrap/Button";
import Container  from "react-bootstrap/Container";
import  Navbar  from "react-bootstrap/Navbar";
import  Nav  from "react-bootstrap/Nav";
import { NavLink, useLocation } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const Header = ({ user, onSignOut }) => {
    // Use useLocation for reliable route detection
    const location = useLocation();
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
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand href="/" style={{"color": 'gold'}}>
                    <FontAwesomeIcon icon={faVideoSlash} /> Movimate
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                        {!hideNavLinks && <>
                            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                            <Nav.Link as={NavLink} to="/watchlist">Watchlist</Nav.Link>
                        </>}
                    </Nav>
                    {user ? (
                        <div style={{ display: 'flex', alignItems: 'center', position: 'relative', marginRight: 20 }} ref={menuRef}>
                            <span style={{ color: 'white', fontWeight: 500, marginRight: 8 }}>
                                {user.name}
                            </span>
                            <FontAwesomeIcon icon={faUserCircle} style={{ color: 'white', fontSize: '2rem', cursor: 'pointer', marginRight: 8 }} onClick={() => setShowMenu(v => !v)} />
                            {showMenu && (
                                <div style={{ position: 'absolute', top: '2.5rem', right: 0, background: '#222', color: 'white', borderRadius: 6, boxShadow: '0 2px 8px rgba(0,0,0,0.2)', zIndex: 1000 }}>
                                    <div style={{ padding: '10px 20px', cursor: 'pointer' }} onClick={onSignOut}>Sign Out</div>
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
            </Container>
        </Navbar>
    )}

export default Header;
