import React from 'react'
import { useState, useEffect } from 'react';
import '../Styles/LoginForm.css';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import  axios  from 'axios';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EnhancedEncryptionOutlinedIcon from '@mui/icons-material/EnhancedEncryptionOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import '../Styles/SignupForm.css';


export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordClone, setPasswordClone] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordClone, setShowPasswordClone] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const navigate = useNavigate();


    const Alert = () => {
      return (
        <div className="alert-container" style={{width: '75%', marginBottom: '2vh'}}>
          <ErrorOutlineOutlinedIcon sx={{color: 'white'}} className="error-icon" />
          <p className = "alert-message">Passwords Don't Match!</p>
          <CloseOutlinedIcon 
          sx={{color: 'white'}} 
          className="close-icon"
          onClick={() => setPasswordError(false)}
          />
        </div>
      )
    }

    const handleSignUp = () => {

      axios.post("http://localhost:3001/save-new-user", {
        username : username,
        email: email,
        password: password
      }).then((res) => {
        console.log(res);
      })
    }

    useEffect(() => {
      if(password !== passwordClone && !passwordError) setPasswordError(true);
      else if(password === passwordClone) setPasswordError(false);
    }, [passwordClone])

    const handleCreateAccount = () => {
        if(password !== passwordClone) {
            setPasswordError(true);
            return;
        }
    };


    const iconConfig = {
              color: '#D1709E',
              width: '2vw',
              height: '3.5vh',
              paddingTop: '.5vh'
    };




  return (
    <div className="signup-form-container">
      <div className="form-header">
          <p className = "form-title">Invest Now</p>
          <p className = "subtitle">Create an account or log <br />into yours</p>
      </div>

      {passwordError && Alert()}

       {/* Username Section */}

      <div className="email-container">
        <div className="email-header">
          <PersonOutlineOutlinedIcon sx={iconConfig} />
          <p className="email">Username</p>
        </div>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-email"
            autoComplete="off"
            type='email'
            value={username}
            className="email-input"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Choose a username..."
            label="Username"
          />
          </FormControl> 
      </div>

      {/* Email Section  */}

      <div className="email-container">
        <div className="email-header">
          <EmailOutlinedIcon
          sx={iconConfig}
          />
          <p className="email">Email</p>
        </div>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-email"
            autoComplete="off"
            type='email'
            value={email}
            className="email-input"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Please enter email..."
            label="Email"
          />
          </FormControl> 
      </div>
        
        {/* Password Section : */}

        <div className="password-container">
            <div className="password-header">
              <LockOutlinedIcon
              sx={iconConfig}
              />
              <p className="password">Password</p>
            </div>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
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

        {/* Password Verification: */}

        <div className="password-container">
            <div className="password-header">
              <EnhancedEncryptionOutlinedIcon 
              sx={iconConfig}
              />
              <p className="password">Password Verification</p>
            </div>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPasswordClone ? 'text' : 'password'}
            value={passwordClone}
            className="password-input"
            onChange={(e) => setPasswordClone(e.target.value)}
            placeholder="Enter password again..."
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPasswordClone(prev => !prev)}
                  edge="end"
                  className="icon-button"
                >
                  {showPasswordClone ? <VisibilityOff className = "visibility-icon" /> : <Visibility className="visibility-icon" />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          </FormControl> 
        </div> 


      <div className="login-buttons">
        <button className="create-button" 
        onClick={handleSignUp}
        >Create Account</button>
        <button 
        className="login-button"
        onClick={() => navigate('/authentication/login')}
        >Login</button>
      </div>

      </div>

  )
}
