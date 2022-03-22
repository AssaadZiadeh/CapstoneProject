import React from 'react';
import "../Styles/LandingPage.css";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Blob1 } from '../SVGs/Blob1.svg';
import { ReactComponent as Blob2 } from '../SVGs/Blob2.svg';
import { ReactComponent as WomanStanding } from '../SVGs/WomanStanding.svg';
import { ReactComponent as MoneyLogo } from '../SVGs/Logo.svg';

export default function LandingPage() {

  const navigate = useNavigate();

  return (
    <div className="container">
        <div className="logo-container">
            <MoneyLogo className="money-logo"/>
            <p className="brand-name">STOCKIFY</p>
        </div>
        <Blob1 className="big-blob"/>
        <Blob2 className="small-blob"/>
        <WomanStanding className="woman-standing"/>
        <div className="description-container">
             <h1 className="title">Stock Simulator</h1>
             <p className="description">Let Your Virtual Money Work For You.<br /> Begin the journey risk free.</p>
             <div className="buttons">
                 <button 
                 className="button-1"
                 onClick={() => navigate('/authentication/signup')}
                 >Join Now </button>
                 <button 
                 className="button-2" 
                 onClick={() => navigate('/authentication/login')}>Login</button>
             </div>
        </div>
       
    </div>
  )
}
