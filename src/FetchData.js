import { useState, useEffect } from "react";
import axios from "axios";
import "./FetchData.scss";

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
    let unmounted = false;
    if (newPost === null) {
      return;
    }

    const addPost = async () => {
      await axios.post("/posts", newPost);
      if (unmounted) {
        return;
      }
      setPosts((posts) => [...posts, newPost]);
      setNewPost(null);
    };
    addPost();

    return () => {
      unmounted = true;
    };
  }, [newPost]);

  const [postToDelete, setPostToDelete] = useState(null);

  useEffect(() => {
    let unmounted = false;
    if (postToDelete === null) {
      return;
    }
    const deletePost = async () => {
      await axios.delete(`/posts/${postToDelete.id}`);
      if (unmounted) {
        return;
      }
      setPosts((posts) => posts.filter((post) => post.id !== postToDelete.id));
      setPostToDelete(null);
    };
    deletePost();
    return () => {
      unmounted = true;
    };
  }, [postToDelete]);

  const [edit, setEdit] = useState(null);
  const [postToEdit, setPostToEdit] = useState(null);

  useEffect(() => {
    let unmounted = false;
    if (postToEdit === null) {
      return;
    }
    const editPost = async () => {
      await axios.put(`/posts/${postToEdit.id}`, postToEdit);
      if (unmounted) {
        return;
      }
      setPosts((posts) =>
        posts.map((post) => (post.id === postToEdit.id ? postToEdit : post))
      );
      setEdit(null);
      setPostToEdit(null);
    };
    editPost();
    return () => {
      unmounted = true;
    };
  }, [postToEdit]);

  return (
    <div className="posts">
      {posts.map((post) =>
        edit === post.id ? (
          <form
            key={post.id}
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.target);
              setPostToEdit({
                id: post.id,
                title: data.get("title"),
                author: data.get("author"),
              });
              setEdit(null);
            }}
          >
            <input
              defaultValue={post.title}
              required
              type="text"
              name="title"
              placeholder="Title"
            />
            <input
              defaultValue={post.author}
              required
              type="text"
              name="author"
              placeholder="Author"
            />
            <div className="actions">
              <button class="btn-danger" type="reset" onClick={() => setEdit(null)}>
                Cancel
              </button>
              <button class="btn-primary">Submit</button>
            </div>
          </form>
        ) : (
          <div key={post.id}>
            <div>{post.title}</div>
            <div>Written by {post.author}</div>
            <div className="actions">
              <button onClick={() => setEdit(post.id)}>Edit</button>
              <button
                class="btn-danger"
                onClick={() => {
                  setPostToDelete(post);
                }}
              >
                Remove
              </button>
            </div>
          </div>
        )
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.target);

          setNewPost({
            title: data.get("title"),
            author: data.get("author"),
            id: Date.now(),
          });

          for (const element of e.currentTarget.elements) {
            if (element.type === "text") {
              element.value = "";
            }
          }
        }}
      >
        <input required type="text" name="title" placeholder="Title" />
        <input required type="text" name="author" placeholder="Author" />
        <button class="btn-primary">Submit</button>
      </form>
    </div>
  );
}
