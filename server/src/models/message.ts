import { BaseModel } from './base-model';

export class Message extends BaseModel {
  
  constructor() {
    
    super();
    this.collection = 'messages';
    
  }
  
}
