import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Peep from '../Peep/Peep.js'

const PeepList = () => {
    const [peeps, setPeeps] = useState(null)

    let list = ["One", "Two", "Three"]

    useEffect( () => {
      async function retrievePeeps(){
        await axios.get("https://chitter-backend-api-v2.herokuapp.com/peeps")
        .then((response) => {setPeeps(response.data)})
      }
      retrievePeeps()
    }, []);

    return (
        <div>
            <p>{list}</p>
        </div>
    )
}

export default PeepList;