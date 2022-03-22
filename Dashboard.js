import React from 'react'
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { logout } from '../ReduxSlices/AuthSlice.js';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from './Sidebar.js';
import Databar from './Databar.js';
import '../Styles/Dashboard.css';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Performance from './Performance.js';
import Investments from './Investments';
import Leaderboard from './Leaderboard';
import Trade from './Trade';


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
    if(!user) navigate('/');
  }, []);

  return (
    <div className="dashboard-container">
          <Sidebar className="sidebar" username={user?.username} />
          <Databar user={user?user:null} />
          <LogoutOutlinedIcon onClick={handleLogout} className="logout-icon" />
          {
            section==='performance'?<Performance />:
            section==='investments'?<Investments />:
            section==='trade'?<Trade />:
            section==='leaderboard'?<Leaderboard />:navigate('/')
          } 
    </div>
  )
}
