import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import { connect } from 'react-redux';
import LoginComponent from '../../components/auth/Login';
import { login } from '../../actions';

const theme = createTheme();

const mapDispatchToProps = (dispatch: any) => ({
  theme,
  handleSubmit: (event: React.FormEvent<HTMLFormElement>, navigate: any) => {
  
    event.preventDefault();
  
    const data = new FormData(event.currentTarget);
    
    const userData = {
      nickname: data.get('nickname'),
      password: data.get('password')
    };
    
    dispatch(login({
      userData,
      navigate
    }));
  
  }
});

export const Login = connect(() => ({}), mapDispatchToProps)(LoginComponent);
