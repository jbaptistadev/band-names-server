import dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

import ExpressServer from './models/express_server.js';
dotenv.config();

// App express
const expressServer = new ExpressServer();

// Node server
const httpServer = createServer(expressServer.app);
export const io = new Server(httpServer);

io.on('connection', (client) => {
  console.log('Active client');

  client.on('message', () => {
    console.log('message');
  });

  client.on('disconnect', () => {
    console.log('Disconnect client');
  });
});

// public path
expressServer.app.use(express.static('public'));

httpServer.listen(process.env.PORT || '8000', () => {
  console.log('Serve running on port', process.env.PORT || '8000');
});
