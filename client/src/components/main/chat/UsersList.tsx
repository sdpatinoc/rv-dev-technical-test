import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';

const UsersList = (props: any) => (
  <List>
    {props.users.map((user: any) => (
      <ListItem button key={user._id}>
        <ListItemIcon>
          <Avatar>
            <AccountCircle />
          </Avatar>
        </ListItemIcon>
        <ListItemText primary={user.nickname}>{user.nickname}</ListItemText>
      </ListItem>
    ))}
  </List>
);

UsersList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      nickname: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

export default UsersList;
