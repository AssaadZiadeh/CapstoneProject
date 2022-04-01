import React from 'react'
import { useState } from 'react';
import '../Styles/LoginForm.css';
import { ReactComponent as MailIcon } from '../SVGs/Mail.svg';
import { ReactComponent as PasswordIcon } from '../SVGs/Lock.svg';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import  axios  from 'axios';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch } from 'react-redux';
import { login } from '../ReduxSlices/AuthSlice.js';


export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const Alert = () => {
      return (
        <div className="alert-container">
          <ErrorOutlineOutlinedIcon sx={{color: 'white'}} className="error-icon" />
          <p className = "alert-message">The Username or Password is Wrong!</p>
          <CloseOutlinedIcon 
          sx={{color: 'white'}} 
          className="close-icon"
          onClick={() => setLoginError(false)}
          />
        </div>
      )
    }



    const handleLogin = () => {
        setLoading(true);
        const data = {
            email: email,
            password: password
        }
        axios.post("http://localhost:3001/login-user", data).then((res) => {
            console.log(res.data);
            if(!res.data) {
                console.log("Empty object")
                setLoginError(true);
                setLoading(false);
            } else {
              setLoading(false);
              dispatch(login(res.data));
              navigate('/dashboard/performance');
            }

        });
    }

  return (
    <div className="form-container">
      <div className="form-header">
          <p className = "form-title">Invest Now</p>
          <p className = "subtitle">Create an account or log <br />into yours</p>
      </div>

      {loading && <CircularProgress /> }
      {loginError && Alert()}
      <div className="email-container">
        <div className="email-header">
          <MailIcon className="mail-icon"/>
          <p className="email">Email</p>
        </div>
        <FormControl autoComplete="off" sx={{ m: 1, width: '25ch' }} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-email"
            type='email'
            value={email}
            autoComplete="off"
            className="email-input"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Please enter email..."
            label="Email"
          />
          </FormControl> 
      </div>
        <div className="password-container">
            <div className="password-header">
              <PasswordIcon className="password-icon"/>
              <p className="password">Password</p>
            </div>
            <FormControl autoComplete="off" sx={{ m: 1, width: '25ch' }} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            className="password-input"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Please enter password..."
            autoComplete="off"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(prev => !prev)}
                  edge="end"
                  className="icon-button"
                >
                  {showPassword ? <VisibilityOff className = "visibility-icon" /> : <Visibility className="visibility-icon" />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          </FormControl> 
        </div> 


      <div className="login-buttons">
        <button 
        className="login-button"
        onClick={handleLogin}>Login</button>
        <button 
        className="create-button"
        onClick={() => navigate('/authentication/signup')}
        >Create Account</button>
      </div>

      </div>

  )
}
