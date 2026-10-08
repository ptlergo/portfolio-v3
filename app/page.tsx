import Image from "next/image";
import {posts} from './data/posts';
import Link from "next/link";
export default function Home() {
  return (
      <main>
        <h1>Blog posts</h1>
        <ul>
          {posts.map(post => (
            <li key={post.slug}>
              <Link href={`/posts/${post.slug}`}>
              <h2>{post.title}</h2>
              </Link>
            </li>
          ))}
        </ul>
      </main>
  );
}
