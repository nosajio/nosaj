import { Handler } from 'express';
import RSS from 'rss';
import { getAllPosts } from '../blog';

export const rssHandler: Handler = async (req, res) => {
  const feed = new RSS({
    title: 'nosaj.io',
    feed_url: 'https://nosaj.io/rss',
    site_url: 'https://nosaj.io',
  });
  const posts = await getAllPosts();
  for (let post of posts) {
    const attachments = post.cover
      ? {
          enclosure: {
            url: post.cover,
          },
        }
      : undefined;
    feed.item({
      title: post.title,
      date: post.publish_date,
      description: post.post_sample,
      url: post.url,
      ...attachments,
    });
  }

  res.contentType('application/rss+xml').status(200).end(feed.xml());
};
