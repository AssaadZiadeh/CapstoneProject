import React, { useEffect, useState } from 'react'
import '../Styles/PortfolioSummary.css';
import { Autocomplete } from '@mui/material';
import { Paper } from '@mui/material';
import axios from 'axios';
import { TextField } from '@mui/material';
import { ReactComponent as Searching } from '../SVGs/Searching.svg';
import { useDispatch } from 'react-redux';
import { setFriend } from '../ReduxSlices/FriendSlice';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router';

export default function PortfolioSummary() {
  const [name, setName] = useState("");
  const [names, setNames] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    //Update names:
    axios.post("http://localhost:3001/search-users", {name: name}).then((res) => {
        setNames(res.data);
    });
  
  }, [name]);
  
  const searchUser = () => {
    axios.post("http://localhost:3001/search-user-by-name", {name: name}).then((res) => {
      console.log(res.data);
      dispatch(setFriend(res.data));
      navigate('/dashboard/friend');
    })
  }

  return (
    <div className="portfolio-container">
      <h3 className="search-title">Find out how rich your friends are </h3>
      <div className="illustrations">
          {/* <RedBlob className="red-blob" /> */}
          <Searching className="image-container" />
      </div>
      <div className="user-search-container">
      <Autocomplete
          freeSolo 
          id="user-search"
          style={{color: 'white !important'}}
          placeholder="Enter Friend Name..."
          disableClearable
          defaultValue={{username:""}}
          options={names.map((option) => option.username)}
          value={name}
          onChange={(e, v) => {setName(v);}}
          className="company-input"
          PaperComponent={({ children }) => (
          <Paper style={{ background: "#151D2C", color: "white" }}>{children}</Paper>
         )}
          renderInput={(params) => (
            <TextField
              {...params}
              id="textfield-name"
              placeholder="Enter Friend Name..."
              InputProps={{
                ...params.InputProps,
                type: 'search',
                
              }}
              value={name}
              onChange = {(event) => setName(event.target.value)}
            />
        )}
      />
      <button 
      className="friend-search-button"
      onClick={searchUser}>
        Search
        <SearchIcon />
      </button>

      </div>
     
    </div>
  )
}
