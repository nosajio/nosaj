import ejs from 'ejs';
import { Handler } from 'express';
import { getPost, handlerStat } from '../../blog';
import './post.scss';

export const postHandler: Handler = async (req, res) => {
  const slug = req.params.slug;
  const postData = await getPost(slug);
  if (!postData) {
    res.status(404).end('post not found');
    handlerStat('error', req, res, {
      error: {
        status: 404,
        message: 'post_not_found',
      },
    });
    return;
  }
  handlerStat('view', req, res)
  const page = await ejs.renderFile('src/views/post.ejs', {
    ...postData,
    page: { title: postData.title },
  });
  res.end(page);
};
