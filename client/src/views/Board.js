import React, { useState } from 'react';
import deck from '../data/tiles.json';
import Card from '../components/Card';

export default props => {
    const [shuffled, setShuffled] = useState(deck.sort(() => Math.random() - 0.5));
    const [handOne, setHandOne] = useState([]);
    const [handTwo, setHandTwo] = useState([]);
    const [cardsDelt, setCardsDelt] = useState(false);

    const startGame = () => {
        for (let i = 1; i <= 3; i++) {
            const topCard = shuffled.shift();
            setShuffled(shuffled);
            handOne.push(topCard);
            setHandOne(handOne);
        }
        setCardsDelt(true);
    }

    return (
        <div className="row" style={{height: 600}}>
            { console.log(handOne) }
            <div className="col-sm-3 border border-dark rounded m-1 h-100">
                <p>Opponent's Matches: 2</p>
                <p>Your Matches: 3</p>
                <button className="btn btn-success" onClick={startGame}>Start Game</button>
            </div>
            <div className="col-sm-8">
                <div className="row border border-dark rounded m-1 h-50 p-1"></div>
                <div className="row border border-dark rounded m-1 h-50 p-1">
                    {
                        cardsDelt ?
                        handOne.map((card, index) => 
                            <Card key={index} thisCard={card}/>
                        )
                        : ''
                    }
                </div>
            </div>
        </div>
    )
}