import ejs from 'ejs';
import { Handler } from 'express';
import './home.scss';

export const homeHandler: Handler = async (_req, res) => {
  const page = await ejs.renderFile('src/views/home.ejs', {
    page: { title: '🤙' },
  });
  res.end(page);
};
