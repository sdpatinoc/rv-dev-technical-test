export const environment: any = {
  cors: {
    allowedOrigin: process.env.CORS_ALLOWED_ORIGIN,
  },
  webSocket: {
    port: Number(process.env.PORT)
  },
  mongoDB: {
    host: process.env.MONGODB_HOST,
    database: process.env.MONGODB_DATABASE,
    user: process.env.MONGODB_USER,
    password: process.env.MONGODB_PASSWORD
  }
};
