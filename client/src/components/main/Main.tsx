import { Avatar, Divider, List, ListItem, ListItemIcon, ListItemText, Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import { ThemeProvider } from '@mui/material/styles';
import { UsersList } from '../../containers/main/chat/UsersList';
import { MessagesList } from '../../containers/main/chat/MessagesList';
import { NewMessage } from '../../containers/main/chat/NewMessage';
import React from 'react';
import PropTypes from 'prop-types';
import { AccountCircle, Logout } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Main = (props: any) => {
  
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  
  return (
    <ThemeProvider theme={props.theme}>
      <Grid container component={Paper} sx={{width: '100vw', height: '100vh'}}>
        <Grid item xs={3} sx={{borderRight: '1px solid #e0e0e0'}}>
          <List>
            <ListItem
              key="RemySharp"
              secondaryAction={
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<Logout />}
                  onClick={() => props.logout(navigate)}
                >
                  Logout
                </Button>
              }
            >
              <ListItemIcon>
                <Avatar>
                  <AccountCircle />
                </Avatar>
              </ListItemIcon>
              <ListItemText primary={'Welcome, ' + userData.name}></ListItemText>
            </ListItem>
          </List>
          <Divider />
          <UsersList />
        </Grid>
        <Grid item xs={9}>
          <MessagesList />
          <Divider />
          <NewMessage />
        </Grid>
      </Grid>
    </ThemeProvider>
  
  );
}

Main.propTypes = {
  theme: PropTypes.any.isRequired,
  logout: PropTypes.func.isRequired
};

export default Main;
