import React, { Component } from 'react';

class Peep extends Component {
    constructor(props){
        super(props)
        console.log(this.props)
    }

    render() {
        return (
            <p>{this.props.peepData.body}</p>
        )
    }

} 

export default Peep;