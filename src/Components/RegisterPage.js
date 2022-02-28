import {useState} from 'react'
import { useHistory } from 'react-router'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Formik,Form} from 'formik'
import * as Yup from 'yup'

import FormControl from '../Formik/FormControl'

function RegisterPage() {
    const [message,setMessage] = useState('');
    const initialState = { alt: "", src: "" };
    const [{ alt, src }, setPreview] = useState(initialState);
    const history = useHistory();
    const initialValues = {
        username : '',
        email : '',
        profilePhoto:'',
        password : '',
        confirmpassword : ''
    }
    const validationSchema = Yup.object({
        username : Yup.string().required('Name is mandatory').min(3, 'Name must atleast contain 3 characters'),
        email: Yup.string().email('Enter valid email').required('Email is required'),
        profile: Yup.string().required(),
        password : Yup.string()
            .required('Please Enter your password')
            .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,}$/,
            "Must Contain 5 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
        confirmpassword : Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
    })
    const onSubmit = async (values) => {
        values.profilePhoto = src;
        console.log(values);
        const { username, email, password, profilePhoto} = values
        try{
            const result = await axios.post(`http://localhost:5000/api/auth/register`, { username, email, password, profilePhoto})
            history.push('/login')
        }catch(error){
            setMessage(error.response.result.message || error.response.result.error)
        }  
    }

    const fileHandler = files  => {
        setPreview(
            files.length
                ? {
                    src: URL.createObjectURL(files[0]),
                    alt: files[0].name
                }
                : initialState
        );
        console.log(alt);
    }
    return (
        <div className="card align">
            <div className="card-body">
                <h5 className="card-title  text-center font-heading">Register</h5>
                <p className='text-danger'>{message}</p>
                <Formik initialValues = {initialValues} validationSchema = {validationSchema} onSubmit= {onSubmit} >
                    {
                        (formik) => (
                            <Form>
                                <FormControl control = 'input' type= 'text' placeholder = 'UserName' name='username' />
                                <FormControl control='input' type='email' placeholder='Email' name='email' />
                                <FormControl control = 'input' type= 'password' placeholder = 'Password' name='password' />
                                <FormControl control = 'input' type= 'password' placeholder = 'Confirm Password' name='confirmpassword' />
                                <input accept="image/*" type='file' name='profilePhoto' onChange={(event) => {
                                    const files = event.target.files;
                                    fileHandler(files);
                                    formik.setFieldValue("profile", files);
                                }} />
                                {src ? <img className="preview" src={src} alt={alt} /> : ''}            
                                <button type='submit' className='my-4 btn btn-block btn-success'>Register</button>
                            </Form>
                        )
                    }
                </Formik>
                <span className='small'>
                    Already have an account?    
                    
                    <Link to='/login' style={{ textDecoration: 'none' }}>    Login</Link> 
                </span>
            </div>
        </div>
    )
}

export default RegisterPage
