import React, { useState } from 'react';
import './Feed.css';  // Importing the CSS file for styling

// Dummy Data for posts (both regular posts and job posts)
const initialPosts = [
  {
    id: 1,
    user: 'John Doe',
    content: 'Excited to join XYZ Company as a Software Engineer!',
    time: '2 hours ago',
    likes: 7,  // Initial like count
    likedByUser: false,  // Whether the current user has liked the post
    comments: [
      { user: 'Jane Smith', comment: 'Congrats, John!' },
      { user: 'Sam Wilson', comment: 'Great news!' },
    ],
    media: '',  // No media for this post
    isJobPost: false,  // Not a job post
    repostedBy: null,  // Not reposted
  },
  {
    id: 2,
    user: 'Alice Johnson',
    content: 'Looking for new opportunities in Data Science. DM me if you know anything!',
    time: '1 day ago',
    likes: 3,  // Initial like count
    likedByUser: false,  // Whether the current user has liked the post
    comments: [
      { user: 'Mark Lee', comment: 'Good luck, Alice!' },
    ],
    media: '',  // No media for this post
    isJobPost: true,  // Job post
    repostedBy: null,  // Not reposted
  },
  {
    id: 3,
    user: 'Emily Parker',
    content: 'Check out my latest blog post about web development trends!',
    time: '3 days ago',
    likes: 8,  // Initial like count
    likedByUser: false,  // Whether the current user has liked the post
    comments: [
      { user: 'David Scott', comment: 'Great insights, Emily!' },
    ],
    media: 'https://www.w3schools.com/html/mov_bbb.mp4',  // Example video URL
    isJobPost: false,  // Not a job post
    repostedBy: 'Michael Brown',  // Reposted by Michael Brown
  },
];

const NewsFeedPage = () => {
  const [comment, setComment] = useState('');
  const [postsState, setPostsState] = useState(initialPosts);

  // Handle the comment submission
  const handleCommentSubmit = (e, postId) => {
    e.preventDefault();
    alert(`Comment added to post ${postId}: ${comment}`);
    setComment('');
  };

  // Handle the "I'm interested" button for job posts (Adds comment automatically)
  const handleInterestedClick = (postId) => {
    const postToUpdate = postsState.find(post => post.id === postId);
    if (!postToUpdate) return;

    // Automatically add a comment when the user is interested
    const updatedPosts = postsState.map(post => {
      if (post.id === postId) {
        post.comments.push({ user: 'YourUsername', comment: 'I\'m interested in this job.' });
      }
      return post;
    });

    setPostsState(updatedPosts);  // Update the posts state
  };

  // Handle Like/Unlike functionality (toggle like state)
  const handleLikeClick = (postId) => {
    setPostsState(postsState.map(post => {
      if (post.id === postId) {
        // Toggle like state
        if (post.likedByUser) {
          post.likes -= 1;  // Decrease like count if the post is already liked
        } else {
          post.likes += 1;  // Increase like count if the post is not liked
        }
        post.likedByUser = !post.likedByUser;  // Toggle the like state
      }
      return post;
    }));
  };

  // Handle Share functionality
  const handleShareClick = (postId) => {
    alert(`Post ${postId} shared successfully!`);
  };

  // Handle the repost functionality
  const handleRepostClick = (postId, username) => {
    const postToRepost = postsState.find(post => post.id === postId);
    if (!postToRepost) return;

    // Create a new post based on the original post
    const newPost = {
      ...postToRepost,
      id: postsState.length + 1,  // New unique post ID
      repostedBy: username,  // Add the repostedBy field with username
      time: 'Just now',  // Reposted time
    };

    // Update posts list with the new reposted post
    setPostsState([newPost, ...postsState]);  
  };

  return (
    <div className="newsfeed-container">
      {/* Search Bar Section */}
      <div className="search-bar-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search for jobs or posts"
        />
        
      </div>

      {/* Post Feed Section */}
      <div className="posts">
        {postsState.map((post) => (
          <div key={post.id} className="post-card">
            <div className="post-header">
              {/* If the post was reposted, show the "Reposted by [username]" message */}
              {post.repostedBy && (
                <div className="repost-indicator">Reposted by {post.repostedBy}</div>
              )}
              <div className="post-user">{post.user}</div>
              <div className="post-time">{post.time}</div>
            </div>
            <div className="post-content">{post.content}</div>

            {/* Display media (video or image) if available */}
            {post.media && (
              <div className="post-media">
                {post.media.includes('video') ? (
                  <video className="post-video" controls>
                    <source src={post.media} type="video/mp4" />
                  </video>
                ) : (
                  <img className="post-image" src={post.media} alt="Post Media" />
                )}
              </div>
            )}

            {/* Post actions for like, comment, share, and repost */}
            <div className="post-actions">
              <button
                className={`like-button ${post.likedByUser ? 'liked' : ''}`}
                onClick={() => handleLikeClick(post.id)}
              >
                👍 Like ({post.likes})
              </button>
              <button className="comment-button">💬 Comment</button>
              <button className="share-button" onClick={() => handleShareClick(post.id)}>
                🔗 Share
              </button>
              <button
                className="repost-button"
                onClick={() => handleRepostClick(post.id, 'YourUsername')}
              >
                🔁 Repost
              </button>
            </div>

            {/* Comments Section */}
            <div className="comments">
              {/* Add Comment Form */}
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

              {/* Existing Comments will show below the comment input */}
              {post.comments.map((comment, index) => (
                <div key={index} className="comment">
                  <strong>{comment.user}:</strong> {comment.comment}
                </div>
              ))}
            </div>

            {/* Only show "I'm Interested" for Job Posts */}
            {post.isJobPost && (
              <button
                className="interested-button"
                onClick={() => handleInterestedClick(post.id)}
              >
                I'm Interested - Apply Now
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsFeedPage;
