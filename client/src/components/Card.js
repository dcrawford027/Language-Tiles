import React, { useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {v1 as uuid} from 'uuid';


export default props => {
    const { thisCard } = props;
    const [card, setCard] = useState({
        name: '',
        display: ''
    })

    useEffect(() => {
        setCard({
            name: thisCard.name,
            display: thisCard.display
        })
        console.log(card);
    }, [])

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
        <DragDropContext>
            {Object.entries(rows).map(([id, row, index]) => {
                return (
                    <Draggable key={card.id} draggableId={card.id} index={index}>
                        {(provided, snapshot) => {
                            return (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggabbleProps}
                                    {...provided.draggableProps}
                                    style={{
                                        userSelect: 'none',
                                        backgroundColor: snapshot.isDragging ? 'lightpink' : 'white',
                                        ...provided.Draggable.style
                                    }}
                                >
                                    <div className="card m-1" style={{height: 150, width: 150}}>
                                        <div className="card-body text-center" dangerouslySetInnerHTML={{__html: card.display}}></div>
                                    </div>
                                </div>
                            )
                        }}
                    </Draggable>
                );
            })}              
        </DragDropContext>
    )
}