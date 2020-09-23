import React, { useEffect, useState }  from 'react';
import {Button, Col, Form, Row} from 'react-bootstrap';
import '../CSS/NameForm.css';

// const NameForm = ({socket, setName, setRoomName}) => {
const NameForm = ({socket, setName, roomName, setRoomName}) => {
  const [joined, setJoined] = useState(false); // added on 9/22
  // const [roomName, setRoomName] = useState(""); // added on 9/22
  const [connectionMessage, setConnectionMessage] = useState("Waiting for socket connection...") // added on 9/23

  socket.on('showConnected', () => setConnectionMessage("You have successfully into the room")) // client side - added on 9/23

  const handleSubmit = e => {
    e.preventDefault();
    const name = e.target['name'].value;
    // const room_name = e.target['roomName'].value; // need to figure out
    setName(name);
    socket.emit('createMessage', {
      name: name,
      content: `${name} has joined the chat`,
      roomName: roomName, // need to figure out
      type: 'systemMessage'
    })
  }

  const joinRoom = e => { // added on 9/22
    socket.emit('joinroom', roomName);
    setJoined(true);
  }

  return (
    <div className="App">
      {
        !joined ?
        <>
          <h4>Welcome to Chat</h4>
          <label htmlFor="name">Enter Room Name: </label>
          <input name="roomName" type="text" onChange={ e => setRoomName(e.target.value) } value={roomName}/>
          <button onClick={joinRoom}>Join</button>
        </>
        :
        <>
          <Row className="NameForm">
            <Col md={5}>
              <h2>Get started Playing and Chatting! ENJOY!!!</h2> 
              <h2>{connectionMessage}</h2>
              <Form onSubmit={handleSubmit} className="Form">
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  {/* <Form.Label>Room Name</Form.Label> */}
                  <Form.Control
                    as="input"
                    name="name"
                    type="text"
                    required
                  />
                </Form.Group>

                <Button variant="success" type="submit">
                  Start Chatting
                </Button>
              </Form>
            </Col>
          </Row>
        </>
      }
    </div>
  );
}

export default NameForm;
