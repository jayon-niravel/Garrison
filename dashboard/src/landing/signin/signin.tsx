import React, { useState } from 'react';
import AuthAPIService from "../../api/auth.api";
import { useNavigate } from 'react-router-dom';
import './signin.css';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const onSubmit =  async () => {
        setIsSubmitting(true);
      // submit the data
      const payload = {
        email: email,
        password: password,
      }
      const [data, error] = await AuthAPIService.signin(payload);
      setIsSubmitting(false);
      if(error) {
      } else {
        sessionStorage.setItem("token", data.accessToken);
        navigate('/dashboard/list');
      }

    }

  return (
    <div className="login-container">
      <div className="flex-item">
        <h2 className='text-center'>SIGN IN</h2>
        <form role="form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" className="form-control" id="email"
            onChange={(ev) => setEmail(ev.target.value)} placeholder="Enter email"></input>
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Password</label>
            <input type="password" className="form-control" id="pwd"
            onChange={(ev) => setPassword(ev.target.value)} placeholder="Enter password"></input>
          </div>
          <div className='text-center'>
            <button disabled={isSubmitting}  type="submit" className="btn btn-primary " onClick={onSubmit}>
              Login
              {isSubmitting && <span>...</span>} 
              </button>
          </div>
        </form>
      </div>
    </div>          
  );

}
