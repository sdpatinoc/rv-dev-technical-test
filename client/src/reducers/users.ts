import { constants } from '../constants/constants';

const actions = (state = [], action: any) => {
  
  switch (action.type) {
    
    case constants.actionTypes.updateUsersList:
  
      return action.users;
      
    default:
      return state;
      
  }
  
}

export default actions;
