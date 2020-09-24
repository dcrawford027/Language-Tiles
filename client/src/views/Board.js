import React, { useEffect, useState } from 'react';
import deck from '../data/tiles.json';
import Card from '../components/Card';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {v1 as uuid} from 'uuid';

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

    const itemsFromDnD = [
        { id: uuid(), content: 'First Row' },
        { id: uuid(), content: 'Second Row' }
    ];

    const RowsFromDnd = [
        {
            [uuid()]: {
                name: 'Hand',
                items: [itemsFromDnD]
            }
        }
    ];

    const [rows, setRows] = useState(itemsFromDnD)

    return (
        <div className="row" style={{height: 700}}>
            <div className="col-sm-3 border border-dark rounded m-1 h-100">
                <p>Player Ones's Matches: {playerOneScore}</p>
                <p>Player Two's Matches: 0</p>
                <p>Tiles Left in Deck: {shuffled.length}</p>
                <button className="btn btn-success d-block mb-2" onClick={drawTile} disabled={hasDrawn}>Draw</button>
                <button className="btn btn-info d-block mb-2" onClick={playTile} disabled={hasPlayedTile}>Play Tile</button>
                <button className="btn btn-primary d-block mb-2" onClick={() => checkMatch(table)}>Check Match</button>
            </div>
            <div className="col-sm-8">
                <div className="row border border-dark rounded m-1 h-50 p-1">
                    <DragDropContext onDropEnd={result => console.log(result)}>
                        {Object.entries(rows).map(([id, row]) => {
                            return (
                                    <Droppable droppableID={id}>
                                        {(provided, snapshot) => {
                                            return (
                                                <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                style={{
                                                    background: snapshot.isDraggingOver ? 'lightgrey' : 'white', 
                                                }}
                                            >
                                            </div>
                                            )
                                        }}
                                    </Droppable>
                            )
                        }
                        )}
                    </DragDropContext>
                </div>

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
                            <div key={i} id={tile.id} className="card m-1" style={{height: 150, width: 150}} onClick={() => selectTile(tile.id)}>
                                <div className="card-body text-center" dangerouslySetInnerHTML={{__html: tile.display}}></div>
                            </div>
                        )
                        : ''
                    }
                </div> 
            </div>
        </div>
    )
}