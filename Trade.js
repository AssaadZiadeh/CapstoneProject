import React from 'react'
import '../Styles/Trade.css';
import { useState, useEffect } from 'react';
import  axios  from 'axios';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Paper from '@mui/material/Paper';
import LineChart from './LineChart.js';
import CurrencyFormat from 'react-currency-format';
import CircularProgress from '@mui/material/CircularProgress';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import MarketStatus from './MarketStatus.js';

export default function Trade() {
  const [name, setName] = useState("");
  const [names, setNames] = useState([]);
  const [symbol, setSymbol] = useState("");
  const [symbols, setSymbols] = useState([]);
  const [stock, setStock] = useState();
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [chartData, setChartData] = useState();
  const [marketStatus, setMarketStatus] = useState(true);

  // useEffect(() => {
  //   axios.get("http://localhost:3001/market-status").then((res) => {
  //     console.log(res.data);
  //   });
  // }, []);

  useEffect(() => {
    axios.post("http://localhost:3001/search-company-name", {name: name}).then((res) => {
      setNames(res.data);
    });
  }, [name]);


  useEffect(() => {
    axios.post("http://localhost:3001/search-company-symbol", {symbol: symbol}).then((res) => {
      setSymbols(res.data);
      
    });
  }, [symbol]);

  useEffect(() => {
    console.log(stock);
  }, [stock]);
  

  const handleSymbolClick = async () => {
    setLoading(true);
    await axios.post("http://localhost:3001/get-history-symbol", {symbol:symbol}).then((res) => {
      drawChart(res.data);
      axios.post("http://localhost:3001/get-stock-price-symbol", {symbol: symbol}).then((res) => {
        setStock(res.data);
      })
    })
    console.log(stock);
    setLoading(false);
  };

  const handleNameClick = async () => {
    setLoading(true);
    await axios.post("http://localhost:3001/get-history-name", {name:name}).then((res) => {
      drawChart(res.data);
      axios.post("http://localhost:3001/get-stock-price-symbol", {symbol: res.data["Meta Data"]["2. Symbol"]}).then((res) => {
        setStock(res.data);
      })
    });
    setLoading(false);
  }

  const purchaseStock = () => {
    axios.post("http://localhost:3001/purchase-existing", {symbol: symbol, quantity: quantity, stock: stock}).then((res) => {
      console.log("Purchase successfully!");
    })
  }

    const drawChart = async (data) => {
      
    let labels = [];
    let values = [];
    for(var key in data["Monthly Time Series"]) {
      labels.push(key)
      if (data["Monthly Time Series"].hasOwnProperty(key)) {
        values.push(data["Monthly Time Series"][key]["1. open"]);
    }
    };

    labels = labels.length>12?labels.slice(0,60).reverse():labels.reverse();
    values = values.length>12?values.slice(0,60).reverse():values.reverse();

    console.log(values[0] - values[values.length-1]);
    let color = "#8D021F"; 
    if(values[0] > values[values.length - 1]) {
      color = "#50C878";
    }
    // if(values[0] < values[values.length-1]) {
    //   color = "#50C878"
    // } else { color = "#8D021F"}
    console.log(color);
    setChartData({
        labels: labels,
        datasets: [
          {
            label: `${data["Meta Data"]["2. Symbol"]} Price in USD for the Last ${values.length} Month`,
            data: values,
            borderColor: [
              color
            ],
            backgroundColor: [
              color
            ],
            pointRadius: 0,
            borderWidth: 1
          }
        ]
      });
  };

  return (
    <div className="trade-container">

      <MarketStatus marketStatus={true} />
      
      <div className="search-container">
        <div className="search-section">

    <h3 className="search-header">Searching for a company by name: </h3>
    <Autocomplete
          freeSolo 
          id="company-name-search"
          style={{color: 'white !important'}}
          placeholder="Enter company name..."
          disableClearable
          options={names.map((option) => option.Name)}
          disabled={!marketStatus||symbol!==""}
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
        disabled = {!marketStatus||symbol!==""}> 
        Search By Name
      </button>

        </div>

        <div className="search-section">
          

      <h3 className="search-header">Searching for a company by symbol: </h3>
      

      <Autocomplete
          freeSolo  
          id="company-symbol-search"
          placeholder="Symbol"
          disableClearable
          options={symbols.map((option) => option.Symbol)}
          disabled={!marketStatus||name!==""}
          onChange={(e, v) => {setSymbol(v);}}
          className="company-input"
          PaperComponent={({ children }) => (
          <Paper style={{ background: "#151D2C", color: "white" }}>{children}</Paper>
         )}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Enter Company Symbol..."
              InputProps={{
                ...params.InputProps,
                type: 'search',
              }}
              sx={{color: 'white'}}
              onChange = {(event) => setSymbol(event.target.value)}
              value={symbol}
            />
        )}
      />
      <button 
        className="search-button"
        onClick={handleSymbolClick}
        disabled={!marketStatus||name}
        >Search By Symbol</button>
        
        </div>
      </div>

      {loading===true?<div className="loading-container"><p className="loading-text">Fetching Financial Data...   </p><CircularProgress color="success" /></div>:chartData && <div className="chart">
        <LineChart chartData = { chartData } />
        {stock && <div className="stock-price-container">
          <h2 className="stock-price-text">The current price of {stock["Global Quote"]["01. symbol"]} : </h2> 
          <CurrencyFormat 
                value={stock["Global Quote"]["05. price"]} 
                displayType={'text'} 
                thousandSeparator={true} 
                prefix={'$'}
                decimalScale={2}
                renderText={value => <p className="stock-price"> {value}</p>}  /> </div>}
        </div>}

      <div className="purchase-info-container">
            <div className="quantity-container">
            <h3 className="search-header">Enter Quantity of Stock to Purchase: </h3>
          <input 
          type="number" 
          placeholder="Enter desired quantity..." 
          className="quantity-input"
          disabled={!marketStatus}
          min="0" />
          </div>
          <div className="purchase-type-container">
            <h3 className="search-header">Select the Type of the Purchase: </h3>
            <div className="options">
                  <FormControl>
                        <RadioGroup
                          row
                          aria-labelledby="stock-type-options"
                          defaultValue="long"
                          name="radio-buttons-group"
                          disabled={!marketStatus}
                        >
                          <FormControlLabel value="long" control={<Radio disabled={!marketStatus} color="success" />} label="Long" />
                          <FormControlLabel value="short" control={<Radio disabled={!marketStatus} color="success" />} label="Short" />
                        </RadioGroup>
                  </FormControl>
                  </div>

          </div>
      </div>
      
      <div className="purchase-buttons-container">
        <button 
          className="purchase-button"
          disabled={!marketStatus}
          onClick={() => {}}
          >Purchase</button>

        <button 
          className="new-search-button"
          disabled={!marketStatus}
          onClick={() => {
            setChartData();
            setSymbol("");
            setName("");
          }}
          >New Search</button>
      </div>


      {/* <button 
        className="search-button"
        onClick={purchaseStock}
        disabled={quantity===0||stock==={}}>Purchase</button>
            <br /> */} 
    </div>
  )
}


  
