import React from 'react';
import {Link} from 'react-router-dom';

import LoginForm from '../LoginForm/LoginForm.js';
import styles from './Home.module.css'

const Home = () => {
    
    return (
        <div className={styles.container}>
            <div className={styles.logoContainer}>
                <img src='/chitter-logo-square.png' alt='chitter-logo' className={styles.logo} width="80%" />
            </div>
            <div className={styles.formContainer}>
                <h1 data-testid="home-h1">Welcome to Chitter!</h1>
                <h2 data-testid="home-h2">Please log in below</h2>
                <LoginForm />
                <p>Don't have an account?</p>
                <Link data-testid="sign-up-link" to='/sign_up'>Sign up here</Link>
            </div>
        </div>
    )
   
}

export default Home
