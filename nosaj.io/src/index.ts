import ejs from 'ejs';
import express from 'express';
import path from 'path';
import { getPost } from './blog';
import * as db from './db';
import './styles/globals.scss';
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

// Home / default route
server.get('/', async (_req, res) => {
  const page = await ejs.renderFile('src/views/home.ejs', {
    page: { title: '🤙' },
  });
  res.end(page);
});

// Read post route
server.get('/r/:slug', async (req, res) => {
  const slug = req.params.slug;
  const postData = await getPost(slug);
  if (!postData) {
    res.status(404).end('forohfor');
    return;
  }
  const page = await ejs.renderFile('src/views/post.ejs', {
    ...postData,
    page: { title: postData.title },
  });
  res.end(page);
});
