import React, { useState, useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import Navbar from '../Navbar/Navbar.js'
import PeepList from '../PeepList/PeepList.js';
import NewPeepForm from '../NewPeepForm/NewPeepForm.js'
import { UserContext } from '../../contexts/UserContext.js';
import styles from './Timeline.module.css'

const Timeline = () => {

    const { currentSessionKey } = useContext(UserContext)
    const [peeps, setPeeps] = useState(null)
    const [redirect, setRedirect] = useState(null)

    const retrievePeeps = async () => {
      if (currentSessionKey === "") {setRedirect('/')}
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/peeps`, 
        {headers: {
          authorization: currentSessionKey}
        })
        
        if (response.data) { setPeeps(response.data) } 
        
      } catch (error) {
            console.error("Error:", error)
        }
    }
      
      useEffect( () => {
        retrievePeeps()
         // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
 
    if (redirect) {
      return <Redirect to={redirect} data-testid='timeline-redirect-to-home'/>
    }
    return (
        <div className={styles.background}>
            <Navbar />
            <div className={styles.navbarSpacer} />
            <div className={styles.mainContent}>
              <div className={styles.header}>
                <h1 data-testid="timeline-h2">Timeline</h1>
                <NewPeepForm retrievePeeps={retrievePeeps}/>
              </div>
              <div className={styles.peepsContainer}>
                <PeepList retrievePeeps={retrievePeeps} peeps={peeps} />
              </div>
            </div>
        </div>
    )
    
}

export default Timeline;