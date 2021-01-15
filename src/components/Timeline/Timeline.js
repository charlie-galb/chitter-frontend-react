import React, { useState, useEffect } from 'react'
import axios from 'axios';
import PeepList from '../PeepList/PeepList.js';
import NewPeepForm from '../NewPeepForm/NewPeepForm.js'

const Timeline = () => {

    const [peeps, setPeeps] = useState(null)

    const retrievePeeps = async () => {
        await axios.get("https://chitter-backend-api-v2.herokuapp.com/peeps")
        .then((response) => {setPeeps(response.data)})
      }
      
      useEffect( () => {
        retrievePeeps()
      }, []);
 
    return (
        <div>
            <h2 data-testid="timeline-h2">Timeline</h2>
            <NewPeepForm retrievePeeps={retrievePeeps}/>
            <PeepList retrievePeeps={retrievePeeps} peeps={peeps} />
        </div>
    )
    
}

export default Timeline;