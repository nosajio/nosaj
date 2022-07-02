import ejs from 'ejs';
import { Handler } from 'express';
import { getAllPosts } from '../../blog';
import './home.scss';

export const homeHandler: Handler = async (_req, res) => {
  const posts = await getAllPosts();
  const page = await ejs.renderFile('src/views/home.ejs', {
    posts,
    page: { title: '🤙' },
  });
  res.end(page);
};
