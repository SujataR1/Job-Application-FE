import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaHeart, FaShareAlt, FaEdit, FaTrash, FaComment } from "react-icons/fa";
import './Efeed.css';

const CreateAndFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [editPostId, setEditPostId] = useState(null);
  const [newComment, setNewComment] = useState("");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState("Everyone");
  const [allowSharing, setAllowSharing] = useState(false);
  const [allowReposts, setAllowReposts] = useState(false);
  const [image, setImage] = useState(null);

  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  const [selectedRepostVisibility, setSelectedRepostVisibility] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please login.");
      setLoading(false);
      return;
    }

    try {
      const userResponse = await axios.get("http://localhost:7000/posts/user", {
        headers: { Authorization: ` ${token}` },
      });

      const postIds = userResponse.data;

      const fetchedPosts = await Promise.all(postIds.map(async (postId) => {
        const postDetails = await fetchPostDetails(postId);
        return { id: postId, ...postDetails };
      }));

      setPosts(fetchedPosts);
    } catch (err) {
      setError("Failed to fetch posts. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPostDetails = async (postId) => {
    const token = localStorage.getItem("token");
    if (!token) return {};

    try {
      const response = await axios.post(
        'http://localhost:7000/posts/fetch',
        { postId: postId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: ` ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.error("Error fetching post details", err);
      return {};
    }
  };

  const handleLike = async (postId, isLiked) => {
    const token = localStorage.getItem("token");
    const userId = posts.find(post => post.id === postId)?.user.id;

    if (!token || !userId) return;

    const apiUrl = isLiked
      ? "http://localhost:7000/posts/removelike"
      : "http://localhost:7000/posts/postlike";

    const payload = {
      userId: userId,
      postId: postId,
      isLiked: !isLiked,
    };

    try {
      const response = await axios.post(apiUrl, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: ` ${token}`,
        },
      });

      if (response.status === 200) {
        setPosts(posts.map(post =>
          post.id === postId
            ? { ...post, isLiked: !isLiked, likeCount: post.isLiked ? post.likeCount - 1 : post.likeCount + 1 }
            : post
        ));
      }
    } catch (err) {
      console.error("Error liking/removing like", err);
    }
  };
  const fetchConnectionsPosts = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please login.");
      return;
    }
  
    try {
      const response = await axios.get("http://localhost:7000/posts/connections", {
        headers: {
          Authorization: ` ${token}`,
        },
      });
  
      // Assuming the response contains an array of posts from the user's connections
      const fetchedPosts = response.data;
  
      // Merge these posts with the user's posts (if needed)
      setPosts(fetchedPosts);
    } catch (err) {
      setError("Failed to fetch posts from connections. Please try again.");
      console.error(err);
    }
  };
  
  useEffect(() => {
    fetchPosts();  // This is for user's posts
    fetchConnectionsPosts();  // Fetch posts from connections
  }, []);
  
  const handleCreateComment = async (postId, content) => {
    const token = localStorage.getItem("token");
    const userId = posts.find(post => post.id === postId)?.user.id;
  
    if (!token || !userId || !content) return;
  
    const payload = {
      postId: postId,  // Remove userId from here
      content: content,
    };
  
    try {
      const response = await axios.post("http://localhost:7000/posts/createcomment", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: ` ${token}`,
        },
      });
  
      if (response.status === 200) {
        alert("Comment added successfully!");
        fetchPosts();
        setNewComment(""); // Reset the comment input
      }
    } catch (err) {
      console.error("Error creating comment", err);
    }
  };
  
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

    if (!editPostId) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("visibility", visibility);
      formData.append("allowSharing", allowSharing);
      formData.append("allowReposts", allowReposts);

      if (image && image.length > 0) {
        Array.from(image).forEach((file) => {
          formData.append("attachments", file);
        });
      }

      const config = {
        headers: {
          Authorization: ` ${token}`,
          "Content-Type": "multipart/form-data",
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
          fetchPosts();
          resetForm();
        }
      } catch (err) {
        setFormError("Failed to create post. Please try again.");
        console.error(err);
      } finally {
        setFormLoading(false);
      }
    } else {
      handleEditPost();
    }
  };

  const resetForm = () => {
    setIsCreatingPost(false);
    setEditPostId(null);
    setTitle("");
    setContent("");
    setVisibility("Everyone");
    setAllowSharing(false);
    setAllowReposts(false);
    setImage(null);
  };

  const handleCreatePostClick = () => {
    setIsCreatingPost(true);
  };

  const handleEditPostClick = (postId) => {
    setEditPostId(postId);
    setIsCreatingPost(true);
  };

  const handleEditPost = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setFormError("No token found. Please login.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("visibility", visibility);
      formData.append("allowSharing", allowSharing);
      formData.append("allowReposts", allowReposts);

      if (image && image.length > 0) {
        Array.from(image).forEach((file) => {
          formData.append("attachments", file);
        });
      }

      const config = {
        headers: {
          Authorization: ` ${token}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios.patch(
        `http://localhost:7000/posts/${editPostId}`,
        formData,
        config
      );

      if (response.status === 200) {
        alert("Post edited successfully!");
        fetchPosts();
        resetForm();
      }
    } catch (err) {
      setFormError("Failed to edit post. Please try again.");
      console.error(err);
    }
  };

  const handleDeletePost = async (postId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found. Please login.");
      return;
    }

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
      setError("Failed to delete post.");
    }
  };

  const handleRepost = async (postId, postVisibility) => {
    const token = localStorage.getItem("token");
  
    // Ensure that postVisibility is a string and not undefined or null
    if (!postVisibility || typeof postVisibility !== 'string') {
      setError("Invalid visibility selected for repost.");
      return;
    }
  
    const payload = {
      originalPostId: postId,
      postVisibility: postVisibility,  // Ensure visibility is passed as a string
    };
  
    try {
      const response = await axios.post(`http://localhost:7000/posts/${postId}/repost`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: ` ${token}`,
        },
      });
  
      if (response.status === 200) {
        alert("Post reposted successfully!");
        fetchPosts();  // Fetch updated posts after reposting
      }
    } catch (err) {
      console.error("Error reposting the post", err);
      setError("Failed to repost. Please try again.");
    }
  };

  
  const PostActions = ({ post }) => {
        const [visibility, setVisibility] = useState("Everyone");  // Set default visibility to "Everyone"
      
        const handleRepostClick = () => {
          if (!visibility) {
            alert("Please select a visibility for the repost.");
            return;
          }
          handleRepost(post.id, visibility);
        };
    return (
      <div className="post-actions">
        <button
          onClick={() => handleLike(post.id, post.isLiked)}
          className={`like-button ${post.isLiked ? "liked" : ""}`}
        >
          <FaHeart />
          <span>{post.likeCount}</span>
        </button>
        <button onClick={() => handleCreateComment(post.id, newComment)}>
          <FaComment /> Comment
        </button>
        <button onClick={() => handleRepost(post.id, visibility)}>
          <FaShareAlt /> Repost
        </button>
        <button onClick={() => handleEditPostClick(post.id)}>
          <FaEdit /> Edit
        </button>
        <button onClick={() => handleDeletePost(post.id)}>
          <FaTrash /> Delete
        </button>
  
        <div>
          <label htmlFor="visibility">Repost Visibility:</label>
          <select
            id="visibility"
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          >
            <option value="Everyone">Everyone</option>
            <option value="Connections">Connections</option>
            <option value="OnlyMe">Only Me</option>
          </select>
        </div>
      </div>
    );
  };
  

  const PostWithAttachments = ({ postId }) => {
    const [attachments, setAttachments] = useState({});
    const [error, setError] = useState(null);

    const fetchAttachments = async (postId) => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No token found. Please login.");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:7000/posts/${postId}/attachments`, {
          headers: {
            Authorization: `${token}`,
          },
        });

        if (response.data.attachments) {
          setAttachments(response.data.attachments);  // Attachments as {filename: base64Data}
        } else {
          setError("No attachments found for this post.");
        }
      } catch (err) {
        console.error("Error fetching attachments", err);
        setError("Failed to fetch attachments.");
      }
    };

    useEffect(() => {
      if (postId) {
        fetchAttachments(postId);
      }
    }, [postId]);

    return (
      <div className="post-attachments">
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="attachments-container">
          {Object.entries(attachments).map(([filePath, base64Data]) => (
            <div key={filePath} className="attachment">
              <img
                src={base64Data}
                alt="Attachment"
                style={{ maxWidth: "100%", maxHeight: "400px", marginBottom: "10px" }}
              />
            </div>
          ))}
        </div>
      </div>
    );
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
              <label htmlFor="image">Select Image</label>
              <input
                type="file"
                id="image"
                accept="image/*"
                multiple
                onChange={(e) => setImage(e.target.files)}
              />
            </div>
            {formError && <p style={{ color: "red" }}>{formError}</p>}
            <button type="submit" disabled={formLoading}>
              {formLoading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="feed">
          {posts.map((post) => (
            <div key={post.id} className="post">
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <p>{post.user.name}</p>
              <p>{post.date}</p>

              <PostWithAttachments postId={post.id} />

              <div className="post-actions">
                <button
                  onClick={() => handleLike(post.id, post.isLiked)}
                  className={`like-button ${post.isLiked ? "liked" : ""}`}
                >
                  <FaHeart />
                  <span>{post.likeCount}</span>
                </button>
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                />
                <button onClick={() => handleCreateComment(post.id, newComment)}>
                  <FaComment /> Comment
                </button>
                <button onClick={() => handleRepost(post.id)}>
                  <FaShareAlt /> Repost
                </button>
                <button onClick={() => handleEditPostClick(post.id)}>
                  <FaEdit /> Edit
                </button>
                <button onClick={() => handleDeletePost(post.id)}>
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreateAndFeed;


