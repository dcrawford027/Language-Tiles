import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import ChatView from './ChatView';

const Chat = () => {
  const [socket] = useState(() => io(':8000'));
  const [name, setName] = useState('');
  const [messages, setMessages] = useState([]);

  const [joined, setJoined] = useState(false); // added on 9/22
  const [roomName, setRoomName] = useState(""); // added on 9/22
  // const [chatLog, setChatLog] = useState([]); // added on 9/22

  const handleNewMessage = (newMessage, isSending=false) => {
    console.log(roomName);
    socket.emit('messages', { room: roomName, message: messages }); // added on 9/22
    // setMessages(prevMessages => [...prevMessages, newMessage]);
    setMessages([...messages, newMessage]); // added on 9/23
    if (isSending) {
      socket.emit('createMessage', newMessage);
    }
  }

  useEffect(() => {
    socket.on('firstConnect', data => {
      setMessages(data);
    });
    socket.on('newMessage', data => handleNewMessage(data)); 
    return () => socket.disconnect(true);
  }, []);

  // const submitHandler = e => {  // added on 9/22
  //   e.preventDefault();
  //   socket.emit('message', { room: roomName, message: message });
  //   setChatLog([...chatLog, message]);
  //   setMessage('');
  // }

  // const changeHandler = e => { // added on 9/22
  //   socket.emit('typing', { room: roomName, message: `User ${socket.id} is typing...`});
  //   setMessage(e.target.value);
  // }

  // const joinRoom moved to NameForm

  return <ChatView
            socket={socket}
            name={name}
            setName={setName}
            roomName={roomName}
            setRoomName={setRoomName}
            messages={messages}
            handleNewMessage={handleNewMessage} />;
    
}

export default Chat;
