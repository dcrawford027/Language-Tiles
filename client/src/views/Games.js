import React, { useState } from 'react';
import { Link, navigate } from '@reach/router';

export default () => {
    const [roomName, setRoomName] = useState('');

    const createRoom = e => {
        e.preventDefault();
        navigate(`/games/${roomName}`);
    }

    return (
        <div className="text-center">
            <h1>Generate a Game Room</h1>
            <h2>Send the link to your friend!</h2>
            <form onSubmit={createRoom}>
                <div className="form-group row mb-3">
                    <label htmlFor="roomName" className="offset-2 col-sm-3">Room Name: </label>
                    <input type="text" className="form-control col-sm-4" onChange={e => setRoomName(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary">Create Room</button>
            </form>
        </div>
    )
}