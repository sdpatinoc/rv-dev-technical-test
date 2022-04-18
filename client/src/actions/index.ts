import { constants } from '../constants/constants';

export const login = (data: any) => ({
  type: constants.actionTypes.login,
  user: data.userData,
  navigate: data.navigate
});

export const register = (data: any) => ({
  type: constants.actionTypes.register,
  user: data.userData,
  navigate: data.navigate
});

export const getData = () => ({
  type: constants.actionTypes.getData
});

export const newMessage = (data: any) => ({
  type: constants.actionTypes.newMessage,
  message: data.message
});

export const updateMessagesList = (messages: any) => ({
  type: constants.actionTypes.updateMessagesList,
  messages
});

export const updateUsersList = (users: any) => ({
  type: constants.actionTypes.updateUsersList,
  users
});

export const logout = (data: any) => ({
  type: constants.actionTypes.logout,
  navigate: data.navigate
});
