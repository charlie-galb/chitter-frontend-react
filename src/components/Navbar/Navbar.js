import React, { useContext } from 'react';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from '../../contexts/UserContext.js';

function Navbar() {

  const { storeUserHandleInContext, storeUserIdInContext, storeCurrentSessionKeyInContext } = useContext(UserContext)


  const handleLogout = () => {
    console.log("Click is working")
    storeUserHandleInContext('') 
    storeUserIdInContext('') 
    storeCurrentSessionKeyInContext('')
  }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Chitter</a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item" onClick={handleLogout}>
              <Link to='/' className="nav-link" id="log-out-link" data-testid="log-out-link" >Log out</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
}

export default Navbar;