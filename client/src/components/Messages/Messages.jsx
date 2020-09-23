import React from 'react';
import MessagesView from './MessagesView';

const Messages = ({name, messages, handleNewMessage}) => {
  console.log(name, messages);

  const handleMessageSubmit = e => {
    e.preventDefault();
    const newMessage = {
      name: name,
      content: e.target['message'].value,
      type: "userMessage"
    };
    e.target['message'].value = '';
    handleNewMessage(newMessage, true);
  }

  return <MessagesView
    name={name}
    messages={messages}
    handleMessageSubmit={handleMessageSubmit} />
}

export default Messages;
