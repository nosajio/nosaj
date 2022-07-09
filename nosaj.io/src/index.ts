import cookieParser from 'cookie-parser';
import express from 'express';
import path from 'path';
import * as db from './db';
import { tokenCookie } from './middleware';
import { homeHandler, postHandler } from './pages';
import { rssHandler } from './rss';
import './styles/index.scss';
import { DEV } from './utils';

if (DEV) {
  require('dotenv').config({ path: '../.env.dev' });
}

const PORT = process.env?.WEB_PORT ?? 8080;
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

// Identify user with a cookie
server.use(cookieParser());
server.use(tokenCookie);

// Configure main routes
server.get('/', homeHandler);
server.get('/r/:slug', postHandler);

// RSS Feed
server.get('/rss', rssHandler);
