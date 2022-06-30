import h from 'hyperscript';
import { BlogPost } from '../blog';

interface PostProps {
  post: BlogPost;
}

export const post = ({ post }: PostProps): JSX.Element => {
  return (
    <article>
      <h1>{post.title}</h1>
      <section id="html" />
    </article>
  );
};
