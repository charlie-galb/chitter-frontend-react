import React, { useEffect } from 'react';
import Axios from 'axios';

const PeepList = () => {

    let list = ["One", "Two", "Three"]

    let peeps;

    useEffect() {
        try {
            const response = await Axios.get("https://chitter-backend-api-v2.herokuapp.com/peeps");
            if (response){
                console.log(response)
                peeps = response
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <p>{list}</p>
        
        </div>
    )
}

export default PeepList;