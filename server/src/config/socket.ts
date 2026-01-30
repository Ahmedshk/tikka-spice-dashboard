// Socket.io configuration (deferred)
// This file will be implemented in a later milestone

import { Server as HttpServer } from 'node:http';
import { Server as SocketServer } from 'socket.io';

export const initializeSocket = (httpServer: HttpServer): SocketServer => {
  // Placeholder for Socket.io initialization
  // Will be implemented when needed for real-time in-app notifications
  const io = new SocketServer(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      methods: ['GET', 'POST'],
    },
  });

  return io;
};
