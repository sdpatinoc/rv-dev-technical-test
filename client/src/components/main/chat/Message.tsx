import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import { ListItem, ListItemText } from '@mui/material';
import MomentTimezone from 'moment-timezone';

const Message = (props: any) => {
  
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  
  return (
    <ListItem key={props._id}>
      <Grid container>
        <Grid item xs={12}>
          <ListItemText sx={{display: 'flex', justifyContent: (userData._id == props.user_id) ? 'flex-end' : 'flex-start'}}>
            <b>{props.user.nickname}: </b>
            {props.message_type == 'text'
              ? props.message
              : <iframe src={props.message} title="gif" width="80" height="80" frameBorder="0" allowFullScreen></iframe>
            }
          </ListItemText>
        </Grid>
        <Grid item xs={12}>
          <ListItemText
            sx={{display: 'flex', justifyContent: (userData._id == props.user_id) ? 'flex-end' : 'flex-start'}}
            secondary={MomentTimezone(props.timestamp).tz('America/Bogota').format('YYYY-MM-DD HH:mm:ss')}
          ></ListItemText>
        </Grid>
      </Grid>
    </ListItem>
  );
  
}

Message.propTypes = {
  _id: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  message_type: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired
};

export default Message;
