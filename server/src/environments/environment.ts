export const environment: any = {
  webSocket: {
    PORT: Number(process.env.PORT) || 4000
  },
  mongoDB: {
    host: process.env.MONGODB_HOST || 'cluster0.553c7.mongodb.net',
    database: process.env.MONGODB_DATABASE || 'chatdb',
    user: process.env.MONGODB_USER || 'admin',
    password: process.env.MONGODB_PASSWORD || '2awGEwqKQtWvQZhG'
  }
};
