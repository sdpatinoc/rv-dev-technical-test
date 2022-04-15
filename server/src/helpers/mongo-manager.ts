import * as MongoDB from 'mongodb';

import { environment } from '../environments/environment';

export class MongoManager {
  
  public client: MongoDB.MongoClient;
  
  public constructor() {
  
    const connectionString: string = `mongodb+srv://${environment.mongoDB.user}:${environment.mongoDB.password}@${environment.mongoDB.host}/${environment.mongoDB.database}?retryWrites=true&w=majority`;
    
    this.client = new MongoDB.MongoClient(connectionString);
  
  }
  
  public connect = async (): Promise<MongoDB.MongoClient> => await this.client.connect();
  
}
