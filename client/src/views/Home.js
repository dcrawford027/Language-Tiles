import { navigate } from '@reach/router';
import React, { useState } from 'react';

export default () => {
    const [playName, setPlayName] = useState('');

    const clickHandler = () => {
        navigate('/games');
    }

    return (
        <div className="bg">
            <div style={{height: 100}}></div>
            <div className="home-text">
                <h1 className="text-center mt-5">Tile Match</h1>
            </div> 
            <div className="home-text">
                <div style={{height: 75}}></div>
                <h1 className="text-center mt-5">Russian</h1>
            </div>
            <div style={{height: 100}}></div>
            <div className="text-center">
                <button className="btn-play mt-5" onClick={clickHandler}>Play</button>
            </div>
        </div>
    )
}