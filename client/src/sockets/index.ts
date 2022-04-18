import { constants } from '../constants/constants';
import { io, Socket } from "socket.io-client";
import { updateMessagesList, updateUsersList } from '../actions';
import { environment } from '../environments/environment';

const setupSocket = (dispatch: any) => {
  
  const IOClient: Socket = io(environment.webSocket.ENDPOINT, {
    withCredentials: true
  });
  
  IOClient.on(constants.actionTypes.updateUsersList, (payload: any) => {
    dispatch(updateUsersList(payload));
  });
  
  IOClient.on(constants.actionTypes.updateMessagesList, (payload: any) => {
    dispatch(updateMessagesList(payload));
  });
  
  return IOClient;
  
};

export default setupSocket;
