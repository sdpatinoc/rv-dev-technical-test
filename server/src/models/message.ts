import { BaseModel } from './base-model';

import { environment } from '../environments/environment';

export class Message extends BaseModel {
  
  constructor() {
    
    super();
    this.collection = 'messages';
    
  }
  
  public all = async (data?: any): Promise<any> => {
    
    await this.connect();
  
    const pipeline: any[] = [
      {
        $lookup: {
          let: {userObjId: {$toObjectId: '$user_id'}},
          from: 'users',
          pipeline: [
            {$match: {$expr: {$eq: ['$_id', '$$userObjId']}}}
          ],
          as: 'user'
        }
      },
      {
        $unwind: '$user'
      },
      {
        $project: {
          _id: 1,
          user_id: 1,
          timestamp: 1,
          message: 1,
          message_type: 1,
          'user._id': 1,
          'user.name': 1,
          'user.nickname': 1
        }
      }
    ];
    
    return await this.client.db(environment.mongoDB.database).collection(this.collection).aggregate(pipeline).toArray();
    
  }
  
}
