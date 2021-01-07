import React from 'react';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" id="nav-sign-up-link" data-testid="nav-sign-up-link" href="#">Sign up</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="nav-log-in-link" data-testid="nav-log-in-link" href="#">Log in</a>
            </li>
            <li className="nav-item">
              <Link to='/' className="nav-link" id="log-out-link" data-testid="log-out-link" >Log out</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
}

export default Navbar;