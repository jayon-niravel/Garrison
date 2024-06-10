import React, { useState } from 'react';
import AuthAPIService from "../../api/auth.api";
import { useNavigate } from 'react-router-dom';
import './signup.css';

export default function Signup() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  async function onSubmit() {
        setIsSubmitting(true);
      // submit the data
      const payload = {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
      }
      const [data, error] = await AuthAPIService.signup(payload);
      setIsSubmitting(false);
      if(error) {
      } else {
        navigate('/');
      }

    }


  return (
    <div className="login-container">
      <div className="flex-item">
        <h2 className='text-center'>SIGN UP</h2>
        <form role="form">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input type="text" className="form-control" id="firstName"
            onChange={(ev) => setFirstName(ev.target.value)} placeholder="Enter first name"></input>
          </div>
          <div className="form-group">
            <label htmlFor="text">Last Name</label>
            <input type="email" className="form-control" id="lastName"
            onChange={(ev) => setLastName(ev.target.value)} placeholder="Enter last name"></input>
          </div>             
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input type="number" className="form-control" id="phoneNumber"
            onChange={(ev) => setPhoneNumber(ev.target.value)} placeholder="Enter phone number"></input>
          </div>                 
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" className="form-control" id="email"
            onChange={(ev) => setEmail(ev.target.value)} placeholder="Enter email"></input>
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Password</label>
            <input type="password" className="form-control" id="password"
            onChange={(ev) => setPassword(ev.target.value)} placeholder="Enter password"></input>
          </div>
          <div className='text-center'>
            <button disabled={isSubmitting}  type="submit" className="btn btn-primary " onClick={onSubmit}>
              Sign Up
              {isSubmitting && <span>...</span>} 
              </button>
          </div>
        </form>
    </div>
    </div>          
  );
}
