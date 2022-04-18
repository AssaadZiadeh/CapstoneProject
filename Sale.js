import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { emptyBasket } from '../ReduxSlices/BasketSlice';
import { stockSlice } from '../ReduxSlices/StocksSlice';
import CheckIcon from '@mui/icons-material/Check';
import CurrencyFormat from 'react-currency-format';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { Navigate, useNavigate } from 'react-router';
import { login } from '../ReduxSlices/AuthSlice.js';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import axios from 'axios';
import '../Styles/Sale.css';

export default function Sale() {

    const [quantity, setQuantity] = useState(1);
    const [quantityExceeded, setQuantityExceeded] = useState(false);


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const sale = useSelector((state) => state.sale.tradeData);
    const quantityOwned = useSelector((state) => state.sale.quantity);

    const Alert = () => {
        return (
          <div className="alert-container">
            <ErrorOutlineOutlinedIcon sx={{color: 'white'}} className="error-icon" />
            <p className = "alert-message">You only own {quantityOwned} {sale.symbol}!</p>
            <CloseOutlinedIcon 
            sx={{color: 'white'}} 
            className="close-icon"
            onClick={() => setQuantityExceeded(false)}
            />
          </div>
        )
      }

      useEffect(()=>{
          if(quantity>quantityOwned) setQuantityExceeded(true);
      },[quantity])
  

    // useEffect(() => {
    //     if(!sale) navigate('/dashboard/investments');
    // }, []);

    const handleReturn = () => {
        dispatch(emptyBasket());
        navigate('/dashboard/investments');
    }

    const sellStock = () => {
        if(quantity === quantityOwned) {
            axios.post("http://localhost:3001/sell-all-stock", {sale: sale, quantity: quantityOwned}).then((res) => {
                dispatch(login(res.data));
                navigate('/dashboard/investments');
            }).catch((error) => console.log("Error: " + error));
        } else {
            axios.post("http://localhost:3001/sell-stock", {sale: sale, quantity: quantity}).then((res) => {
                dispatch(login(res.data));
                navigate('/dashboard/investments');
            }).catch((error) => console.log("ERROR: " + error));
        }
        
    }

    return (
        <div className="checkout-container">
            {quantityExceeded && Alert()}
            <h2>Checkout</h2>
            <div className="data-container">
                <div className="checkout-row">
                    <p className="data-header">Stock to be sold: </p> <p className="value-text smaller">{sale?.symbol}</p>
                </div>
                <div className="checkout-row">
                    <p className="data-header">Quantity: </p> <p className="value-text smaller">
                        <input 
                        className="quantity-input"
                        value={quantity} 
                        max={quantityOwned}
                        onChange={(e) => setQuantity(e.target.value)} 
                        type="number" /></p>
                </div>
                <div className="checkout-row">
                    <p className="data-header">Price of a single stock: </p>
                    <CurrencyFormat 
                        value={sale?.ask} 
                        displayType={'text'} 
                        thousandSeparator={true} 
                        prefix={'$'}
                        decimalScale={2}
                        renderText={value => <p className={"value-text smaller"}> {value}</p>}  /> 
                </div>
                <div className="checkout-row">
                    <p className="data-header">Total Price: </p> 
                    <CurrencyFormat 
                        value={sale?.ask * quantity} 
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
                        onClick={sellStock}
                        disabled={quantityOwned < quantity}
                        >Sell <CheckIcon /> </button>
                    <button 
                        className="final-button"
                        onClick={handleReturn}
                        >Return <KeyboardReturnIcon /> </button>
                </div>
        </div>
    )
}
