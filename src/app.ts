import dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

import ExpressServer from './models/express_server.js';
import Bands from './models/bands.js';
dotenv.config();

// App express
const expressServer = new ExpressServer();

// Node server
const httpServer = createServer(expressServer.app);
export const io = new Server(httpServer);

const bands = new Bands();

bands.addBand('Linking Park');
bands.addBand('Ed sheeran');
bands.addBand('Bllie Eilish');
bands.addBand('Lisa');
bands.addBand('Yaosobi');

console.log('bands', bands);

io.on('connection', (client) => {
  console.log('Active client');

  client.emit('active-bands', bands.getBands());

  client.on('vote-band', (id) => {
    bands.voteBand(id);

    io.emit('active-bands', bands.getBands());
  });

  client.on('add-band', (band) => {
    bands.addBand(band);

    io.emit('active-bands', bands.getBands());
  });

  client.on('delete-band', (band) => {
    bands.deleteBand(band);

    io.emit('active-bands', bands.getBands());
  });

  // client.on('emit-message', (payload) => {
  //   io.emit('new-message', 'hola');
  // });

  // client.on('flutter-emit', (payload) => {
  //   console.log('aqui', payload);
  //   client.broadcast.emit('new-message', payload);
  // });

  client.on('disconnect', () => {
    console.log('Disconnect client');
  });
});

// public path
expressServer.app.use(express.static('public'));

httpServer.listen(process.env.PORT || '8000', () => {
  console.log('Serve running on port', process.env.PORT || '8000');
});
