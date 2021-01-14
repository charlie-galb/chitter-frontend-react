import React, { Component } from 'react'
import PeepList from '../PeepList/PeepList.js';

export default class Timeline extends Component {
    render() {
        return (
            <div>
                <h2 data-testid="timeline-h2">Timeline</h2>
                <PeepList />
            </div>
        )
    }
}
