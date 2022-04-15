import { compare, hash } from 'bcrypt';
import { ObjectId } from 'mongodb';
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
  
  public register = (client: Socket, io: Server) => {
    
    client.on(constants.actionTypes.register, async (payload: Partial<IUser>, callback: (...args: any[]) => void) => {
  
      const checkExistingUser: IUser = await (new User()).findOne({nickname: payload.nickname});
      
      if (!checkExistingUser) {
  
        const userData: Partial<IUser> = {
          socketID: client.id,
          ...payload
        };
  
        userData.password = await hash(payload.password, 10);
        const createdUser: any = await (new User()).insertOne(userData);
  
        userData._id = createdUser.insertedId;
        delete userData.password;
  
        this.connectedUsers.add(userData as IUser);
        io.emit(constants.actionTypes.updateUsersList, this.connectedUsers.all());
        
        callback({
          authenticated: true
        });
        
      }
      
    });
    
  }
  
  public connect = (client: Socket, io: Server) => {
    
    client.on(constants.actionTypes.connect, async (payload: Partial<IUser>, callback: (...args: any[]) => void) => {
      
      const userData: IUser = await (new User()).findOne({nickname: payload.nickname});
      
      if (userData && (await compare(payload.password, userData.password))) {
        
        userData.socketID = client.id;
        delete userData.password;
        
        this.connectedUsers.add(userData as IUser);
        io.emit(constants.actionTypes.updateUsersList, this.connectedUsers.all());
  
        callback({
          authenticated: true
        });
        
      } else {
        
        callback({
          authenticated: false,
          
        });
        
      }
      
    });
    
  }
  
  public disconnect = (client: Socket, io: Server) => {
    
    client.on(constants.actionTypes.disconnect, () => {
      
      console.log(`Client disconnected: ${client.id}`);
      
      this.connectedUsers.delete(client.id);
      io.emit(constants.actionTypes.updateUsersList, this.connectedUsers.all());
      
    });
    
  }
  
  public allMessages = async (client: Socket, io: Server) => {
    
    this.messages.init(await (new Message()).all());
    io.emit(constants.actionTypes.updateMessagesList, this.messages.all());
    
  }
  
  public newMessage = (client: Socket, io: Server) => {
    
    client.on(constants.actionTypes.newMessage, async (payload: Partial<IMessage>) => {
      
      const userData: IUser = await (new User()).findOne({_id: new ObjectId(payload.user_id)});
      console.log(userData);
      
      const messageData: Partial<IMessage> = {
        user_id: new ObjectId(userData._id),
        timestamp: new Date(),
        ...payload
      };
      
      const createdMessage: any = await (new Message()).insertOne(messageData);
      messageData._id = createdMessage.insertedId;
      
      this.messages.add(messageData as IMessage);
      console.log(messageData);
      io.emit(constants.actionTypes.updateMessagesList, this.messages.all());
      
    });
    
  }
  
}
