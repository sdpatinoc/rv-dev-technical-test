import { InsertOneResult } from 'mongodb';
import { MongoManager } from '../helpers/mongo-manager';

import { environment } from '../environments/environment';

export class BaseModel extends MongoManager {
  
  public collection: string = '';
  
  public constructor() {
    super();
  }
  
  public all = async (data?: any): Promise<any> => {
    
    await this.connect();
    return await this.client.db(environment.mongoDB.database).collection(this.collection).find(data).toArray();
    
  }
  
  public findOne = async (data: {}): Promise<any> => {
  
    await this.connect();
    return await this.client.db(environment.mongoDB.database).collection(this.collection).findOne(data);
    
  }
  
  public insertOne = async (data: {}): Promise<InsertOneResult> => {
  
    await this.connect();
    return await this.client.db(environment.mongoDB.database).collection(this.collection).insertOne(data);
  
  }
  
  public updateOne = async (search: {}, data: {}): Promise<any> => {
    
    await this.connect();
    return await this.client.db(environment.mongoDB.database).collection(this.collection).updateOne(search, {$set: data});
    
  }

}
