import React from 'react';

function MessageDisplay({ message, type }) {
  const messageStyle = {
    color: type === 'error' ? 'red' : 'green',
    marginTop: '20px',
  };

  return (
    <div style={messageStyle}>
      {message}
    </div>
  );
}

export default MessageDisplay;
