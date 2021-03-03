import React, { useContext, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { UserContext } from '../../contexts/UserContext.js';

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
            const response = await axios.post(`${process.env.BACKEND_URL}/peeps`, {peep: {user_id:`${userId}`, body:`${peepBody}`}}, 
            {headers: {
                  Authorization: currentSessionKey
                }});
            if (response.data) {
                console.log(response.data)
                setPeepBody("");
                props.retrievePeeps()
            }
        } catch (error) {
            console.error("Error:", error)
        }
    }

    return (
        <Form>
            <Form.Group controlId="new-peep">
                <Form.Label>Got something to say?</Form.Label>
                <Form.Control type="textarea" placeholder="Say it here!" data-testid="peep-body-text-input" name="new-peep-body" value={peepBody} onChange={handlePeepBodyChange} required/>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Post peep
            </Button>
        </Form>
    )
}

export default NewPeepForm;