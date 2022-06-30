import express from 'express';
import path from 'path';
import { getPost } from './blog';
import * as db from './db';
import './styles/globals.scss';
import { DEV, injectHTMLAtSelector, renderPage } from './utils';
import { home, post, _document } from './views';

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
server.get('/', (_req, res) => {
  const page = _document({ children: home() });
  res.end(page.outerHTML);
});

// Read post route
server.get('/r/:slug', async (req, res) => {
  const slug = req.params.slug;
  const postData = await getPost(slug);
  if (!postData) {
    res.status(404).end('forohfor');
    return;
  }
  const page = renderPage(post, { post: postData });
  const injected = injectHTMLAtSelector(
    page,
    'section#html',
    postData?.html ?? '',
  );
  res.end(injected.documentElement.outerHTML);
});
