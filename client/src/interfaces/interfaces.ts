export interface IUser {
  _id: string;
  socketID: string;
  name: string;
  nickname: string;
  avatar: string;
  password: string | Buffer | any;
  authenticated: boolean;
}

export interface IMessage {
  _id: string;
  user_id: string;
  message: string;
  message_type: 'text' | 'giphy';
  timestamp: Date;
}
