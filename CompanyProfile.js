
import React, { useEffect, useState } from 'react'
import '../Styles/CompanyProfile.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import LineChart from './LineChart.js';
import CurrencyFormat from 'react-currency-format';
import { fillBasket } from '../ReduxSlices/BasketSlice.js';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { emptyChart } from '../ReduxSlices/ChartSlice';
import LoopIcon from '@mui/icons-material/Loop';


export default function CompanyProfile() {

    const [labels, setLabels] = useState([]);
    const [values, setValues] = useState([]);
    const chartData = useSelector((state) => state.chart.chartData);
    const stock = useSelector((state) => state.chart.stockData);
    const [basket, setBasket] = useState({});
    const [quantity, setQuantity] = useState(0);

        
    const dispatch = useDispatch();
    const navigate = useNavigate();
  


    useEffect(() => {
        let tempLabels = [];
        let tempValues = [];
        for(var key in chartData["Monthly Time Series"]) {
            tempLabels.push(key)
            if (chartData["Monthly Time Series"].hasOwnProperty(key)) {
                tempValues.push(chartData["Monthly Time Series"][key]["1. open"]);
            }
        };

        tempLabels = tempLabels.length>12?tempLabels.slice(0,60).reverse():tempLabels.reverse();
        tempValues = tempValues.length>12?tempValues.slice(0,60).reverse():tempValues.reverse();

        setLabels(tempLabels);
        setValues(tempValues);
    }, []);

    useEffect(()=>{
        console.log(stock);
        console.log(chartData);
    }, [])

    const purchaseStock = () => {
        basket.symbol = stock["Global Quote"]["01. symbol"];
        basket.quantity = quantity;
        basket.purchasePrice = stock["Global Quote"]["05. price"];
        console.log(basket);
        dispatch(fillBasket(basket));
        navigate('/dashboard/checkout');
      }

    const data = () => {
        let color = parseFloat(values[0])<parseFloat(values[values.length-1])?"#50C878":"#8D021F";
        return {
                labels: labels,
                datasets: [
                  {
                    label: `${chartData["Meta Data"]["2. Symbol"]} Price in USD for the Last ${values.length} Month`,
                    data: values,
                    borderColor: color,
                    backgroundColor: color,
                    pointRadius: 0,
                    borderWidth: 1,
                    fill: false
                  }
                ]    
        };
    }

    const newSearch = () => {
        dispatch(emptyChart());
        navigate('/dashboard/trade');
    }
  return (
    <div className="company-container">
            <p className="company-title">Symbol: {stock["Global Quote"]["01. symbol"]}</p>
            <div className="chart-js">
                {labels.length===60&&values.length===60&& <LineChart data={data()} />}
            </div>
                <div className="current-price">
                    <h2 className="stock-price-text">The current price of {stock["Global Quote"]["01. symbol"]} : </h2> 
                        <CurrencyFormat 
                                value={stock["Global Quote"]["05. price"]} 
                                displayType={'text'} 
                                thousandSeparator={true} 
                                prefix={'$'}
                                decimalScale={2}
                                renderText={value => <p className="stock-price"> {value}</p>}  /> 
                </div>
                <div className="main-container">
                    <div className="half-table">
                    <div className="data-row">
                        <p>OPEN:</p>
                        <CurrencyFormat 
                            value={stock["Global Quote"]["02. open"]} 
                            displayType={'text'} 
                            thousandSeparator={true} 
                            prefix={'$'}
                            decimalScale={2}
                            renderText={value => <p className="numeric-data"> {value}</p>}  /> 
                    </div>
                    <div className="data-row">
                        <p>HIGH:</p>
                        <CurrencyFormat 
                            value={stock["Global Quote"]["03. high"]} 
                            displayType={'text'} 
                            thousandSeparator={true} 
                            prefix={'$'}
                            decimalScale={2}
                            renderText={value => <p className="numeric-data"> {value}</p>}  />
                    </div>
                    <div className="data-row">
                        <p>LOW:</p>
                        <CurrencyFormat 
                            value={stock["Global Quote"]["04. low"]} 
                            displayType={'text'} 
                            thousandSeparator={true} 
                            prefix={'$'}
                            decimalScale={2}
                            renderText={value => <p className="numeric-data"> {value}</p>}  /> 
                    </div>
                </div>
                <div className="half-table">
                    <div className="data-row">
                        <p>VOLUME:</p>
                        <CurrencyFormat 
                            value={stock["Global Quote"]["06. volume"]} 
                            displayType={'text'} 
                            thousandSeparator={true} 
                            prefix={'$'}
                            decimalScale={2}
                            renderText={value => <p className="numeric-data"> {value}</p>}  /> 
                    </div>
                    <div className="data-row">
                        <p>CHANGE PERCENT:</p>
                        <CurrencyFormat 
                            value={stock["Global Quote"]["10. change percent"]} 
                            displayType={'text'} 
                            thousandSeparator={true} 
                            prefix={'%'}
                            decimalScale={2}
                            renderText={value => <p className="numeric-data"> {value}</p>}  /> 
                    </div>
                    <div className="data-row">
                        <p>PREVIOUS CLOSE:</p>
                        <CurrencyFormat 
                            value={stock["Global Quote"]["08. previous close"]} 
                            displayType={'text'} 
                            thousandSeparator={true} 
                            prefix={'%'}
                            decimalScale={2}
                            renderText={value => <p className="numeric-data"> {value}</p>}  /> 
                    </div>
                </div>
            </div>

            <div className="quantity-container">
                <h3 className="search-header">Enter Quantity of Stock to Purchase: </h3>
                <input 
                type="number" 
                placeholder="Enter desired quantity..." 
                className="quantity-input"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="0" />
            </div>    
            <div className="purchase-buttons-container">
                <button 
                className="purchase-button"
                onClick={purchaseStock}
                >Purchase <NavigateNextIcon /> </button>

                <button 
                className="new-search-button"
                onClick={newSearch}
                >New Search  <LoopIcon /></button>
            </div>
        </div>
  )
}
