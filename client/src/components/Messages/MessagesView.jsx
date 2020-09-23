import React, { useEffect, useRef } from 'react';
import MessageForm from '../Forms/MessageForm';
import {Col, Row} from 'react-bootstrap';
import '../CSS/Messages.css';
import Message from './Message';

const MessagesView = ({name, messages, roomName, handleMessageSubmit}) => {
  const msgBox = useRef();

  useEffect(() => {
    msgBox.current.scrollTop = msgBox.current.scrollHeight;
  })

  return (
    <Row className="Messages">
      <Col md={8}>
        <h2 className="text-center">Messages</h2>
        <div className="msg-box" ref={msgBox}>
          {
            // messages.filter((message) => message.roomName = roomName) // added 9/23
            messages.map((message, i) => {
              return <Message name={name} key={i} message={message} />
            })
          }
        </div>
        <MessageForm handleMessageSubmit={handleMessageSubmit} />
      </Col>
    </Row>
  );
}

export default MessagesView;
