import React from 'react';
import Messages from '../Messages/Messages';
import NameForm from '../Forms/NameForm';
import '../CSS/Chat.css';

const ChatView = ({socket, name, setName, roomName, setRoomName, messages, handleNewMessage}) => {
  return (
    <section className="Chat">
      <header className="bg-dark text-light">
        <h1>MERN TileMatch App</h1>
      </header>
      {
        (name)
          ? <Messages
            name={name}
            roomName={roomName}
            messages={messages}
            handleNewMessage={handleNewMessage} />
          : <NameForm socket={socket} setName={setName} roomName={roomName}setRoomName={setRoomName}/>
      }
    </section>
  );
}

export default ChatView;
