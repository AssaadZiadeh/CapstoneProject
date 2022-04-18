import React from 'react'
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { logout } from '../ReduxSlices/AuthSlice.js';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from './Sidebar.js';
import Databar from './Databar.js';
import '../Styles/Dashboard.css';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PortfolioSummary from './PortfolioSummary.js';
import Investments from './Investments';
import Leaderboard from './Leaderboard';
import CompanyProfile from './CompanyProfile.js';
import Trade from './Trade';
import Friend from './Friend';
import Checkout from './Checkout.js';
import Sale from "./Sale.js";


export default function Dashboard() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { section } = useParams();

  const handleLogout = () => {
    dispatch(logout());
    setUser(null);
    navigate('/');
  }

  useEffect(()=> {
    console.log(section);
    if(!user) navigate('/');
  }, []);

  return (
    <div className="dashboard-container">
          <Sidebar className="sidebar" username={user?.username} />
          <Databar user={user?user:null} />
          <LogoutOutlinedIcon onClick={handleLogout} className="logout-icon" />
          {
            section==='portfolio'?<PortfolioSummary />:
            section==='investments'?<Investments />:
            section==='trade'?<Trade />:
            section==='leaderboard'?<Leaderboard />:
            section==='checkout'?<Checkout />:
            section==='sale'?<Sale />:
            section==='friend'?<Friend />:
            section==='company'?<CompanyProfile />:navigate('/')
          } 
    </div>
  )
}
