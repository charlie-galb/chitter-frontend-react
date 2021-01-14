import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';

class Peep extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <div>
                <Card border="dark" style={{ width: '18rem' }}>
                    <Card.Header>{this.props.peepData.user.handle}</Card.Header>
                    <Card.Subtitle className="mb-2 text-muted">Posted at {this.props.peepData.created_at}</Card.Subtitle>
                    <Card.Body>
                        <Card.Text>{this.props.peepData.body}</Card.Text>
                        <Button variant="secondary" size="sm">Like</Button>
                        <Card.Footer className="text-muted">Liked by {this.props.peepData.likes.length}</Card.Footer>
                    </Card.Body>
                </Card>
                <br />
            </div>
        )
    }

} 

export default Peep;