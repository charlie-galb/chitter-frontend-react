import React, { useState, useEffect } from 'react';
import Peep from '../Peep/Peep.js'

const PeepList = (props) => {

    if (props.peeps) {
      return props.peeps.map((singlePeep, i) => (
        <Peep key={singlePeep.id} peepData={singlePeep}/>
      )
      )}

    return (
        <div></div>
    )
}

export default PeepList;