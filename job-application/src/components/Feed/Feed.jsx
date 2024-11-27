import React, { useState } from 'react';
import './Feed.css';  // Importing the CSS file for styling
import { Link } from 'react-router-dom';

// Sample Data (You can replace this with dynamic data from a backend)
const posts = [
  {
    id: 1,
    user: 'John Doe',
    content: 'Excited to join XYZ Company as a Software Engineer!',
    time: '2 hours ago',
    likes: 5,
    comments: [
      { user: 'Jane Smith', comment: 'Congrats, John!' },
      { user: 'Sam Wilson', comment: 'Great news!' },
    ],
  },
  {
    id: 2,
    user: 'Alice Johnson',
    content: 'Looking for new opportunities in Data Science. DM me if you know anything!',
    time: '1 day ago',
    likes: 3,
    comments: [
      { user: 'Mark Lee', comment: 'Good luck, Alice!' },
    ],
  },
];

const NewsFeedPage = () => {
  const [comment, setComment] = useState('');

  // Handle the comment submission
  const handleCommentSubmit = (e, postId) => {
    e.preventDefault();
    // Logic for submitting the comment (You can add functionality here)
    alert(`Comment added to post ${postId}: ${comment}`);
    setComment('');
  };

  return (
    <div className="newsfeed-container">
      <div className="post-form">
        <textarea
          className="post-input"
          placeholder="What's on your mind?"
          rows="3"
        />
        <button className="post-button">Post</button>
      </div>

      <div className="posts">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <div className="post-header">
              <div className="post-user">{post.user}</div>
              <div className="post-time">{post.time}</div>
            </div>
            <div className="post-content">{post.content}</div>

            <div className="post-actions">
              <button className="like-button">👍 Like ({post.likes})</button>
              <button className="comment-button">💬 Comment</button>
              <button className="share-button">🔗 Share</button>
            </div>

            {/* Comments Section */}
            <div className="comments">
              {post.comments.map((comment, index) => (
                <div key={index} className="comment">
                  <strong>{comment.user}:</strong> {comment.comment}
                </div>
              ))}

              {/* Add Comment */}
              <form onSubmit={(e) => handleCommentSubmit(e, post.id)} className="comment-form">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment"
                  className="comment-input"
                  rows="2"
                />
                <button type="submit" className="submit-comment-button">
                  Post
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsFeedPage;
