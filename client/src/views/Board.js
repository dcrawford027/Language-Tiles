import React, { useEffect, useState, Component, Fragment } from 'react';
import deck from '../data/tiles.json';
import io from 'socket.io-client';

export default props => {
    const { roomName } = props;
    const [socket] = useState(() => io(':8000'));
    const [shuffled, setShuffled] = useState(deck.sort(() => Math.random() - 0.5));
    const [hand, setHand] = useState([]);
    const [cardsDelt, setCardsDelt] = useState(false);
    const [selectedTile, setSelectedTile] = useState({
        id: 0,
        name: '',
        display: ''
    });
    const [table, setTable] = useState([]);
    const [playerScore, setPlayerScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [hasDrawn, setHasDrawn] = useState(false);
    const [hasPlayedTile, setHasPlayedTile] = useState(false);
    const [message, setMessage] = useState('');
    const [chatLog, setChatLog] = useState([]);

    const startGame = () => {
        let startHand = [];
        for (let i = 1; i <= 3; i++) {
            let topCard = shuffled.shift();
            setShuffled(shuffled);
            startHand.push(topCard);
        }
        setHand([...hand, ...startHand]);
        setCardsDelt(true);
    }

    useEffect(() => {
        socket.on('handshake', () => console.log(`${socket.id} is here!`));
        socket.emit('joinRoom', roomName);
    }, []);

    const drawTile = () => {
        if (shuffled.length > 0) {
            let topTile = shuffled.shift();
            setShuffled(shuffled);
            setHand([...hand, topTile]);
            setHasDrawn(true);
        }
    }

    const selectTile = tileId => {
        let tile = {};
        tile = hand.find(function(t) {
            return t.id === tileId
        });
        setSelectedTile({
            id: tile.id,
            name: tile.name,
            display: tile.display
        });
    }

    const playTile = () => {
        if (selectedTile.name !== '') {
            let newHand = hand.filter(t => t.id !== selectedTile.id);
            setHand(newHand);
            let playedTile = selectedTile;
            setTable([...table, playedTile]);
            setSelectedTile({ id: 0, name: '', display: '' });
            setHasPlayedTile(true);
        }
    }

    const checkMatch = array => {
        let map = {};
        let match = '';
        for (let i = 0; i < array.length; i++) {
            if (map[array[i].name] === undefined) {
                map[array[i].name] = 1;
            } else {
                map[array[i].name]++;
            }
        }
        for (let key in map) {
            if (map[key] === 2) {
                match = key;
                let newTable = table.filter(t => t.name !== match);
                setTable(newTable);
                let newScore = playerScore + 1;
                setPlayerScore(newScore);
            } 
        }
        setHasDrawn(false);
        setHasPlayedTile(false);
        setGameOver(checkEndGame());
        if (gameOver) {
            alert("Congratulations! You won!");
        }
    }

    const checkEndGame = () => {
        if (shuffled.length <= 0 && hand.length <= 0 && table.length <= 0) {
            return true;
        } else {
            return false;
        }
    }

    const submitHandler = e => {
        e.preventDefault();
        socket.emit('message', { room: roomName, message: message });
        setChatLog([...chatLog, message]);
        setMessage('');
    }

    
    socket.on('message', data => setChatLog([...chatLog, data]));

    return (
        <div className="row" style={{height: 700}}>
            <div className="col-sm-3 border border-dark rounded m-1 h-100">
                <p>Total Matches: {playerScore}</p>
                <p>Tiles Left in Deck: {shuffled.length}</p>
                <button className="btn btn-success d-block mb-2" onClick={drawTile} disabled={hasDrawn}>Draw</button>
                <button className="btn btn-info d-block mb-2" onClick={playTile} disabled={hasPlayedTile}>Play Tile</button>
                <button className="btn btn-primary d-block mb-2" onClick={() => checkMatch(table)}>Check Match</button>
                <div className="border border-dark mb-2 w-100" readOnly style={{overflowY: 'auto', height: 300}}>
                    <ul style={{listStyle: "none"}}>
                        {
                            chatLog.map((mess, i) => 
                                <li key={i} style={{marginLeft: -35}}>{mess}</li>
                            )
                        }
                    </ul>
                </div>
                <form onSubmit={submitHandler}>
                    <input type="text" name="message" className="form-control d-block mb-2" onChange={e => setMessage(e.target.value)} value={message}/>
                    <button type="submit" className="btn btn-primary">Message</button>
                </form>
            </div>
            <div className="col-sm-8">
                <div className="row border border-dark rounded m-1 h-50 p-1">
                    {
                        table.map((playedTile, i) => 
                            <div key={i} id={playedTile.id} className="card m-1" style={{height: 150, width: 150}}>
                                <div className="card-body text-center" dangerouslySetInnerHTML={{__html: playedTile.display}}></div>
                            </div>
                        )
                    }
                </div>
                <div className="row border border-dark rounded m-1 h-50 p-1" id="hand">
                    {
                        cardsDelt ?
                            hand.map((tile, i) => 
                                <div key={i} id={tile.id} className="card m-1" style={{height: 150, width: 150}} onClick={() => selectTile(tile.id)}>
                                    <div className="card-body text-center" dangerouslySetInnerHTML={{__html: tile.display}}></div>
                                </div>
                            )
                        :
                        <button className="btn btn-success offset-4 col-sm-4 h-25" onClick={startGame}>Start Game</button>
                    }
                </div>
            </div>
        
        </div>
    
    )
}
