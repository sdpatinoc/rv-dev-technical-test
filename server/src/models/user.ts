import { BaseModel } from './base-model';

export class User extends BaseModel {
  
  constructor() {
    
    super();
    this.collection = 'users';
    
  }
  
}
