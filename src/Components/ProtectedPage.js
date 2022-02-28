import React, { useState,useEffect } from 'react'
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router'
import axios from 'axios'
import { SpinnerDotted } from 'spinners-react';

function ProtectedPage() {
    const history = useHistory();
    const [flag,setFlag] = useState(true);
    const [content,setContent] = useState(false);
    const [username, setUsername] = useState('');
    const [profilePhoto, setProfilePhoto] = useState('');
    useEffect(() => {
        const token = localStorage.getItem('auth-token')
        async function fetchData(){
            const result = await axios.get(`http://localhost:5000/api/private/Authorized`,
                {
                    headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                    }
                }
            )
            setFlag(false);
            setContent(true);
            setUsername(localStorage.getItem('username'));
            setProfilePhoto(localStorage.getItem('profilePhoto'));
            console.log(localStorage.getItem('username'));
        }
        if(token === null){
            setFlag(false)
        }else{
            fetchData();
        }
        
        
    }, [])
    
    const logoutHandler = () => {
        localStorage.removeItem('auth-token');
        setContent(false)
        history.push('/login')
    }
    return (
        <>
        {
            flag 
            ?
            <div className="d-flex align-items-center justify-content-center" style={{paddingTop:"150px",paddingBottom:"150px"}}>
                <SpinnerDotted /> 
            </div>
            :
            <>
            {
                content
                ?
                <div>
                <img className="preview" src={profilePhoto ? profilePhoto : ''} />
                <span style={{color: 'red'}}>{username}</span>
                <div className='protected-wrapper'>
                    <h1 className='protected-access'>Congrats! You have successfully<br/> 
                                                         logged in to protected route.</h1>
                    <div>
                    <button className='btn btn-primary' onClick={logoutHandler}>Logout</button>
                    </div>
                </div>
                 </div>
                :
                <div className='unauthorized-access'>
                    <p>You aren't authorized to access to page. Login to continue</p>
                    <button class="btn btn-primary"><Link to='/login'><span style={{color:"white"}}>Login</span></Link></button>
                </div>
            }
            </>
        }
        </>
    )
}

export default ProtectedPage
