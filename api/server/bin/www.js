#!/usr/bin/env node

/**
 * Module dependencies.
 */



 import app from '../app';
 import debugLib from 'debug';
 import http from 'http';
 import jwtUtil from './../utils/jwt'
 const debug = debugLib('signup:server');


/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
jwtUtil.init();
app.set('port', port);


app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT,PATCH, DELETE');
	res.setHeader("Access-Control-Allow-Headers", "Content-Type,Accept, Access-Control-Allow-Headers, Authorization, X-Requested-With");
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	res.setHeader("Content-Type", "application/json");
	next();
});

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
