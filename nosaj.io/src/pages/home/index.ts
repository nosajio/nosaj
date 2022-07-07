import ejs from 'ejs';
import { Handler } from 'express';
import { getAllPosts, handlerStat } from '../../blog';
import './home.scss';

export const homeHandler: Handler = async (req, res) => {
  const posts = await getAllPosts();
  const page = await ejs.renderFile('src/views/home.ejs', {
    posts,
    page: { title: '🤙' },
  });
  handlerStat('view', req, res)
  res.end(page);
};
