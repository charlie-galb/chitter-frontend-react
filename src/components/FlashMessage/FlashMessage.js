import React, {useState, useEffect} from 'react'

const FlashMessage = (props) => {

    const [text, setText] = useState("")

    useEffect(() => {
        setText(props.message)
        setTimeout(() => {
            setText("")
        }, 5000)
    }, [props.message])

    return (
        <strong data-testid="flash-notice-text" style={{color: "red"}}>
            {text}
        </strong>
    )
    
    
}

export default FlashMessage
