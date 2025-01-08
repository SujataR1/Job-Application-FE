// import React, { useState } from 'react';
// import './jobprofile.css';

// const JobProfile = () => {
//   const companyProfile = {
//     name: 'TechCorp',
//     description: 'Leading tech company in software development.',
//     logo: 'https://randomuser.me/api/portraits/men/1.jpg',
//     company: 'TechCorp Ltd',
//     connections: 500,
//     posts: [
//       { content: 'We are hiring software engineers! Apply now!', date: '2024-11-29' },
//       { content: 'Join us for our tech conference next month.', date: '2024-11-20' }
//     ],
//     experiences: [
//       { title: 'Software Engineer', company: 'TechCorp', duration: '2 years' },
//       { title: 'Frontend Developer', company: 'DevCo', duration: '1 year' }
//     ],
//     education: [
//       { degree: 'B.Tech in Computer Science', school: 'XYZ University' }
//     ],
//     skills: ['JavaScript', 'React', 'Node.js'],
//     interests: ['Tech Innovations', 'Software Engineering', 'AI'],
//   };

//   const [profilePhoto, setProfilePhoto] = useState(companyProfile.logo);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [newPost, setNewPost] = useState('');
//   const [videoFile, setVideoFile] = useState(null);
//   const [videoPreview, setVideoPreview] = useState(null);

//   const handleProfilePhotoChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfilePhoto(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handlePostChange = (e) => {
//     setNewPost(e.target.value);
//   };

//   const handlePostSubmit = () => {
//     if (newPost) {
//       companyProfile.posts.push({ content: newPost, date: new Date().toISOString() });
//       setNewPost('');
//     }
//   };

//   const handleProfileEnhance = () => {
//     setIsEditMode(!isEditMode);
//   };

//   const handleVideoUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const videoURL = URL.createObjectURL(file);
//       setVideoFile(file);
//       setVideoPreview(videoURL);
//     }
//   };

//   return (
//     <div className="profile-container">
//       <header className="profile-header">
//         <div className="profile-photo-container">
//           <label htmlFor="profile-photo-upload">
//             <img src={profilePhoto} alt="Company Logo" className="profile-photo" />
//           </label>
//           <input
//             id="profile-photo-upload"
//             type="file"
//             className="file-input"
//             onChange={handleProfilePhotoChange}
//           />
//         </div>
//         <div className="profile-info">
//           <h2 className="profile-name">{companyProfile.name}</h2>
//           <p className="profile-company">{companyProfile.company}</p>
//           <p className="profile-description">{companyProfile.description}</p>
//           <p className="profile-connections">{companyProfile.connections} Connections</p>
//           <button className="profile-enhance-btn" onClick={handleProfileEnhance}>
//             {isEditMode ? 'Save Profile' : 'Enhance Profile'}
//           </button>
//         </div>
//       </header>

//       <div className="profile-details">
//         <section className="profile-section">
//           <h3 className="section-title">Open to Opportunities</h3>
//           <label className="switch">
//             <input type="checkbox" />
//             <span className="slider round"></span>
//           </label>
//         </section>

//         <section className="profile-section">
//           <h3 className="section-title">Analytics</h3>
//           <p>Connections: {companyProfile.connections}</p>
//           <p>Posts: {companyProfile.posts.length}</p>
//         </section>

//         {isEditMode && (
//           <section className="profile-section">
//             <h3 className="section-title">Add Experience</h3>
//             <form>
//               <input type="text" placeholder="Job Title" className="input-field" />
//               <input type="text" placeholder="Company Name" className="input-field" />
//               <input type="text" placeholder="Duration" className="input-field" />
//               <button type="submit" className="submit-btn">Add Experience</button>
//             </form>
//           </section>
//         )}

//         <section className="profile-section">
//           <h3 className="section-title">Experience</h3>
//           {companyProfile.experiences.map((exp, index) => (
//             <div key={index} className="experience-item">
//               <h4>{exp.title}</h4>
//               <p>{exp.company}</p>
//               <p>{exp.duration}</p>
//             </div>
//           ))}
//         </section>

//         {isEditMode && (
//           <section className="profile-section">
//             <h3 className="section-title">Add Education</h3>
//             <form>
//               <input type="text" placeholder="Degree" className="input-field" />
//               <input type="text" placeholder="School/University" className="input-field" />
//               <button type="submit" className="submit-btn">Add Education</button>
//             </form>
//           </section>
//         )}

//         <section className="profile-section">
//           <h3 className="section-title">Education</h3>
//           {companyProfile.education.map((edu, index) => (
//             <div key={index} className="education-item">
//               <h4>{edu.degree}</h4>
//               <p>{edu.school}</p>
//             </div>
//           ))}
//         </section>

//         {isEditMode && (
//           <section className="profile-section">
//             <h3 className="section-title">Add Skills</h3>
//             <form>
//               <input type="text" placeholder="Skill" className="input-field" />
//               <button type="submit" className="submit-btn">Add Skill</button>
//             </form>
//           </section>
//         )}

//         <section className="profile-section">
//           <h3 className="section-title">Skills</h3>
//           <ul className="skills-list">
//             {companyProfile.skills.map((skill, index) => (
//               <li key={index} className="skill-item">{skill}</li>
//             ))}
//           </ul>
//         </section>

//         <section className="profile-section">
//           <h3 className="section-title">Interests</h3>
//           <ul className="interests-list">
//             {companyProfile.interests.map((interest, index) => (
//               <li key={index} className="interest-item">{interest}</li>
//             ))}
//           </ul>
//         </section>

//         <section className="profile-section">
//           <h3 className="section-title">Testimonial Video</h3>
//           <div className="video-container">
//             <video src="https://www.w3schools.com/html/movie.mp4" width="300" controls className="video-preview" />
//           </div>
//         </section>

//         <section className="profile-section">
//           <h3 className="section-title">Upload Video Introduction</h3>
//           <div className="video-upload">
//             <input
//               type="file"
//               accept="video/mp4"
//               onChange={handleVideoUpload}
//               id="video-upload"
//               className="video-upload-input"
//             />
//             <label htmlFor="video-upload" className="upload-btn">
//               Upload Video
//             </label>
//             {videoPreview && (
//               <div className="video-container">
//                 <video src={videoPreview} width="300" controls className="video-preview" />
//               </div>
//             )}
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default JobProfile;


import React, { useState } from 'react';
import './jobprofile.css';

const JobProfile = () => {
  const companyProfile = {
    name: 'TechCorp',
    description: 'Leading tech company in software development.',
    logo: 'https://randomuser.me/api/portraits/men/1.jpg',
    company: 'TechCorp Ltd',
    connections: 500,
    posts: [
      { content: 'We are hiring software engineers! Apply now!', date: '2024-11-29' },
      { content: 'Join us for our tech conference next month.', date: '2024-11-20' }
    ],
    experiences: [
      { title: 'Software Engineer', company: 'TechCorp', duration: '2 years' },
      { title: 'Frontend Developer', company: 'DevCo', duration: '1 year' }
    ],
    education: [
      { degree: 'B.Tech in Computer Science', school: 'XYZ University' }
    ],
    skills: ['JavaScript', 'React', 'Node.js'],
    interests: ['Tech Innovations', 'Software Engineering', 'AI'],
  };

  const [profilePhoto, setProfilePhoto] = useState(companyProfile.logo);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newPost, setNewPost] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [isVideoUploaded, setIsVideoUploaded] = useState(false); // New state for video upload status

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePostChange = (e) => {
    setNewPost(e.target.value);
  };

  const handlePostSubmit = () => {
    if (newPost) {
      companyProfile.posts.push({ content: newPost, date: new Date().toISOString() });
      setNewPost('');
    }
  };

  const handleProfileEnhance = () => {
    setIsEditMode(!isEditMode);
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const videoURL = URL.createObjectURL(file);
      setVideoFile(file);
      setVideoPreview(videoURL);
      setIsVideoUploaded(true); // Mark video as uploaded
    }
  };

  const handleVideoSubmit = () => {
    // Handle the video submission (e.g., uploading to a server)
    console.log('Video submitted:', videoFile);
    alert('Video submitted successfully!');
  };

  return (
    <div className="profile-container">
      <header className="profile-header">
        <div className="profile-photo-container">
          <label htmlFor="profile-photo-upload">
            <img src={profilePhoto} alt="Company Logo" className="profile-photo" />
          </label>
          <input
            id="profile-photo-upload"
            type="file"
            className="file-input"
            onChange={handleProfilePhotoChange}
          />
        </div>
        <div className="profile-info">
          <h2 className="profile-name">{companyProfile.name}</h2>
          <p className="profile-company">{companyProfile.company}</p>
          <p className="profile-description">{companyProfile.description}</p>
          <p className="profile-connections">{companyProfile.connections} Connections</p>
          <button className="profile-enhance-btn" onClick={handleProfileEnhance}>
            {isEditMode ? 'Save Profile' : 'Enhance Profile'}
          </button>
        </div>
      </header>

      <div className="profile-details">
        <section className="profile-section">
          <h3 className="section-title">Open to Opportunities</h3>
          <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
          </label>
        </section>

        <section className="profile-section">
          <h3 className="section-title">Analytics</h3>
          <p>Connections: {companyProfile.connections}</p>
          <p>Posts: {companyProfile.posts.length}</p>
        </section>

        {isEditMode && (
          <section className="profile-section">
            <h3 className="section-title">Add Experience</h3>
            <form>
              <input type="text" placeholder="Job Title" className="input-field" />
              <input type="text" placeholder="Company Name" className="input-field" />
              <input type="text" placeholder="Duration" className="input-field" />
              <button type="submit" className="submit-btn">Add Experience</button>
            </form>
          </section>
        )}

        <section className="profile-section">
          <h3 className="section-title">Experience</h3>
          {companyProfile.experiences.map((exp, index) => (
            <div key={index} className="experience-item">
              <h4>{exp.title}</h4>
              <p>{exp.company}</p>
              <p>{exp.duration}</p>
            </div>
          ))}
        </section>

        {isEditMode && (
          <section className="profile-section">
            <h3 className="section-title">Add Education</h3>
            <form>
              <input type="text" placeholder="Degree" className="input-field" />
              <input type="text" placeholder="School/University" className="input-field" />
              <button type="submit" className="submit-btn">Add Education</button>
            </form>
          </section>
        )}

        <section className="profile-section">
          <h3 className="section-title">Education</h3>
          {companyProfile.education.map((edu, index) => (
            <div key={index} className="education-item">
              <h4>{edu.degree}</h4>
              <p>{edu.school}</p>
            </div>
          ))}
        </section>

        {isEditMode && (
          <section className="profile-section">
            <h3 className="section-title">Add Skills</h3>
            <form>
              <input type="text" placeholder="Skill" className="input-field" />
              <button type="submit" className="submit-btn">Add Skill</button>
            </form>
          </section>
        )}

        <section className="profile-section">
          <h3 className="section-title">Skills</h3>
          <ul className="skills-list">
            {companyProfile.skills.map((skill, index) => (
              <li key={index} className="skill-item">{skill}</li>
            ))}
          </ul>
        </section>

        <section className="profile-section">
          <h3 className="section-title">Interests</h3>
          <ul className="interests-list">
            {companyProfile.interests.map((interest, index) => (
              <li key={index} className="interest-item">{interest}</li>
            ))}
          </ul>
        </section>

        <section className="profile-section">
          <h3 className="section-title">Testimonial Video</h3>
          <div className="video-container">
            <video src="https://www.w3schools.com/html/movie.mp4" width="300" controls className="video-preview" />
          </div>
        </section>

        <section className="profile-section">
          <h3 className="section-title">Upload Video Introduction</h3>
          <div className="video-upload">
            <input
              type="file"
              accept="video/mp4"
              onChange={handleVideoUpload}
              id="video-upload"
              className="video-upload-input"
            />
            <label htmlFor="video-upload" className="upload-btn">
              Upload Video
            </label>
            {videoPreview && (
              <div className="video-container">
                <video src={videoPreview} width="300" controls className="video-preview" />
              </div>
            )}
            {isVideoUploaded && (
  <button
  className="submit-video-btn"
  onClick={handleVideoSubmit}
  style={{
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    marginTop: '10px',
    width: '200px',  // Set the width of the button
  }}
>
  Submit Video
</button>

)}

          </div>
        </section>
      </div>
    </div>
  );
};

export default JobProfile;
