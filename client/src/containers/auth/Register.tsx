import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import { connect } from 'react-redux';
import RegisterComponent from '../../components/auth/Register';
import { register } from '../../actions';

const theme = createTheme();

const mapDispatchToProps = (dispatch: any) => ({
  theme,
  handleSubmit: (event: React.FormEvent<HTMLFormElement>, navigate: any) => {
    
    event.preventDefault();
    
    const data: FormData = new FormData(event.currentTarget);
    
    if (data.get('password') == data.get('confirm_password')) {
      
      const userData: any = {
        name: data.get('name'),
        nickname: data.get('nickname'),
        password: data.get('password')
      };
      
      dispatch(register({
        userData,
        navigate
      }));
      
    }
    
  }
});

export const Register = connect(() => ({}), mapDispatchToProps)(RegisterComponent);
