import React from 'react'
import {Link} from 'react-router-dom';
import { Fragment , useState } from 'react';

const Login = () => {

    const [formData , setFormData] = useState({
        email : "",
        password : ""
    })

    const { email , password } = formData;

    const onChange = (event) => {
        setFormData({...formData , [event.target.name] : event.target.value});
    }

    const onSubmit = async (event) =>{
        event.preventDefault(); // to stop refresh
       
            console.log("SUCCESS");
    }


    return  <Fragment>
              <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i>Sign in to Your Account</p>

      <form className="form" onSubmit = {e => onSubmit(e)}>
        
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" onChange = {e => onChange(e) } value = {email} required/>
          
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            onChange = {e => onChange(e) } value = {password}
          />
        </div>
       
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
        </Fragment>
    
}

export default Login;