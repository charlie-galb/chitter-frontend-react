import React, { useContext } from 'react';
import {Link} from 'react-router-dom';

import { UserContext } from '../../contexts/UserContext.js';
import styles from './Navbar.module.css';

function Navbar() {

  const { storeUserHandleInContext, storeUserIdInContext, storeCurrentSessionKeyInContext, currentSessionKey } = useContext(UserContext)


  const handleLogout = () => {
    storeUserHandleInContext('') 
    storeUserIdInContext('') 
    storeCurrentSessionKeyInContext('')
  }

  const renderLogoutLink = () => {
    if (currentSessionKey !== "") {
      return <Link to='/' className="nav-link" id="logOutLink" data-testid="log-out-link" onClick={handleLogout} >Log out</Link>
    }
  }

    return (
     <div style={{width: '100%', height: "70px", backgroundColor: '#10D48E', display: 'fixed'}}>
       <img src='/chitter-logo-long.png' alt='chitter-logo' height="100%" className={styles.logo}/>
       {renderLogoutLink()}
     </div>
    )
}

export default Navbar;