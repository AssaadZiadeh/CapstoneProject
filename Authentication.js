import React from 'react'
import "../Styles/LoginPage.css";
import { ReactComponent as MoneyLogo } from '../SVGs/Logo.svg';
import { ReactComponent as Blob3 } from '../SVGs/Blob3.svg';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { useParams } from 'react-router-dom';

export default function Authentication() {
  
  const { type } = useParams();


  console.log(type);
  
  return (
    <div>
        <div className="logo-container">
            <MoneyLogo className="money-logo"/>
            <p className="brand-name">STOCKIFY</p>
        </div>

        <div className="login-container">
          <div className="login-form">
           {type==='login'? <LoginForm /> : <SignupForm />}
          </div>
        </div>
       

        <div className="illustration-background">
            <Blob3 className = "pink-blob" />
            <div className="running-man" >
            </div>
        </div>
    </div>
  )
}
