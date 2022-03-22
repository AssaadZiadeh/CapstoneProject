import React from 'react'
import '../Styles/Databar.css';

export default function Databar() {
  return (
    <div className="databar-container">
        <div>
            <p className="value-title">Account Value:</p>
            <p className="value-text ">$100,000.0 </p>
        </div>
        <div>
            <p className="value-title">Cash:</p>
            <p className={"value-text" + (10>5?" red-text":" green-text")}>$93,000.0 </p>
        </div>
        <div>
            <p className="value-title">Annual Return:</p>
            <p className="value-text">%2.4 </p>
        </div>
        <div>
            <p className="value-title">Today's Change:</p>
            <p className="value-text"> +$320.52 </p>
        </div>
        <div>
            <p className="value-title">Buying Power:</p>
            <p className="value-text"> $93,626.24 </p>
        </div>
    </div>
  )
}
