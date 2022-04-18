import { constants } from '../constants/constants';

const initialState = {
  authenticated: false
};

const actions = (state = initialState, action: any) => {
  
  switch (action.type) {
      
    case constants.actionTypes.setUser:
      
      return action;
      
    default:
      
      return state;
      
  }
  
};

export default actions;
