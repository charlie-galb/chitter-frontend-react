import React from 'react';
import Peep from '../Peep/Peep.js'

const PeepList = (props) => {

    if (props.peeps) {
      return props.peeps.map((singlePeep, i) => (
        <Peep retrievePeeps={props.retrievePeeps} key={singlePeep.id} peepData={singlePeep}/>
      )
      )}

    return (
        <div></div>
    )
}

export default PeepList;