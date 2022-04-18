import React from 'react'
import '../Styles/Sidebar.css';
import { ReactComponent as MoneyLogo } from '../SVGs/Logo.svg';
import StarPurple500OutlinedIcon from '@mui/icons-material/StarPurple500Outlined';
import { useNavigate, useParams } from 'react-router-dom';



export default function Sidebar({username}) {

    const navigate = useNavigate();
    const { section } = useParams();

  return (
      <div className="sidebar-container">
            <div className="logo-container">
                <MoneyLogo className="money-logo" style={{fill: 'rgb(144,223,170)'}} />
                <p className="brand-name">STOCKIFY</p>
            </div>
            <div className="username-container">
                <div className="avatar"></div>
                <div className="user-info-container">
                    <p className="username-text">{username}</p>
                    <p className="rank-text"><StarPurple500OutlinedIcon style={{width: '1vw', height: '2vh'}} /> <strong>Current Rank: </strong><br />4th of 10,000 Investors</p>
                </div>
            </div>

            <div className="buttons-container">
                <button 
                className={"section-button" + (section==='portfolio'?" chosen":"")}
                onClick={() => {navigate('/dashboard/portfolio')}}
                >Portfolio</button>
                <button 
                className={"section-button" + (section==='trade'?" chosen":"")}
                onClick={() => {navigate('/dashboard/trade')}}
                >Trade</button>
                <button 
                className={"section-button" + (section==='investments'?" chosen":"")}
                onClick={() => {navigate('/dashboard/investments')}}
                >Investments</button>
                <button 
                className={"section-button" + (section==='leaderboard'?" chosen":"")}
                onClick={() => {navigate('/dashboard/leaderboard')}}
                >Leaderboard</button>
                
            </div>
      </div>
  )
}
