import React, { useState } from 'react';

export default props => {
    const [card, setCard] = useState({
        name: '',
        display: ''
    })

    return (
        <div className="card" style={{height: 200, width: 150}}>
            <div className="card-body">
                {card.display}
            </div>
        </div>
    )
}