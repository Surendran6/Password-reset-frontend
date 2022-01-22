import React from 'react'
import {Field,ErrorMessage} from 'formik'
import TextError from './TextError'
import {Link} from 'react-router-dom'

function Input(props) {
    const {label,name,...rest} = props
    return (
        <div className="mb-3 form-group">
            <label htmlFor = {name} className="text-info">{label}</label>
            {props.additional && <Link to='/forgotpassword' style={{color:"rgb(255,0,0,0.8)",float:'right',paddingTop: '5px',paddingBottom: '5px'}} className='small'>  Forgot Password?</Link>}
            <Field className ="form-control" id={name} name={name} {...rest} />
            <ErrorMessage name={name} component = {TextError} />
        </div>
        
    )
}

export default Input