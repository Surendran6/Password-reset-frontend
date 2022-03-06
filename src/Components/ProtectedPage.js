import React, { useState,useEffect } from 'react'
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router'
import axios from 'axios'
import {useSelector,useDispatch} from 'react-redux';
import{author} from './Redux/Actions'


function ProtectedPage() {
    const history = useHistory();    
    // const [content,setContent] = useState(false);
    const accessLogin = useSelector(state => state.accessLogin)
    const dispatch = useDispatch();
 
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
            dispatch(author());            
        }
        if(token !== null){          
          fetchData();
        }       
    }, [])
    
    const logoutHandler = () => {
        localStorage.removeItem('auth-token');        
       
        history.push('/login')
    }
    return (   
            <>
            {
                accessLogin
                ?
                <div>
                
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
    )
}

export default ProtectedPage
