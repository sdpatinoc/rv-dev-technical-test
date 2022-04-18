import { compare, hash } from 'bcrypt';
import { InsertOneResult, ObjectId } from 'mongodb';
import { Server, Socket } from 'socket.io';
import { ConnectedUsers } from '../helpers/connected-users';
import { Messages } from '../helpers/messages';
import { IMessage, IUser } from '../interfaces/interfaces';
import { Message } from '../models/message';
import { User } from '../models/user';

import { constants } from '../constants/constants';

export default class Sockets {
  
  protected connectedUsers: ConnectedUsers;
  protected messages: Messages;
  
  public constructor() {
  
    this.connectedUsers = new ConnectedUsers();
    this.messages = new Messages();
    
  }
  
  public initData = async (client: Socket, io: Server) => {
    
    this.messages.init(await (new Message()).all());
    this.connectedUsers.init(await (new User()).all({connected: true}));
    
    io.emit(constants.actionTypes.updateUsersList, this.connectedUsers.all());
    io.to(client.id).emit(constants.actionTypes.updateMessagesList, this.messages.all());
    
  }
  
  public login = (client: Socket, io: Server) => {
    
    client.on(constants.actionTypes.login, async (payload: Partial<IUser>, callback?: (...args: any[]) => void) => {
      
      const userData: IUser = await (new User()).findOne({nickname: payload.nickname});
  
      let authenticatedUserData: Partial<IUser> = {
        authenticated: false
      };
      
      if (userData && (await compare(payload.password, userData.password))) {
        
        userData.socketID = client.id;
        delete userData.password;
        
        await (new User()).updateOne({_id: new ObjectId(userData._id)}, {connected: true});
  
        authenticatedUserData = userData;
        authenticatedUserData.authenticated = true;
        authenticatedUserData.connected = true;
        
        this.connectedUsers.add(userData as IUser);
  
      }
  
      if (callback) {
          
        callback({
          userData: authenticatedUserData
        });
        
      }
      
    });
    
  }
  
  public register = (client: Socket, io: Server) => {
    
    client.on(constants.actionTypes.register, async (payload: Partial<IUser>, callback?: (...args: any[]) => void) => {
  
      const checkExistingUser: IUser = await (new User()).findOne({nickname: payload.nickname});
      
      let authenticatedUserData: Partial<IUser> = {
        authenticated: false
      };
      
      if (!checkExistingUser) {
  
        const userData: Partial<IUser> = {
          socketID: client.id,
          ...payload,
          connected: true
        };
  
        userData.password = await hash(payload.password, 10);
        const createdUser: InsertOneResult = await (new User()).insertOne(userData);
  
        userData._id = createdUser.insertedId;
        delete userData.password;
  
        authenticatedUserData = userData;
        authenticatedUserData.authenticated = true;
  
        this.connectedUsers.add(userData as IUser);
  
      }
      
      if (callback) {
          
        callback({
          userData: authenticatedUserData
        });
        
      }
      
    });
    
  }
  
  public getData = (client: Socket, io: Server) => {
    
    client.on(constants.actionTypes.getData, async () => {
      await this.initData(client, io);
    });
    
  }
  
  public newMessage = (client: Socket, io: Server) => {
    
    client.on(constants.actionTypes.newMessage, async (payload: Partial<IMessage>) => {
      
      const userData: IUser = await (new User()).findOne({_id: new ObjectId(payload.user_id)});
      
      const messageData: Partial<IMessage> = {
        user_id: new ObjectId(userData._id),
        timestamp: new Date(),
        ...payload,
        user: {
          _id: userData._id,
          name: userData.name,
          nickname: userData.nickname
        }
      };
      
      const createdMessage: InsertOneResult = await (new Message()).insertOne(messageData);
      messageData._id = createdMessage.insertedId;
      
      this.messages.add(messageData as IMessage);
      io.emit(constants.actionTypes.updateMessagesList, this.messages.all());
      
    });
    
  }
  
  public logout = (client: Socket, io: Server) => {
    
    client.on(constants.actionTypes.logout, async (payload: Partial<IUser>, callback?: (...args: any[]) => void) => {
  
      await (new User()).updateOne({_id: new ObjectId(payload._id)}, {connected: false});
      this.connectedUsers.delete(payload._id);
      
      io.emit(constants.actionTypes.updateUsersList, this.connectedUsers.all());
  
      if (callback) {
        callback({});
      }
      
    });
    
  }
  
}
