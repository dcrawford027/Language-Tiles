import React, { useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


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

    

    return (
        <DragDropContext>
                        <div className="card m-1" style={{height: 150, width: 150}}>
                            <div className="card-body text-center" dangerouslySetInnerHTML={{__html: card.display}}></div>
                        </div>
        </DragDropContext>
        
    )
}