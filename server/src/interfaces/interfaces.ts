import { ObjectId } from 'mongodb';

export interface IUser {
  _id: ObjectId;
  socketID: string;
  name: string;
  nickname: string;
  password: string | Buffer | any;
  authenticated: boolean;
  connected: boolean;
}

export interface IMessage {
  _id: ObjectId;
  user_id: ObjectId;
  message: string;
  message_type: 'text' | 'giphy';
  timestamp: Date;
  user?: Partial<IUser>;
}
