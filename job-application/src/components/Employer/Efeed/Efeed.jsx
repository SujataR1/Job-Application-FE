import React, { useState } from 'react';
import './Efeed.css';  // Importing the CSS file for styling

// Dummy Data for company posts (job posts and company updates)
const initialPosts = [
  {
    id: 1,
    user: 'XYZ Company',
    content: 'We are hiring a Senior Software Engineer. Apply now!',
    time: '2 hours ago',
    likes: 12,  // Initial like count
    likedByUser: false,  // Whether the current employer has liked the post
    comments: [
      { user: 'John Doe', comment: 'Great opportunity!' },
      { user: 'Emily Taylor', comment: 'I am interested in this position.' },
    ],
    media: '',  // No media for this post
    isJobPost: true,  // This is a job post
    status: 'Open',  // Job post status
    applicantCount: 5,  // Number of applicants
    repostedBy: null,  // Not reposted
  },
  {
    id: 2,
    user: 'XYZ Company',
    content: 'Check out our latest company blog post about tech innovations!',
    time: '1 day ago',
    likes: 25,  // Initial like count
    likedByUser: false,  // Whether the current employer has liked the post
    comments: [
      { user: 'Alice Johnson', comment: 'Very informative!' },
    ],
    media: 'https://www.w3schools.com/html/mov_bbb.mp4',  // Example media (video)
    isJobPost: false,  // This is not a job post
    status: null,
    applicantCount: null,
    repostedBy: null,  // Not reposted
  },
  {
    id: 3,
    user: 'XYZ Company',
    content: 'We are celebrating our 5th anniversary today! Check out the celebrations.',
    time: '3 days ago',
    likes: 30,  // Initial like count
    likedByUser: false,  // Whether the current employer has liked the post
    comments: [
      { user: 'David Scott', comment: 'Congrats on the milestone!' },
    ],
    media: '',  // No media for this post
    isJobPost: false,  // This is not a job post
    status: null,
    applicantCount: null,
    repostedBy: 'Michael Brown',  // Reposted by Michael Brown
  },
];

const EmployerFeedPage = () => {
  const [comment, setComment] = useState('');
  const [postsState, setPostsState] = useState(initialPosts);

  // Handle the comment submission
  const handleCommentSubmit = (e, postId) => {
    e.preventDefault();
    alert(`Comment added to post ${postId}: ${comment}`);
    setComment('');  // Clear the comment input after submitting
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

  // Handle Job Post Status Update
  const handleJobPostStatus = (postId) => {
    setPostsState(postsState.map(post => {
      if (post.id === postId && post.isJobPost) {
        post.status = post.status === 'Open' ? 'Closed' : 'Open'; // Toggle status
      }
      return post;
    }));
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

            {/* Only show "Job Status" and "Applicant Count" for Job Posts */}
            {post.isJobPost && (
              <div className="job-info">
                <div className="job-status">
                  <strong>Status:</strong> {post.status}
                  <button onClick={() => handleJobPostStatus(post.id)}>
                    {post.status === 'Open' ? 'Close Job Post' : 'Reopen Job Post'}
                  </button>
                </div>
                <div className="applicant-count">
                  <strong>Applicants:</strong> {post.applicantCount}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployerFeedPage;
