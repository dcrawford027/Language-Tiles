import React from 'react';
import {Button, Form, InputGroup} from 'react-bootstrap';

const MessageForm = ({handleMessageSubmit}) => {

  return (
    <Form onSubmit={handleMessageSubmit} className="MessageForm">
      <InputGroup>
        <Form.Control
          as="textarea"
          name="message"
          type="text"
          required
        />
        <InputGroup.Append>
          <Button type="submit">Send</Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  );
}

export default MessageForm;
