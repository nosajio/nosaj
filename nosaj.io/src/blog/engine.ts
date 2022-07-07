import { format } from 'date-fns';
import { pool } from '../db';

export interface BlogPost {
  id: number;
  created_at: string;
  title: string;
  metadata: Record<any, any>;
  publish_date: string;
  slug: string;
  html: string;
  cover?: string;
  post_sample: string;
}

export interface AugmentedBlogPost extends BlogPost {
  nice_date: string;
}

function augmentPost(post: BlogPost): AugmentedBlogPost {
  const nice_date = format(new Date(post.publish_date), 'LLLL do');
  return {
    ...post,
    nice_date,
  };
}

export async function getAllPosts() {
  try {
    const res = await pool.query<BlogPost>(
      'select id, created_at, title, metadata, publish_date, slug, html, post_sample, cover from nosaj.posts where publish_date < now() order by publish_date desc',
    );
    return res.rows.map(augmentPost);
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getPost(slug: string) {
  try {
    const res = await pool.query<BlogPost>(
      'select id, created_at, title, metadata, publish_date, slug, html, post_sample, cover from nosaj.posts where publish_date < now() and slug = $1 order by publish_date desc',
      [slug],
    );
    const emptyResult = res.rowCount === 0;
    if (emptyResult) {
      return undefined;
    }
    return augmentPost(res.rows[0]);
  } catch (err) {
    console.error(err);
    return undefined
  }
}
