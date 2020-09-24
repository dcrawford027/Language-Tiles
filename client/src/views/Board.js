import React, { useState } from 'react';
import deck from '../data/tiles.json';
import Card from '../components/Card';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {v1 as uuid} from 'uuid';

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
        <div className="row" style={{height: 600}}>
            { console.log(handOne) }
            <div className="col-sm-3 border border-dark rounded m-1 h-100">
                <p>Opponent's Matches: 2</p>
                <p>Your Matches: 3</p>
                <button className="btn btn-success" onClick={startGame}>Start Game</button>
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

                <DragDropContext>
                    <div className="row border border-dark rounded m-1 h-50 p-1">
                        {
                            cardsDelt ?
                            handOne.map((card, index) => 
                                <Card key={index} thisCard={card}/>
                            )
                            : ''
                        }
                    </div>
                </DragDropContext>    
            </div>
        </div>
    )
}