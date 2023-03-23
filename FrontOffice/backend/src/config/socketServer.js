import { Server } from 'socket.io';

export class SocketServer {
  constructor(httpServer) {
    this.io = new Server(httpServer, {
        cors: {
          origin: '*',
        },
      });

    this.io.on('connection', (socket) => {
      console.log('SocketIO connected:');

      socket.on('disconnect', () => {
        console.log('A user disconnected');
      });
    });
  }

  notifyDbUpdate(data) {
    console.log('notifyDbUpdate called, emitted to io');
    this.io.emit('databaseUpdated', data);
  }
}
