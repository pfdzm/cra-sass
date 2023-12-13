import { useState, useEffect } from "react";

export default function FetchData() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const resp = await fetch("/posts");
      if (!resp.ok) {
        return;
      }
      setPosts(await resp.json());
    };
    fetchPosts();
  }, []);

  return (
    <div className="posts">
      <ol>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <h3>Written by {post.author}</h3>
          </li>
        ))}
      </ol>
    </div>
  );
}
