import React from 'react'

function TextError(props) {
    return (
        <div style = {{color:"rgb(255,0,0,0.8)",fontSize:'15px',paddingTop:'5px'}}>
            {props.children}
        </div>
    )
}

export default TextError