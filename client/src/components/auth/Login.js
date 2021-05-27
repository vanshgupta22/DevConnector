import React from 'react'
import {Link , Redirect} from 'react-router-dom';
import { Fragment , useState } from 'react';
import {login} from '../../actions/auth';
import {connect } from 'react-redux';
import PropTypes from 'prop-types';

const Login = ({login , isAuthenticated}) => {

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
        login(email,password);  
    }

      // redirected after logging in
    if(isAuthenticated){
     return <Redirect to = "/dashboard" />  
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

Login.propTypes = {
  login : PropTypes.func.isRequired,
  isAuthenticated : PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated : state.auth.isAuthenticated
})

export default connect(mapStateToProps , {login})(Login);