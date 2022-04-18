import React from 'react'
import '../Styles/Databar.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updatePrices } from '../ReduxSlices/StocksSlice.js';
import CurrencyFormat from 'react-currency-format';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';


export default function Databar({user}) {
    const[accountValue, setAccountValue] = useState(0);
    const[todayChange, setTodayChange] = useState(0);
    const[changeRate, setChangeRate] = useState(0);
    const[cash, setCash] = useState(user.cash);
    const[ownedStocks, setOwnStocks] = useState(JSON.parse(localStorage.getItem('stocks')));
    const dispatch = useDispatch();

    useEffect(() => {
        setAccountValue(prev => prev + user.cash);
        
    }, []);

    // const fetchData = async () => {
    //     let symbols = "";
    //     user.stocks.forEach((stock) => {
    //         symbols += "," + stock.symbol;
    //     });
    //     let symbolString = symbols.substring(1,);
    //     console.log(symbolString)
    //     await axios.post("http://localhost:3001/get-prices", {symbolString}).then((res) => {
    //             dispatch(updatePrices(res.data.quoteResponse.result));
    //             console.log(res);

    //     });
    // }

    // useEffect(() => { fetchData(); }, [user]); 
    useEffect(() => {setCash(user.cash)}, [user]);

    

    useEffect(() => {
        
        let totalValue = user.cash;
        let local_today_change = 0;
        user.stocks.forEach((stock) => {
            let quantity = stock.quantity;
            let currentPrice = null;
            for(var key in ownedStocks) {
                if(ownedStocks[key].symbol === stock.symbol){
                    currentPrice = ownedStocks[key].ask;
                    console.log(currentPrice);
                    local_today_change += (quantity * (currentPrice - ownedStocks[key].preMarketPrice))
                    break;
                }
            }
            console.log("Account Value: " + totalValue);
            totalValue += (quantity*currentPrice);
        });
        setAccountValue(totalValue);
        setTodayChange(local_today_change);
    }, [ownedStocks])

    useEffect(() => {
        setChangeRate(((accountValue-100000)/100000)*100);
    }, [accountValue]);

    useEffect(() => {
        if(isNaN(todayChange)) setTodayChange(0);
    }, [todayChange])

  return (
    <div className="databar-container">
        <div>
            <p className="value-title">Account Value:</p>
        <CurrencyFormat 
            value={accountValue} 
            displayType={'text'} 
            thousandSeparator={true} 
            decimalScale={2}
            prefix={'$'}
            renderText={value => <p className={"value-text" + (accountValue>100000?" green-text":" red-text")}>{accountValue > 100000?<ArrowDropUpIcon /> : <ArrowDropDownOutlinedIcon />} {value}</p>}  /> 
        </div>
        <div>
            <p className="value-title">Cash:</p>
            <CurrencyFormat 
                value={cash} 
                displayType={'text'} 
                thousandSeparator={true} 
                decimalScale={2}
                prefix={'$'}
                renderText={value => <p className={"value-text" + (cash>100000?" green-text":" red-text")}> {cash > 100000?<ArrowDropUpIcon /> : <ArrowDropDownOutlinedIcon />} {value}</p>}  /> 
        
        </div>
        <div>
            <p className="value-title">{changeRate>0?"Growth":"Decline"}</p>
            <CurrencyFormat 
                value={changeRate} 
                displayType={'text'} 
                thousandSeparator={true} 
                prefix={'%'}
                decimalScale={2}
                renderText={value => <p className={"value-text" + (changeRate>0?" green-text":" red-text")}> {changeRate> 0?<ArrowDropUpIcon /> : <ArrowDropDownOutlinedIcon />} {value}</p>}  /> 
        </div>
        <div>
            <p className="value-title">Today's Change:</p>
            <CurrencyFormat 
                value={todayChange} 
                displayType={'text'} 
                thousandSeparator={true} 
                prefix={'$'}
                decimalScale={2}
                renderText={value => <p className={"value-text" + (todayChange>0?" green-text":" red-text")}> {todayChange>0?<ArrowDropUpIcon /> : <ArrowDropDownOutlinedIcon />} {value}</p>}  /> 
        </div>
        <div>
            <p className="value-title">Buying Power:</p>
            <p className="value-text"> $93,626.24 </p>
        </div>
    </div>
  )
}
