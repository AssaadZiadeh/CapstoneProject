import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import '../Styles/Friend.css';
import CurrencyFormat from 'react-currency-format';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import axios from 'axios';


export default function Friend() {
    const friend = useSelector((state) => state.friend.friend);
    const [stocks, setStocks] = useState(friend.stocks);
    const [loading, setLoading] = useState(true);
    const [accountValue, setAccountValue] = useState(0);
    const [changeRate, setChangeRate] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if(friend === null) navigate('/dashboard/portfolio');
        const symbols = new Set();
        friend.stocks.forEach((stock) => symbols.add(stock.symbol));
        let symbolString = "";
        symbols.forEach((stock) => symbolString+= stock+",");
        const accountValue = friend.cash;
        console.log(symbolString.substring(0,symbolString.length-1));
        const newArray = stocks.map(stock => stock);
        console.log(newArray);
        axios.post("http://localhost:3001/get-prices", {symbolString}).then((res)=> {
            const updatedStocks = stocks.map(stock => {
                res.data.quoteResponse.result.forEach((stockWithData) => {
                    if(stock.symbol === stockWithData.symbol) {
                        stock = {...stock, ...stockWithData};
                    }
                })
                return stock;
            })
            console.log(updatedStocks);
            setStocks(updatedStocks);
        });

    }, []);

    useEffect(() => {
        let total = friend.cash;
        stocks.forEach((stock) => {
            total += (stock.quantity * stock.purchasePrice);
        })
        setAccountValue(total);
        setChangeRate(((accountValue-100000)/100000)*100);
        setLoading(false);
    }, [stocks]);

  return (
    <div className="friend-container">
        <div className="header-container">
            <div className="friend-header-container">
                <div className="friend-avatar"></div>
                <div className="friend-info-container">
                    <p className="friend-username">{friend.username}</p>
                    <p className="friend-email">Email: {friend.email}</p>
                </div>
            </div>
            <div className="main-info-container">
                <div className="info-line">
                    <p className="value-title">Cash:</p>
                    <CurrencyFormat 
                        value={friend.cash} 
                        displayType={'text'} 
                        thousandSeparator={true} 
                        decimalScale={2}
                        prefix={'$'}
                        renderText={value => <p className={"value-text" + (friend.cash>100000?" green-text":" red-text")}> {friend.cash > 100000?<ArrowDropUpIcon /> : <ArrowDropDownOutlinedIcon />} {value}</p>}  />
                </div>
             
                    {!loading && <div>
                        <div className="info-line">
                            <p className="value-title">Account Value: </p>
                            <CurrencyFormat 
                                value={accountValue} 
                                displayType={'text'} 
                                thousandSeparator={true} 
                                decimalScale={2}
                                prefix={'$'}
                                renderText={value => <p className={"value-text" + (accountValue>100000?" green-text":" red-text")}> {accountValue > 100000?<ArrowDropUpIcon /> : <ArrowDropDownOutlinedIcon />} {value}</p>}  /> 
                            
                        </div>
                        <div className="info-line">
                            <p className="value-title">{changeRate>0?"Growth":"Decline"}</p>
                            <CurrencyFormat 
                                value={changeRate} 
                                displayType={'text'} 
                                thousandSeparator={true} 
                                prefix={'%'}
                                decimalScale={2}
                                renderText={value => <p className={"value-text" + (changeRate>0?" green-text":" red-text")}> {changeRate> 0?<ArrowDropUpIcon /> : <ArrowDropDownOutlinedIcon />} {value}</p>}  /> 
                        </div>
                        
                    </div>}
            
            </div>
        </div>
        <div className="friend-investments">
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
            <th>Purchase Data</th>
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
          <td> 
              <p className="purchase-date">{new Date(stock.createdAt).toDateString()}</p>
          </td>
        </tr>)}

      </tbody>
        
    </table>
        </div>
    </div>
  )
}
