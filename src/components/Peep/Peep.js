import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { UserContext } from '../../contexts/UserContext.js';

const Peep = (props) => {

    const { userId, currentSessionKey } = useContext(UserContext) 
    const likesUserIdArray = []
    const readableTimeString = new Date(props.peepData.created_at).toTimeString()
    const readableDateString = new Date(props.peepData.created_at).toDateString()

    if (props.peepData.likes.length != 0) {
        props.peepData.likes.forEach( (like) => {
            if (like) { likesUserIdArray.push(like.user_id) }
        })
    }

    const handleLike = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`${process.env.BACKEND_URL}/peeps/${props.peepData.id}/likes/${userId}`,
            {credentials: 'include'},  
            {headers: {
                Authorization: currentSessionKey
              }});
    
            props.retrievePeeps()
            
        } catch (error) {
            console.log("Error:", error)
        }
    }

    const handleUnlike = async (event) => {
        event.preventDefault();
        try {
            await axios.delete(`${process.env.BACKEND_URL}/peeps/${props.peepData.id}/likes/${userId}`,  
            {headers: {
              Authorization: currentSessionKey 
            }});
            props.retrievePeeps()
        } catch (error) {
            console.log("Error:", error)
        }
    }

    const handleDelete = async (event) => {
        event.preventDefault();
        try {
            await axios.delete(`${process.env.BACKEND_URL}/peeps/${props.peepData.id}`, 
            {headers: {
                  Authorization: currentSessionKey
                }});
            props.retrievePeeps()
        } catch (error) {
            console.log("Error:", error)
        }
    }

    const renderDeleteButton = () => {
        if (userId === props.peepData.user.id) {
            return <Button variant="secondary" size="sm" onClick={handleDelete} data-testid='delete-button'>Delete</Button>
        }
    }

    const renderLikeButton = () => {
        if ((userId !== props.peepData.user.id) && (!likesUserIdArray.includes(userId))) {
            return <Button variant="secondary" size="sm" onClick={handleLike} data-testid='like-button'>Like</Button>
        }
    }

    const renderUnlikeButton = () => {
        if ((userId !== props.peepData.user.id) && (likesUserIdArray.includes(userId))) {
            return <Button variant="secondary" size="sm" onClick={handleUnlike} data-testid='unlike-button'>Unlike</Button>
        }
    }

    return (
        <div>
            <Card className="mx-auto" border="dark" style={{ width: '18rem', margin: '1rem' }}>
                <Card.Title>{props.peepData.user.handle}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted" data-testid='peep-time-stamp'>Posted at {readableTimeString.slice(0, 5)} on {readableDateString}</Card.Subtitle>
                <Card.Body>
                    <Card.Text>{props.peepData.body}</Card.Text>
                    {renderDeleteButton()}
                    {renderLikeButton()}
                    {renderUnlikeButton()}
                    <Card.Footer className="text-muted" data-testid='like-count'>Liked by {props.peepData.likes.length}</Card.Footer>
                </Card.Body>
            </Card>
            <br />
        </div>
    )
}

export default Peep;