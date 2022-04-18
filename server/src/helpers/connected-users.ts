import { ObjectId } from 'mongodb';
import { IUser } from '../interfaces/interfaces';

export class ConnectedUsers {
  
  private connectedUsers: IUser[] = [];
  
  public init = (users: IUser[]): void => {
    this.connectedUsers = users;
  }
  
  public all = (): IUser[] => this.connectedUsers;
  
  public add = (user: IUser): void => {
    
    const index: number = this.connectedUsers.findIndex((connectedUser: IUser) => connectedUser._id == user._id);
    
    if (index == -1) {
      this.connectedUsers.push(user);
    }
    
  }
  
  public delete = (id?: ObjectId): void => {
    this.connectedUsers = this.connectedUsers.filter((user: IUser) => user._id != id);
  }
  
}
