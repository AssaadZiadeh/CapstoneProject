import React, { useEffect } from 'react'
import '../Styles/Checkout.css';
import { useDispatch, useSelector } from 'react-redux';
import { emptyBasket } from '../ReduxSlices/BasketSlice';
import { stockSlice } from '../ReduxSlices/StocksSlice';
import CheckIcon from '@mui/icons-material/Check';
import CurrencyFormat from 'react-currency-format';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { Navigate, useNavigate } from 'react-router';
import { login } from '../ReduxSlices/AuthSlice.js';
import axios from 'axios';
import { emptyChart } from '../ReduxSlices/ChartSlice';

export default function Checkout() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const basket = useSelector((state) => state.purchase.basket);

    useEffect(() => {
        if(!basket) Navigate('/dashboard/investments');
        console.log(basket);
    }, []);

    const purchaseStock = () => {
        axios.post("http://localhost:3001/purchase-stock", {basket: basket}).then((res) => {
            dispatch(login(res.data));
            dispatch(emptyChart());
            navigate('/dashboard/investments');
        }).catch((error) => console.log("ERROR: " + error));
    }

    return (
        <div className="checkout-container">
            <h2>Checkout</h2>
            <div className="data-container">
                <div className="checkout-row">
                    <p className="data-header">Stock to be purchased: </p> <p className="value-text smaller">{basket?.symbol}</p>
                </div>
                <div className="checkout-row">
                    <p className="data-header">Quantity: </p> <p className="value-text smaller">{basket?.quantity}</p>
                </div>
                <div className="checkout-row">
                    <p className="data-header">Priceof a single stock: </p>
                    <CurrencyFormat 
                        value={basket?.purchasePrice} 
                        displayType={'text'} 
                        thousandSeparator={true} 
                        prefix={'$'}
                        decimalScale={2}
                        renderText={value => <p className={"value-text smaller"}> {value}</p>}  /> 
                </div>
                <div className="checkout-row">
                    <p className="data-header">Total Price: </p> 
                    <CurrencyFormat 
                        value={basket?.purchasePrice * basket?.quantity} 
                        displayType={'text'} 
                        thousandSeparator={true} 
                        prefix={'$'}
                        decimalScale={2}
                        renderText={value => <p style={{fontWeight: "600", fontSize: "1.4rem"}} className={"value-text smaller"}> {value}</p>}  />
                </div>

                
                </div>

                <div className="button-container">
                    <button 
                        className="final-button"
                        onClick={purchaseStock}
                        >Purchase <CheckIcon /> </button>
                    <button 
                        className="final-button"
                        >Return <KeyboardReturnIcon /> </button>
                </div>
        </div>
    )
}
