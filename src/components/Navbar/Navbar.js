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
      return <Link to='/' className="logOutLink" data-testid="log-out-link" onClick={handleLogout} >Log out</Link>
    }
  }

    return (
     <div className={styles.navContainer} >
       <img src='/chitter-logo-long.png' data-testid="nav-logo" alt='chitter-logo' height="100%" className={styles.logo}/>
       {renderLogoutLink()}
     </div>
    )
}

export default Navbar;