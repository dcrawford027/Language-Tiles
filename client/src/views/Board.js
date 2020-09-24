import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
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

    const drop = e => {
        e.preventDefault();
        const card_id = e.dataTransfer.getData('card_id');

        const card = document.getElementById(card_id)

        card.style.display = 'block';

        e.target.appendChild(card);
        }

    const dragOver = e => {
        e.preventDefault();
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
            <div 
                id={props.id}
                className = {props.className}
                onDrop={drop}
                onDragOver={dragOver}
            >
                { props.children }

            </div>

        </div>
    )
}