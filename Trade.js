import React from 'react'
import '../Styles/Trade.css';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import  axios  from 'axios';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Paper from '@mui/material/Paper';
import MarketStatus from './MarketStatus.js';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router';
import { setStockData } from '../ReduxSlices/ChartSlice';
import CircularProgress from '@mui/material/CircularProgress';
import { setChartData } from '../ReduxSlices/ChartSlice';
import { ReactComponent as Invest } from '../SVGs/invest.svg';
import { ReactComponent as Finance } from '../SVGs/finance.svg';


export default function Trade() {
  const [name, setName] = useState("");
  const [names, setNames] = useState([]);
  const [symbols, setSymbols] = useState([]);
  const [stock, setStock] = useState();
  const [loading, setLoading] = useState(false);
  const [marketStatus, setMarketStatus] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // useEffect(() => {
  //   axios.get("http://localhost:3001/market-status").then((res) => {
  //     setMarketStatus(res.data.isTheStockMarketOpen);
  //   });
  // }, []);

  useEffect(() => {
    axios.post("http://localhost:3001/search-company-name", {name: name}).then((res) => {
      setNames(res.data);
    });
  }, [name]);


  useEffect(() => {
    console.log(stock);
  }, [stock]);

  useEffect(() => {
    console.log(marketStatus);
  }, [marketStatus]);


  const handleNameClick = async () => {
    setLoading(true);
    await axios.post("http://localhost:3001/get-history-name", {name:name}).then((res) => {
      dispatch(setChartData(res.data));
      axios.post("http://localhost:3001/get-stock-price-symbol", {symbol: res.data["Meta Data"]["2. Symbol"]}).then((res) => {
        dispatch(setStockData(res.data));
        setLoading(false);
        navigate('/dashboard/company');
      })
    });
  }



  return (
      loading?
        <div className="loading-container">
            <p className="loading-text">Fetching Financial Data...   </p>
            <div className="twitch">
              <CircularProgress color="success" className="circular-progress" />  
            </div>
            
        </div>:
      <div className="trade-container">
        <MarketStatus marketStatus={true} />
        <div className='illustrations'>
          <Finance className="illustration-container" />
        </div>
        <div className="search-section">

        <h3 className="search-header">What company do you want to invest in? </h3>
        <Autocomplete
              freeSolo 
              id="company-name-search"
              style={{color: 'white !important'}}
              placeholder="Enter company name..."
              disableClearable
              options={names.map((option) => option.Name)}
              disabled={!marketStatus}
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
              placeholder="Enter Company Name..."
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
          className="search-button"
          onClick={handleNameClick} 
          disabled = {!marketStatus}> 
          Search By Name <SearchIcon />
        </button>

        </div>

        </div>
    
  )
}
