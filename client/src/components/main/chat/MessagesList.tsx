import React from 'react';
import PropTypes from 'prop-types';
import Message from './Message';
import { List } from '@mui/material';

const MessagesList = (props: any) => {
  
  return (
    <List sx={{height: 'calc(100vh - 120px)', overflowY: 'auto'}}>
      {props.messages.map((message: any) => (
        <Message
          key={message._id}
          {...message}
        />
      ))}
    </List>
  );
  
};

MessagesList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      message_type: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

export default MessagesList;
