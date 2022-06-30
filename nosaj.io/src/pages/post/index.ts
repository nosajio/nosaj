import ejs from 'ejs';
import { Handler } from 'express';
import { getPost } from '../../blog';
import './post.scss';

export const postHandler: Handler = async (req, res) => {
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
};
