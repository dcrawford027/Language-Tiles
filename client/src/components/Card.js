import React, { useEffect, useState } from 'react';



export default props => {
    const { thisCard, id } = props;
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
        <div className="Box">
            <div className="card m-1" style={{height: 150, width: 150}} id={id} >
                <div className="card-body text-center" dangerouslySetInnerHTML={{__html: card.display}}></div>
            </div>
        </div>
    )
}