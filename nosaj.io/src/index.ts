import express from 'express';
import path from 'path';
import * as db from './db';
import { homeHandler, postHandler } from './pages';
import './styles/index.scss';
import { DEV } from './utils';

if (DEV) {
  require('dotenv').config();
}

const PORT = process.env?.PORT ?? 8080;
const server = express();

start();

async function start() {
  console.log('Start server on port %s', PORT);
  try {
    db.connect();
    server.listen(PORT);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

// Fallthrough middleware to serve files like css from the public dir
server.use(express.static(path.join(__dirname, 'public')));

// Configure main routes
server.get('/', homeHandler);
server.get('/r/:slug', postHandler);
