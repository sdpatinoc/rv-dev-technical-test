import express, { Request, Response } from 'express';
import http from 'http';
import { Server as IOServer, Socket } from 'socket.io';
import Sockets from './sockets/sockets';

import { environment } from './environments/environment';

export default class Server {
  
  private static _instance: Server;
  private readonly httpServer: http.Server;
  
  public app: express.Application;
  public port: number;
  public io: IOServer;
  public sockets: any;
  
  private constructor() {
    
    this.app = express();
    this.port = environment.webSocket.PORT;
    
    this.httpServer = new http.Server(this.app);
    this.io = new IOServer(this.httpServer);
  
    this.app.get('/', (request: Request, response: Response) => response.sendFile('public/index.html', {root: __dirname}));
    
    this.httpServer.listen(this.port, () => {
      console.log(`Listening on *:${this.port}`);
    });
    
    if (!this.sockets) {
      this.sockets = new Sockets();
    }
    
    this.listenSockets();
    
  }
  
  public static get instance(): Server {
    return this._instance || (this._instance = new this());
  }
  
  public listenSockets = (): void => {
    
    this.io.on('connection', (client: Socket) => {
      
      this.sockets.connect(client, this.io);
      this.sockets.register(client, this.io);
      this.sockets.newMessage(client, this.io);
      this.sockets.disconnect(client, this.io);
      
    });
    
  }
  
}
