// import React, { useState } from 'react';

// import Sidebar from '../Sidebar/Sidebar'; // Create Sidebar Component
// import Feed from '../Feed/Feed';  // Create Feed Component
// import './Home.css';

// const HomePage = () => {
//   const [postText, setPostText] = useState('');

//   const handlePostSubmit = (e) => {
//     e.preventDefault();
//     if (postText.trim() !== '') {
//       alert(`Post Created: ${postText}`);
//       setPostText(''); // Clear the text after post submission
//     }
//   };

//   return (
//     <div className="home-page">
//       {/* Navbar/Header */}


//       <div className="home-content flex flex-row">
//         {/* Sidebar */}
//         <Sidebar />

//         {/* Main Content Area */}


//           {/* Feed Section */}
//           <Feed />
//         </div>
//       </div>

//   );
// };

// export default HomePage;
import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar'; // Create Sidebar Component
import './Home.css';

const HomePage = () => {
  const [postData, setPostData] = useState({
    title: '', // Post title
    content: '', // Post content
    visibility: 'Everyone', // Default visibility
    allowSharing: true, // Allow sharing by default
    allowReposts: false, // Disallow reposts by default
  });

  const [posts, setPosts] = useState([]); // Store posts in an array

  // Retrieve token from localStorage (or any other place you store it)
  const token = localStorage.getItem('authToken'); // Example, replace with your method of token retrieval

  // Handle changes in input fields
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPostData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value, // Handle checkbox correctly
    }));
  };

  // Handle post submission
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const { title, content, visibility, allowSharing, allowReposts } = postData;

    // Check if token exists
    if (!token) {
      console.error('No token found. Please log in.');
      return;
    }

    if (title.trim() !== '' && content.trim() !== '') {
      try {
        // Create a new FormData object
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('visibility', visibility);
        formData.append('allowSharing', allowSharing);
        formData.append('allowReposts', allowReposts);

        // Send the request with the token and FormData
        const response = await fetch('http://localhost:7000/posts/create', {
          method: 'POST',
          headers: {
            'Authorization': ` ${token}`, // Correct token format with Bearer
            // Don't manually set Content-Type when using FormData
          },
          body: formData,
        });

        // Handle the server response
        if (response.ok) {
          const result = await response.json();
          console.log('Post created successfully:', result);

          // After creating the post, add it to the posts state
          setPosts([result.post, ...posts]); // Adding the new post to the top

          // Reset the form after submitting
          setPostData({
            title: '',
            content: '',
            visibility: 'Everyone',
            allowSharing: true,
            allowReposts: false,
          });
        } else {
          const errorData = await response.json();
          console.error('Error creating post:', errorData.message);
        }
      } catch (error) {
        console.error('Error creating post:', error);
      }
    } else {
      console.error('Please fill out both the title and content fields.');
    }
  };

  return (
    <div className="home-page">
      {/* Sidebar */}
      <Sidebar />

      <div className="home-content">
        {/* Feed Section */}
        <div className="feed-container">
          <h2>Create a Post</h2>

          {/* Post Form */}
          <form onSubmit={handlePostSubmit}>
            <div>
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={postData.title}
                onChange={handleInputChange}
                placeholder="Post Title"
              />
            </div>
            <div>
              <label>Content</label>
              <textarea
                name="content"
                value={postData.content}
                onChange={handleInputChange}
                placeholder="What's on your mind?"
                rows="5"
              ></textarea>
            </div>
            <div>
              <label>Visibility</label>
              <select
                name="visibility"
                value={postData.visibility}
                onChange={handleInputChange}
              >
                <option value="Everyone">Everyone</option>
                <option value="Only Me">Only Me</option>
                <option value="Friends">Friends</option>
              </select>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="allowSharing"
                  checked={postData.allowSharing}
                  onChange={handleInputChange}
                />
                Allow Sharing
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="allowReposts"
                  checked={postData.allowReposts}
                  onChange={handleInputChange}
                />
                Allow Reposts
              </label>
            </div>
            <div>
              <button type="submit">Post</button>
            </div>
          </form>

          {/* Display Posts */}
          {posts.length > 0 ? (
            <div className="posts-list">
              {posts.map((post) => (
                <div key={post.id} className="post-card">
                  <h3>{post.title}</h3>
                  <p>{post.content}</p>
                  <small>Visibility: {post.visibility}</small>
                  <div>
                    <button>{post.allowSharing ? 'Allow Sharing' : 'No Sharing'}</button>
                    <button>{post.allowReposts ? 'Allow Reposts' : 'No Reposts'}</button>
                  </div>
                  <small>Created at: {new Date(post.createdAt).toLocaleString()}</small>
                </div>
              ))}
            </div>
          ) : (
            <p>No posts available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
