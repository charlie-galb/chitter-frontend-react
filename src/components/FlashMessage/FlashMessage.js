import React, {useState, useEffect} from 'react'

const FlashMessage = (props) => {

    const [text, setText] = useState("")

    useEffect(() => {
        
        setText(props.message)
        const timer = setTimeout(() => {
            setText("")
        }, 5000);
    
        return function cleanup() {
            clearTimeout(timer);
        }
       
    }, [props.message])

    return (
        <strong data-testid="flash-notice-text" style={{color: "red"}}>
            {text}
        </strong>
    )
    
    
}

export default FlashMessage
