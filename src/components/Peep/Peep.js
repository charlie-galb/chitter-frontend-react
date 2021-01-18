import React, { useContext, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { UserContext } from '../../contexts/UserContext.js';

const Peep = (props) => {

    const { userId, currentSessionKey, userHandle } = useContext(UserContext) 
    const likesUserIdArray = props.peepData.likes.map(like => like.user.id)

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
                props.retrievePeeps()
            }
        } catch (error) {
            console.log("Error:", error)
        }
    }

    const handleUnlike = async (event) => {
        event.preventDefault();
        try {
            console.log(currentSessionKey)
            const response = await axios.delete(`https://chitter-backend-api-v2.herokuapp.com/peeps/${props.peepData.id}/likes/${userId}`,  
            {headers: {
              Authorization: `Token ${currentSessionKey}` 
            }});
            props.retrievePeeps()
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
        if (userId == props.peepData.user.id) {
            return <Button variant="secondary" size="sm" onClick={handleDelete} data-testid='delete-button'>Delete</Button>
        }
    }

    const renderLikeButton = () => {
        if ((userId != props.peepData.user.id) && (!likesUserIdArray.includes(userId))) {
            return <Button variant="secondary" size="sm" onClick={handleLike} data-testid='like-button'>Like</Button>
        }
    }

    const renderUnlikeButton = () => {
        if ((userId != props.peepData.user.id) && (likesUserIdArray.includes(userId))) {
            return <Button variant="secondary" size="sm" onClick={handleUnlike} data-testid='unlike-button'>Unlike</Button>
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