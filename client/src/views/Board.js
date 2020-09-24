import React, { useEffect, useState } from 'react';
import deck from '../data/tiles.json';
import io from 'socket.io-client';

export default props => {
    const { roomName } = props;
    const [socket] = useState(() => io(':8000'))
    const [players, setPlayers] = useState([]);
    const [playerOne, setPlayerOne] = useState(false);
    const [shuffled, setShuffled] = useState(deck.sort(() => Math.random() - 0.5));
    const [handOne, setHandOne] = useState([]);
    const [handTwo, setHandTwo] = useState([]);
    const [cardsDelt, setCardsDelt] = useState(false);
    const [selectedTile, setSelectedTile] = useState({
        id: 0,
        name: '',
        display: ''
    });
    const [table, setTable] = useState([]);
    const [playerOneScore, setPlayerOneScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [hasDrawn, setHasDrawn] = useState(false);
    const [hasPlayedTile, setHasPlayedTile] = useState(false);
    const [canCheckMatch, setCanCheckMatch] = useState(true);
    const [message, setMessage] = useState('');
    const [chatLog, setChatLog] = useState([]);

    socket.on('message', data => setChatLog([...chatLog, data]));

    const startGame = () => {
        let startHandOne = [];
        let startHandTwo = [];
        for (let i = 1; i <= 3; i++) {
            let topCard = shuffled.shift();
            setShuffled(shuffled);
            startHandOne.push(topCard);
            topCard = shuffled.shift();
            setShuffled(shuffled);
            startHandTwo.push(topCard);
        }
        setHandOne([...handOne, ...startHandOne]);
        setHandTwo([...handTwo, ...startHandTwo]);
        setCardsDelt(true);
    }

    useEffect(() => {
        socket.emit('joinRoom', roomName)
        setPlayers([...players, socket.id]);
        console.log(socket.id);
        console.log(roomName);
    }, []);

    const drawTile = () => {
        if (shuffled.length > 0) {
            let topTile = shuffled.shift();
            setShuffled(shuffled);
            setHandOne([...handOne, topTile]);
            setHasDrawn(true);
        }
    }

    const selectTile = tileId => {
        let tile = handOne.find(function(t) {
            return t.id === tileId
        });
        console.log(tile);
        setSelectedTile({
            id: tile.id,
            name: tile.name,
            display: tile.display
        });
        console.log(selectedTile);
    }

    const playTile = () => {
        if (selectedTile.name !== '') {
            let newHandOne = handOne.filter(t => t.id !== selectedTile.id);
            setHandOne(newHandOne);
            let playedTile = selectedTile;
            setTable([...table, playedTile]);
            setSelectedTile({ id: 0, name: '', display: '' });
            setHasPlayedTile(true);
            if (hasDrawn) {
                setCanCheckMatch(false);
            }
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
                let newScore = playerOneScore + 1;
                setPlayerOneScore(newScore);
            } 
        }
        setHasDrawn(false);
        setHasPlayedTile(false);
        setCanCheckMatch(true);
        setGameOver(checkEndGame());
        if (gameOver) {
            alert("Congratulations! You won!");
        }
    }

    const checkEndGame = () => {
        if (shuffled.length <= 0 && handOne.length <= 0 && table.length <= 0) {
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

    return (
        <div className="row" style={{height: 700}}>
            <div className="col-sm-3 border border-dark rounded m-1 h-100">
                <p>Player One's Matches: {playerOneScore}</p>
                <p>Player Two's Matches: 0</p>
                <p>Tiles Left in Deck: {shuffled.length}</p>
                <button className="btn btn-success d-block mb-2" onClick={drawTile} disabled={hasDrawn}>Draw</button>
                <button className="btn btn-info d-block mb-2" onClick={playTile} disabled={hasPlayedTile}>Play Tile</button>
                <button className="btn btn-primary d-block mb-2" onClick={() => checkMatch(table)} disabled={canCheckMatch}>Check Match</button>
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
                            playerOne ? 
                                handOne.map((tile, i) => 
                                    <div key={i} id={tile.id} className="card m-1" style={{height: 150, width: 150}} onClick={() => selectTile(tile.id)}>
                                        <div className="card-body text-center" dangerouslySetInnerHTML={{__html: tile.display}}></div>
                                    </div>
                                )
                                :
                                handTwo.map((tile, i) => 
                                    <div key={i} id={tile.id} className="card m-1" style={{height: 150, width: 150}} onClick={() => selectTile(tile.id)}>
                                        <div className="card-body text-center" dangerouslySetInnerHTML={{__html: tile.display}}></div>
                                    </div>
                                )
                        :
                        <button className="btn btn-success" onClick={startGame}>Start Game</button>
                    }
                </div>
            </div>
        </div>
    )
}