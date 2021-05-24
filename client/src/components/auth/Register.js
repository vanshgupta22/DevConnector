import React from 'react'
import { Fragment , useState } from 'react';
//import axios from 'axios';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';



 const Register = ({setAlert}) => {// here we destructured setAlerts from props

    const [formData , setFormData] = useState({
        name :"",
        email : "",
        password : "",
        password2 : ""
    })

    const {name , email , password , password2} = formData;

    const onChange = (event) => {
        setFormData({...formData , [event.target.name] : event.target.value});
    }

    const onSubmit = async (event) =>{
        event.preventDefault(); // to stop refresh
        if(password !== password2){
            setAlert("Passwords don't match" , 'danger' , 3000  );
        }else{
            console.log("SUCCESS");
        //     const newUser = {
        //         name ,
        //         email,
        //         password
        //     }

        //    try {
        //        const config = {
        //            headers : {
        //                "Content-Type" : "application/json"
        //            }
        //        }
        //        const body = JSON.stringify(newUser);

        //        const res = await axios.post("/api/users" , body , config); // as we have used proxy so no need to write https://localhost stuff.

        //       console.log(res.data);
               
        //    } catch (err) {
        //        console.error(err.response.data)
               
        //    }
        }
    }


    return  <Fragment>
              <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>

      <form className="form" onSubmit = {e => onSubmit(e)}>
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" onChange = {e => onChange(e) } value = {name} required  />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" onChange = {e => onChange(e) } value = {email} required/>
          <small className="form-text">This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small>
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
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            onChange = {e => onChange(e) } value = {password2}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
        </Fragment>
    
}

Register.propTypes = {
  setAlert : PropTypes.func.isRequired
}

export default connect(null , {setAlert})(Register);