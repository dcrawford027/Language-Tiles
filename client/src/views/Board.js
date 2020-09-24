import React, { useEffect, useState, Component, Fragment } from 'react';
import deck from '../data/tiles.json';
import Card from '../components/Card';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDrop } from 'react-dnd';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../utilities/items';

export const CardContext = React.createContext({
    selectedTile: null
}) 


export default props => {
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

    const startGame = () => {
        let startHandOne = [];
        for (let i = 1; i <= 3; i++) {
            let topCard = shuffled.shift();
            setShuffled(shuffled);
            startHandOne.push(topCard);
        }
            setHandOne([...handOne, ...startHandOne]);
            // topCard = shuffled.shift();
            // setShuffled(shuffled);
            // handTwo.push(topCard);
            // setHandTwo(handTwo);
        setCardsDelt(true);
    }

    useEffect(() => {
        startGame();
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
        console.log(tileId)
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

    const [{ isDragging }, drag] = useDrag({
        item: {
            type: ItemTypes.CARD,
            id: props._id,
        },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        })
    });

    // const [{ isOver }, drop] = useDrop({
    //     accept: ItemTypes.CARD,
    //     isOver: !!monitor.isOver()
    // })


    return (
        <CardContext.Provider value={(selectedTile)}>
        <div className="row" style={{height: 700}}>
            <DndProvider backend={HTML5Backend}>
            <div className="col-sm-3 border border-dark rounded m-1 h-100 p-4" >
                <p>Player Ones's Matches: {playerOneScore}</p>
                <p>Player Two's Matches: 0</p>
                <p>Tiles Left in Deck: {shuffled.length}</p>
                <button className="btn btn-success d-block mb-2" onClick={drawTile} disabled={hasDrawn}>Draw</button>
                <button className="btn btn-info d-block mb-2" onClick={playTile} disabled={hasPlayedTile}>Play Tile</button>
                <button className="btn btn-primary d-block mb-2" onClick={() => checkMatch(table)}>Check Match</button>
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
                        handOne.map((tile, i) => 
                            <div key={i} id={tile.id} className="card m-1" ref={drag} opacity={isDragging ? '0.5' : '1'} style={{height: 150, width: 150}} onClick={() => selectTile(tile.id)} >
                                    <div className="card-body text-center" dangerouslySetInnerHTML={{__html: tile.display}}></div>
                            </div>
                        )
                        : ''
                    }
                </div>
            </div>
            </DndProvider>
        </div>
        </CardContext.Provider>
    )
}
