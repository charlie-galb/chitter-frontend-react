import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

import { UserContext } from '../../contexts/UserContext.js';
import styles from './Peep.module.css'

const Peep = (props) => {

    const { userId, currentSessionKey } = useContext(UserContext) 
    const likesUserIdArray = []
    const readableTimeString = new Date(props.peepData.created_at).toTimeString()
    const readableDateString = new Date(props.peepData.created_at).toDateString()

    if (props.peepData.likes.length !== 0) {
        props.peepData.likes.forEach( (like) => {
            if (like) { likesUserIdArray.push(like.user_id) }
        })
    }

    const handleLike = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`${process.env.REACT_APP_BACKEND_URL}/peeps/${props.peepData.id}/likes/${userId}`,
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
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/peeps/${props.peepData.id}/likes/${userId}`,  
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
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/peeps/${props.peepData.id}`, 
            {headers: {
                  Authorization: currentSessionKey
                }});
            props.retrievePeeps()
        } catch (error) {
            console.log("Error:", error)
        }
    }

    const returnLikeCount = () => {
        if (props.peepData.likes.length === 1) {
            return "1 person likes this"
        } else {
            return `${props.peepData.likes.length} people like this`
        }
    }

    const renderDeleteButton = () => {
        if (userId === props.peepData.user.id) {
            return <Button variant="primary" className={styles.peepButton} onClick={handleDelete} data-testid='delete-button'>Delete</Button>
        }
    }

    const renderLikeButton = () => {
        if ((userId !== props.peepData.user.id) && (!likesUserIdArray.includes(userId))) {
            return <Button variant="primary" className={styles.peepButton} onClick={handleLike} data-testid='like-button'>Like</Button>
        }
    }

    const renderUnlikeButton = () => {
        if ((userId !== props.peepData.user.id) && (likesUserIdArray.includes(userId))) {
            return <Button variant="primary" className={styles.peepButton} onClick={handleUnlike} data-testid='unlike-button'>Unlike</Button>
        }
    }

    return (
        <div>
            <div className={styles.peepBox}>
                <div className={styles.peepHeader}>
                    <h4 className={styles.peepHandle}>{props.peepData.user.handle}</h4><p className={styles.peepTime} data-testid='peep-time-stamp'> - {readableTimeString.slice(0, 5)} on {readableDateString}</p>
                </div>
                <div className={styles.peepBody}>
                    <p>{props.peepData.body}</p>
                    {renderDeleteButton()}
                    {renderLikeButton()}
                    {renderUnlikeButton()}
                </div>
                <div className={styles.footer} data-testid='like-count'>{returnLikeCount()}</div>
            </div>
            <br />
        </div>
    )
}

export default Peep;