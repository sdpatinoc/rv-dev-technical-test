import { constants } from '../constants/constants';

const actions = (state = [], action: any) => {
  
  switch (action.type) {
      
    case constants.actionTypes.updateMessagesList:
      
      return action.messages;
      
    default:
      
      return state;
    
  }
  
}

export default actions;
