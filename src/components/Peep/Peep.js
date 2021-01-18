import React, { useContext, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { UserContext } from '../../contexts/UserContext.js';

const Peep = (props) => {

    const { userId, currentSessionKey } = useContext(UserContext)
    const [likes, setLikes] = useState(props.peepData.likes.length);

    const handleLike = async (event) => {
        event.preventDefault();
        try {
            console.log(currentSessionKey)
            const response = await axios.put(`https://chitter-backend-api-v2.herokuapp.com/peeps/${props.peepData.id}/likes/${userId}`, 
            {params: {}}, 
            {headers: {
              Authorization: `Token ${currentSessionKey}` 
            }});
            if (response.data.user.id === userId) {
                console.log(response.data)
                setLikes(likes + 1)
            }
        } catch (error) {
            console.log("Error:", error)
        }
    }

    const handleDelete = async (event) => {
        event.preventDefault();
        try {
            await axios.delete(`https://chitter-backend-api-v2.herokuapp.com/peeps/${props.peepData.id}`, 
            {headers: {
                  Authorization: `Token ${currentSessionKey}` 
                }});
            props.retrievePeeps()
        } catch (error) {
            console.log("Error:", error)
        }
    }

    const renderDeleteButton = () => {
        console.log(userId)
        console.log(props.peepData.user.id)
        if (userId == props.peepData.user.id) {
            return <Button variant="secondary" size="sm" onClick={handleDelete}>Delete</Button>
        }
    }

    return (
        <div>
            <Card border="dark" style={{ width: '18rem' }}>
                <Card.Header>{props.peepData.user.handle}</Card.Header>
                <Card.Subtitle className="mb-2 text-muted">Posted at {props.peepData.created_at}</Card.Subtitle>
                <Card.Body>
                    <Card.Text>{props.peepData.body}</Card.Text>
                    {renderDeleteButton()}
                    <Button variant="secondary" size="sm" onClick={handleLike}>Like</Button>
                    <Card.Footer className="text-muted">Liked by {props.peepData.likes.length}</Card.Footer>
                </Card.Body>
            </Card>
            <br />
        </div>
    )
}

export default Peep;