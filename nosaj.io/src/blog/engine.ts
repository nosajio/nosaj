import { pool } from '../db';

export interface BlogPost {
  id: number;
  created_at: string;
  title: string;
  metadata: Record<any, any>;
  publish_date: string;
  slug: string;
  html: string;
}

export async function getAllPosts() {
  const res = await pool.query<BlogPost>(
    'select id, created_at, title, metadata, publish_date, slug, html from nosaj.posts where publish_date < now()',
  );
  return res.rows;
}

export async function getPost(slug: string) {
  console.log(slug);
  const res = await pool.query<BlogPost>(
    'select id, created_at, title, metadata, publish_date, slug, html from nosaj.posts where publish_date < now() and slug = $1',
    [slug],
  );
  const emptyResult = res.rowCount === 0;
  if (emptyResult) {
    return undefined;
  }
  return res.rows[0];
}
