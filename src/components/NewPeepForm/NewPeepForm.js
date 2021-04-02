import React, { useContext, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

import { UserContext } from '../../contexts/UserContext.js';
import styles from './NewPeepForm.module.css'

const NewPeepForm = (props) => {
 
    const { userId, currentSessionKey } = useContext(UserContext)
    const [peepBody, setPeepBody] = useState("")

    const handlePeepBodyChange = (event) => {
        const { value } = event.target; 
        setPeepBody(value);
      }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/peeps`, {peep: {user_id:`${userId}`, body:`${peepBody}`}}, 
            {headers: {
                  Authorization: currentSessionKey
                }});
            setPeepBody("");
            props.retrievePeeps()
        } catch (error) {
            console.error("Error:", error)
        }
    }

    return (
        <Form>
            <Form.Group controlId="new-peep">
                <Form.Control as="textarea" rows='3' className={styles.textArea} placeholder="Got something to say?" data-testid="peep-body-text-input" name="new-peep-body" value={peepBody} onChange={handlePeepBodyChange} required/>
            </Form.Group>
            <Button variant="primary" className="formButton" type="submit" onClick={handleSubmit}>
                Post peep
            </Button>
        </Form>
    )
}

export default NewPeepForm;