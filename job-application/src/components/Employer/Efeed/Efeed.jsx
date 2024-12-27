import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Efeed.css';
import { FaHeart, FaShareAlt } from 'react-icons/fa';

const CreateAndFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [editPostId, setEditPostId] = useState(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState("Everyone");
  const [allowSharing, setAllowSharing] = useState(false);
  const [allowReposts, setAllowReposts] = useState(false);
  const [image, setImage] = useState(null);  // For image upload

  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  const navigate = useNavigate();

  const fetchPosts = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please login.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:7000/posts/user", {
        headers: {
          Authorization: ` ${token}`,
        },
      });
      setPosts(response.data);
    } catch (err) {
      setError("Failed to fetch posts. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!["Everyone", "Connections", "OnlyMe"].includes(visibility)) {
      setFormError("Visibility must be one of: Everyone, Connections, OnlyMe");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setFormError("No token found. Please login.");
      return;
    }

    let response;

    // For creating a new post with an image (multipart form data)
    if (!editPostId) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("visibility", visibility);
      formData.append("allowSharing", allowSharing);
      formData.append("allowReposts", allowReposts);

      if (image) {
        formData.append("attachments", image);  // Append image as 'attachments' field
      }

      const config = {
        headers: {
          Authorization: ` ${token}`,
          "Content-Type": "multipart/form-data",  // Set to multipart/form-data for creating post
        },
      };

      try {
        setFormLoading(true);
        setFormError(null);
        
        response = await axios.post(
          "http://localhost:7000/posts/create",
          formData,
          config
        );
        
        if (response.status === 200) {
          alert("Post created successfully!");
          fetchPosts(); // Reload posts after submitting
          resetForm();
        }
      } catch (err) {
        setFormError("Failed to create post. Please try again.");
        console.error(err);
      } finally {
        setFormLoading(false);
      }
    } else {
      // For editing an existing post (send JSON request body)
      const postData = {
        title,
        content,
        visibility,
        allowSharing,
        allowReposts,
      };

      const config = {
        headers: {
          Authorization: ` ${token}`,
          "Content-Type": "application/json",  // Set to application/json for updating post
        },
      };

      try {
        setFormLoading(true);
        setFormError(null);

        response = await axios.patch(
          `http://localhost:7000/posts/${editPostId}`,
          postData,  // Send JSON request body for editing
          config
        );

        if (response.status === 200) {
          alert("Post updated successfully!");
          fetchPosts(); // Reload posts after submitting
          resetForm();
        }
      } catch (err) {
        setFormError("Failed to update post. Please try again.");
        console.error(err);
      } finally {
        setFormLoading(false);
      }
    }
  };

  const resetForm = () => {
    setIsCreatingPost(false);
    setEditPostId(null); // Reset edit state after submission
    setTitle("");
    setContent("");
    setVisibility("Everyone");
    setAllowSharing(false);
    setAllowReposts(false);
    setImage(null); // Reset image after submission
  };

  const handleCreatePostClick = () => {
    setIsCreatingPost(true);
  };

  const handleEditPostClick = (postId) => {
    setEditPostId(postId);
    const post = posts.find((p) => p.id === postId);
    setTitle(post.title);
    setContent(post.content);
    setVisibility(post.visibility);
    setAllowSharing(post.allowSharing);
    setAllowReposts(post.allowReposts);
    setIsCreatingPost(true);
  };

  const handleDeletePost = async (postId) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.delete(`http://localhost:7000/posts/${postId}`, {
        headers: {
          Authorization: ` ${token}`,
        },
      });

      if (response.status === 200) {
        alert("Post deleted successfully!");
        fetchPosts();
      }
    } catch (err) {
      console.error("Error deleting post", err);
      alert("Failed to delete post.");
    }
  };

  const handleRepost = async (originalPostId) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const postVisibility = prompt("Select repost visibility: Everyone, Connections, OnlyMe");

    if (!["Everyone", "Connections", "OnlyMe"].includes(postVisibility)) {
      alert("Invalid visibility selected.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:7000/posts/${originalPostId}/repost`,
        { originalPostId, postVisibility },
        {
          headers: {
            Authorization: ` ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Post reposted successfully!");
        fetchPosts();
      }
    } catch (err) {
      console.error("Error reposting post", err);
      alert("Failed to repost.");
    }
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: (post.likes || 0) + 1 } : post
    ));
  };

  const handleComment = (postId) => {
    console.log("Comment on post with ID:", postId);
  };

  return (
    <div className="News-Feed">
      <h1>News Feed</h1>

      {!isCreatingPost && (
        <button onClick={handleCreatePostClick}>Create Post</button>
      )}

      {isCreatingPost && (
        <div className="create-post-form">
          <h2>{editPostId ? "Edit Post" : "Create a New Post"}</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="visibility">Visibility</label>
              <select
                id="visibility"
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
                required
              >
                <option value="Everyone">Everyone</option>
                <option value="Connections">Connections</option>
                <option value="OnlyMe">Only Me</option>
              </select>
            </div>

            <div>
              <label htmlFor="allowSharing">Allow Sharing</label>
              <input
                type="checkbox"
                id="allowSharing"
                checked={allowSharing}
                onChange={(e) => setAllowSharing(e.target.checked)}
              />
            </div>

            <div>
              <label htmlFor="allowReposts">Allow Reposts</label>
              <input
                type="checkbox"
                id="allowReposts"
                checked={allowReposts}
                onChange={(e) => setAllowReposts(e.target.checked)}
              />
            </div>

            <div>
              <label htmlFor="image">Upload Image</label>
              <input
                type="file"
                id="image"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            <div>
              <button type="submit" disabled={formLoading}>
                {formLoading ? "Creating Post..." : "Create Post"}
              </button>
            </div>

            {formError && <div style={{ color: "red" }}>{formError}</div>}
          </form>
        </div>
      )}

      {loading && <p>Loading posts...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        {posts.map((post) => (
          <div key={post.id} className="post">
            <div className="post-header">
              <h3>{post.title}</h3>
              <div className="post-actions">
                <button onClick={() => handleEditPostClick(post.id)}>Edit</button>
                <button onClick={() => handleDeletePost(post.id)}>Delete</button>
              </div>
            </div>
            <p>{post.content}</p>
            <div>
              <button onClick={() => handleLike(post.id)}>
                <FaHeart /> Like {post.likes || 0}
              </button>
              <button onClick={() => handleComment(post.id)}>Comment</button>
              {post.allowSharing && (
                <button onClick={() => handleRepost(post.id)}>
                  <FaShareAlt /> Repost
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateAndFeed;


