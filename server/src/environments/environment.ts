export const environment: any = {
  webSocket: {
    SERVER_PORT: Number(process.env.SERVER_PORT) || 3000,
  },
  mongoDB: {
    host: process.env.MONGODB_HOST || 'cluster0.553c7.mongodb.net',
    database: process.env.MONGODB_DATABASE || 'chatdb',
    user: process.env.MONGODB_USER || 'admin',
    password: process.env.MONGODB_PASSWORD || '2awGEwqKQtWvQZhG'
  },
  giphy: {
    apiURL: process.env.GIPHY_API_URL || 'api.giphy.com/v1/gifs/search',
    token: process.env.GIPHY_API_TOKEN || 'zo417xUsT9h8Fj3465qnUGEPOdVk8JlV'
  }
};
