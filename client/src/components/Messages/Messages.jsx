import React from 'react';
import MessagesView from './MessagesView';

const Messages = ({name, messages, roomName, handleNewMessage}) => {
  console.log(name, messages);

  const handleMessageSubmit = e => {
    e.preventDefault();
    const newMessage = {
      name: name,
      content: e.target['message'].value,
      roomName: roomName,
      type: "userMessage"
    };
    e.target['message'].value = '';
    handleNewMessage(newMessage, true);
  }

  return <MessagesView
    name={name}
    roomName={roomName}
    messages={messages}
    handleMessageSubmit={handleMessageSubmit} />
}

export default Messages;
