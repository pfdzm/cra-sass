import { useState, useEffect } from "react";
import axios from "axios";

export default function FetchData() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      // using Fetch API
      // const resp = await fetch("/posts");
      // if (!resp.ok) {
      //   return;
      // }
      // setPosts(await resp.json());

      // using Axios
      const resp = await axios.get("/posts");
      setPosts(resp.data);
    };

    fetchPosts();
  }, []);

  const [newPost, setNewPost] = useState(null);

  useEffect(() => {
    if (newPost === null) {
      return;
    }

    const addPost = async () => {
      await axios.post("/posts", newPost);
      setPosts((posts) => [...posts, newPost]);
      setNewPost(null);
    };

    addPost();
  }, [newPost]);

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

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.target);

          setNewPost({
            title: data.get("title"),
            author: data.get("author"),
            id: Date.now(),
          });
        }}
      >
        <input required type="text" name="title" placeholder="Title" />
        <input required type="text" name="author" placeholder="Author" />
        <button>Submit</button>
      </form>
    </div>
  );
}
