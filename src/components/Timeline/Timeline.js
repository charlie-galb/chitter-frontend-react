import React, { useState, useContext } from 'react'
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import { useMountEffect } from '../../utils/useMountEffect'
import PeepList from '../PeepList/PeepList.js';
import NewPeepForm from '../NewPeepForm/NewPeepForm.js'
import { UserContext } from '../../contexts/UserContext.js';

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
      
      useMountEffect(retrievePeeps)
 
    if (redirect) {
      return <Redirect to={redirect} data-testid='timeline-redirect-to-home'/>
    }
    return (
        <div>
            <h2 data-testid="timeline-h2">Timeline</h2>
            <NewPeepForm retrievePeeps={retrievePeeps}/>
            <PeepList retrievePeeps={retrievePeeps} peeps={peeps} />
        </div>
    )
    
}

export default Timeline;