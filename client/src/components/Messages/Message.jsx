import React from 'react';
import '../CSS/Messages.css';

const Message = ({name, message}) => {
  let msg;
  if (message.type === 'systemMessage') {
    msg = (
      <div className="Message system-msg">
        { message.content }
      </div>
    );
  } else if (message.name === name) {
    msg = (
      <div className="Message user-msg bg-info">
        <p><strong>You said</strong></p>
        <p>{ message.content }</p>
      </div>
    );
  } else {
    msg = (
      <div className="Message other-msg bg-secondary">
        <p><strong>{ message.name } said</strong></p>
        <p>{ message.content }</p>
      </div>
    );
  }
  return msg;
}

export default Message;
