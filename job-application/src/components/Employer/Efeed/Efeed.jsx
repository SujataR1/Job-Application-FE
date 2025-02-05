import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaHeart, FaShareAlt, FaEdit, FaTrash, FaComment } from "react-icons/fa";

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
    const [visibility, setVisibility] = useState("Everyone");

    const handleRepostClick = () => {
      if (!visibility) {
        alert("Please select a visibility for the repost.");
        return;
      }
      handleRepost(post.id, visibility);
    };

    return (
      <div className="flex items-center space-x-4 mt-4">
        <button
          onClick={() => handleLike(post.id, post.isLiked)}
          className={`flex items-center space-x-1 ${post.isLiked ? "text-red-500" : "text-gray-600"}`}
        >
          <FaHeart />
          <span>{post.likeCount}</span>
        </button>
        
        <button className="flex items-center space-x-1 text-gray-600">
          <FaComment /> 
          <span>Comment</span>
        </button>

        <div className="flex items-center space-x-2">
          <select
            className="rounded border border-gray-300 p-1"
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          >
            <option value="Everyone">Everyone</option>
            <option value="Connections">Connections</option>
            <option value="OnlyMe">Only Me</option>
          </select>
          <button 
            onClick={handleRepostClick}
            className="flex items-center space-x-1 text-gray-600"
          >
            <FaShareAlt /> 
            <span>Repost</span>
          </button>
        </div>

        <button 
          onClick={() => handleEditPostClick(post.id)}
          className="flex items-center space-x-1 text-gray-600"
        >
          <FaEdit /> 
          <span>Edit</span>
        </button>

        <button 
          onClick={() => handleDeletePost(post.id)}
          className="flex items-center space-x-1 text-red-600"
        >
          <FaTrash /> 
          <span>Delete</span>
        </button>
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
      <div className="mt-4">
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex flex-wrap gap-4">
          {Object.entries(attachments).map(([filePath, base64Data]) => (
            <div key={filePath} className="w-full max-w-md">
              <img
                src={base64Data}
                alt="Attachment"
                className="rounded-lg shadow-md"
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">News Feed</h1>

      {!isCreatingPost && (
        <button
          onClick={handleCreatePostClick}
          className="mb-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create Post
        </button>
      )}

      {isCreatingPost && (
        <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {editPostId ? "Edit Post" : "Create a New Post"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-32"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Visibility</label>
                <select
                  value={visibility}
                  onChange={(e) => setVisibility(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="Everyone">Everyone</option>
                  <option value="Connections">Connections</option>
                  <option value="OnlyMe">Only Me</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={allowSharing}
                    onChange={(e) => setAllowSharing(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Allow Sharing</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={allowReposts}
                    onChange={(e) => setAllowReposts(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Allow Reposts</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Image</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setImage(e.target.files)}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            {formError && <p className="text-red-500">{formError}</p>}

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={formLoading}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      )}

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold">{post.title}</h2>
                  <p className="text-gray-600 text-sm mt-1">{post.date}</p>
                </div>
                <span className="text-sm text-gray-500">{post.user.name}</span>
              </div>

              <p className="text-gray-700 mb-4">{post.content}</p>

              <PostWithAttachments postId={post.id} />

              <div className="mt-6">
                <PostActions post={post} />
              </div>

              <div className="mt-4">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreateAndFeed;


