import React, { useContext } from 'react';
import {Link} from 'react-router-dom';
import { Navbar as BootNavbar } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav'
import { UserContext } from '../../contexts/UserContext.js';

function Navbar() {

  const { storeUserHandleInContext, storeUserIdInContext, storeCurrentSessionKeyInContext, currentSessionKey } = useContext(UserContext)


  const handleLogout = () => {
    storeUserHandleInContext('') 
    storeUserIdInContext('') 
    storeCurrentSessionKeyInContext('')
  }

  const renderLogoutLink = () => {
    if (currentSessionKey !== "") {
      return <Link to='/' className="nav-link" id="log-out-link" data-testid="log-out-link" onClick={handleLogout}>Log out</Link>
    }
  }

    return (

      <BootNavbar bg="light" variant="light">
        <Link to='/' className="navbar-brand" data-testid='navbar-logo-link'>Chitter</Link>
        <Nav className="ml-auto">
          {renderLogoutLink()}
        </Nav>
      </BootNavbar>
    )
}

export default Navbar;