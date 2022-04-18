import { all, takeEvery } from 'redux-saga/effects';
import { constants } from '../constants/constants';

function* rootSaga(params: any) {
  
  yield all([
    takeEvery(constants.actionTypes.login, (action: any) => {
      
      params.socket.emit(action.type, action.user, (response: any) => {

        if (response?.userData?.authenticated) {

          localStorage.setItem('userData', JSON.stringify(response.userData));
          action.navigate('/');

        }

      });
      
    }),
    takeEvery(constants.actionTypes.register, (action: any) => {
  
      params.socket.emit(action.type, action.user, (response: any) => {
    
        if (response?.userData?.authenticated) {
      
          localStorage.setItem('userData', JSON.stringify(response.userData));
          action.navigate('/');
      
        }
    
      });
  
    }),
    takeEvery(constants.actionTypes.getData, (action: any) => {
      params.socket.emit(action.type);
    }),
    takeEvery(constants.actionTypes.newMessage, (action: any) => {
  
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      
      params.socket.emit(action.type, {
        user_id: userData._id,
        message: action.message.message,
        message_type: action.message.message_type
      });
      
    }),
    takeEvery(constants.actionTypes.logout, (action: any) => {
      
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      
      params.socket.emit(action.type, userData, () => {
        
        localStorage.removeItem('userData');
        action.navigate('/login');
        
      });
      
    }),
  ]);
  
}

export default rootSaga;
