import { IUser } from '../interfaces/interfaces';

export class ConnectedUsers {
  
  private connectedUsers: IUser[] = [];
  
  public all = (): IUser[] => this.connectedUsers;
  
  public add = (user: IUser): void => {
    this.connectedUsers.push(user);
  }
  
  public delete = (socketID: string): void => {
    this.connectedUsers = this.connectedUsers.filter((user: IUser) => user.socketID != socketID);
  }
  
}
