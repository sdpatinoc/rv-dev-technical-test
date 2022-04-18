import { connect } from 'react-redux';
import MainComponent from '../../components/main/Main';
import { createTheme } from '@mui/material/styles';
import { logout } from '../../actions';

const theme = createTheme();

const mapDispatchToProps = (dispatch: any) => ({
  theme,
  logout: (navigate: any) => {
    
    dispatch(logout({
      navigate
    }));
    
  }
});

export const Main = connect(() => ({}), mapDispatchToProps)(MainComponent);
