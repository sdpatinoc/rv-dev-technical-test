import { IMessage } from '../interfaces/interfaces';

export class Messages {
  
  private messages: IMessage[] = [];
  
  public init = (messages: IMessage[]): void => {
    this.messages = messages;
  }
  
  public all = (): IMessage[] => {
    return this.messages.sort((prev: IMessage, next: IMessage) => new Date(prev.timestamp).getTime() - new Date(next.timestamp).getTime());
  }
  
  public add = (message: IMessage): void => {
    this.messages.push(message);
  }
  
}
