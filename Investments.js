import React, { useEffect, useState } from 'react'
import '../Styles/Investments.css';
import CurrencyFormat from 'react-currency-format';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import { setTrade } from '../ReduxSlices/SaleSlice.js';
import { setQuantity } from '../ReduxSlices/SaleSlice.js';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router';
import { keyboard } from '@testing-library/user-event/dist/keyboard';

export default function Investments() {

  const [stocks, setStocks] = useState(JSON.parse(localStorage.getItem('user')).stocks);
  const [stockData, setStockData] = useState(JSON.parse(localStorage.getItem('stocks')));
  const [loading, setLoading] = useState(true);
  const [totalInvested, setTotalInvested] = useState(0);
  const [totalChange, setTotalChange] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    stocks.forEach((item, i, self) => {
      stockData && Object.values(stockData).forEach((currentStock) => {
        if(self[i].symbol === currentStock.symbol) {
          self[i] = {...self[i], ...currentStock};
        }
      })
    });
    let cashInvested = 0;
    let change = 0;
    stocks.forEach((stock) => {
      cashInvested += (stock.purchasePrice * stock.quantity);
      change += (stock.ask*stock.quantity)-(stock.purchasePrice*stock.quantity);
    });

    setTotalChange(change);
    setTotalInvested(cashInvested);
    setLoading(false);
  }, []);


  const sellStock = (stock, quantity) => {
    dispatch(setTrade(stock));
    dispatch(setQuantity(quantity));
    navigate("/dashboard/sale");
  };

  return (
    <div className="investments-container">
      <div className="investments-header">
        <p className="info-container">Total Cash Invested:<CurrencyFormat 
            value={totalInvested} 
            displayType={'text'} 
            thousandSeparator={true} 
            prefix={'$'}
            decimalScale={2}
            renderText={value => <div className="display-flex"> <p className="value-text green-text">{value}</p></div> }  /> </p>
          
          <p className="info-container">Total Change:<CurrencyFormat 
            value={totalChange} 
            displayType={'text'} 
            thousandSeparator={true} 
            prefix={'$'}
            decimalScale={2}
            renderText={value => <div className="display-flex">{totalChange>0?<ArrowDropUpIcon className="green-text" /> : <ArrowDropDownOutlinedIcon className="red-text" />} <p className={"value-text" + (totalChange>0?" green-text":" red-text")}>{value}</p></div> }  /></p>
          

      </div>

    <table className="table">
      <thead>
          <tr>
            <th>Symbol</th>
            <th>Company Name</th>
            <th>Current Price</th>
            <th>Today's Change</th>
            <th>Purchase Price</th>
            <th>Quantity</th>
            <th>Total Value</th>
            <th>Total Gain/Loss</th>
            <th>Action</th>
          </tr>
      </thead>
      <tbody>
      {!loading && stocks.map((stock) => <tr className="row">
          <td>{stock.symbol}</td>
          <td>{stock.shortName}</td>
          <td>
            <CurrencyFormat 
            value={stock.ask} 
            displayType={'text'} 
            thousandSeparator={true} 
            prefix={'$'}
            decimalScale={2}
            renderText={value => <div className="display-flex">{stock.ask>stock.purchasePrice?<ArrowDropUpIcon className="green-text" /> : <ArrowDropDownOutlinedIcon className="red-text" />} <p className={"value-text row-data" + (stock.ask>stock.purchasePrice?" green-text":" red-text")}> {value}</p></div> }  /></td>
          <td>
          <CurrencyFormat 
            value={stock.tradable?stock.preMarketPrice:0} 
            displayType={'text'} 
            thousandSeparator={true} 
            prefix={'$'}
            decimalScale={2}
            renderText={value => <div className="display-flex">{stock.ask>stock.purchasePrice?<ArrowDropUpIcon className="green-text" /> : <ArrowDropDownOutlinedIcon className="red-text" />} <p className={"value-text row-data" + (stock.ask>stock.purchasePrice?" green-text":" red-text")}> {value}</p></div> }  />
          </td>
          <td>
            <CurrencyFormat 
            value={stock.purchasePrice} 
            displayType={'text'} 
            thousandSeparator={true} 
            prefix={'$'}
            decimalScale={2}
            renderText={value => <div className="display-flex">{stock.ask>stock.purchasePrice?<ArrowDropUpIcon className="green-text" /> : <ArrowDropDownOutlinedIcon className="red-text" />} <p className={"value-text row-data" + (stock.ask>stock.purchasePrice?" green-text":" red-text")}> {value}</p></div> }  />
          </td>
          <td>{stock.quantity}</td>
          <td>
          <CurrencyFormat 
            value={stock.ask * stock.quantity} 
            displayType={'text'} 
            thousandSeparator={true} 
            prefix={'$'}
            decimalScale={2}
            renderText={value => <div className="display-flex">{stock.ask>stock.purchasePrice?<ArrowDropUpIcon className="green-text" /> : <ArrowDropDownOutlinedIcon className="red-text" />} <p className={"value-text row-data" + (stock.ask>stock.purchasePrice?" green-text":" red-text")}> {value}</p></div> }  />
          </td>
          <td>
          <CurrencyFormat 
            value={(stock.ask*stock.quantity)-(stock.purchasePrice*stock.quantity)} 
            displayType={'text'} 
            thousandSeparator={true} 
            prefix={'$'}
            decimalScale={2}
            renderText={value => <div className="display-flex">{stock.ask>stock.purchasePrice?<ArrowDropUpIcon className="green-text" /> : <ArrowDropDownOutlinedIcon className="red-text" />} <p className={"value-text row-data" + (stock.ask>stock.purchasePrice?" green-text":" red-text")}> {value}</p></div> }  />
          </td>
          <td><button 
          onClick={() => sellStock(stock, stock.quantity)}
          className="sell-button">Sell</button></td>
        </tr>)}

      </tbody>
        
    </table>
</div>
  )
}
