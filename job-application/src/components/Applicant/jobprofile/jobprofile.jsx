// import React, { useState } from 'react';
// import './jobprofile.css';

// const JobProfile = () => {
//   // Default profile data
//   const initialProfile = {
//     name: 'John Doe',
//     college: 'XYZ University',
//     jobTitle: 'Software Engineer',
//     jobPreferences: 'Frontend Developer, Full Stack Developer',
//     skills: ['JavaScript', 'React', 'Node.js'],
//     experience: [
//       { title: 'Software Engineer', company: 'TechCorp', duration: '2 years' },
//       { title: 'Frontend Developer', company: 'DevCo', duration: '1 year' },
//     ],
//     profilePhoto: 'https://randomuser.me/api/portraits/men/1.jpg',
//   };

//   const [profile, setProfile] = useState(initialProfile);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [newPost, setNewPost] = useState('');
//   const [videoFile, setVideoFile] = useState(null);
//   const [videoPreview, setVideoPreview] = useState(null);
//   const [isVideoUploaded, setIsVideoUploaded] = useState(false); // New state for video upload status

//   const handleProfilePhotoChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfile((prevProfile) => ({ ...prevProfile, profilePhoto: reader.result }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handlePostChange = (e) => {
//     setNewPost(e.target.value);
//   };

//   // Toggle edit mode and update profile data
//   const handleEditToggle = () => {
//     if (isEditMode) {
//       const updatedSkills = newProfileData.skills.split(',').map((skill) => skill.trim());
//       setProfile({
//         ...profile,
//         ...newProfileData,
//         skills: updatedSkills,
//       });
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
//       setIsVideoUploaded(true); // Mark video as uploaded
//     }
//   };

//   const handleVideoSubmit = () => {
//     // Handle the video submission (e.g., uploading to a server)
//     console.log('Video submitted:', videoFile);
//     alert('Video submitted successfully!');
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
//             {isVideoUploaded && (
//   <button
//   className="submit-video-btn"
//   onClick={handleVideoSubmit}
//   style={{
//     backgroundColor: '#4CAF50',
//     color: 'white',
//     border: 'none',
//     cursor: 'pointer',
//     marginTop: '10px',
//     width: '200px',  // Set the width of the button
//   }}
// >
//   Submit Video
// </button>

// )}

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
  // Default profile data
  const initialProfile = {
    name: 'John Doe',
    college: 'XYZ University',
    jobTitle: 'Software Engineer',
    jobPreferences: 'Frontend Developer, Full Stack Developer',
    skills: ['JavaScript', 'React', 'Node.js'],
    experience: [
      { title: 'Software Engineer', company: 'TechCorp', duration: '2 years' },
      { title: 'Frontend Developer', company: 'DevCo', duration: '1 year' },
    ],
    profilePhoto: 'https://randomuser.me/api/portraits/men/1.jpg',
  };

  const [profile, setProfile] = useState(initialProfile);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newPost, setNewPost] = useState(''); // State to track new skill input
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [isVideoUploaded, setIsVideoUploaded] = useState(false); // State for video upload status

  // Function to handle profile photo change
  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prevProfile) => ({ ...prevProfile, profilePhoto: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle post (new skill input) change
  const handlePostChange = (e) => {
    setNewPost(e.target.value);
  };

  // Toggle edit mode and update profile data
  const handleEditToggle = () => {
    if (isEditMode) {
      // Split the new post (skills) input into an array and trim whitespace
      const updatedSkills = newPost.split(',').map((skill) => skill.trim());
      setProfile({
        ...profile,
        skills: updatedSkills,
      });
    }
    setIsEditMode(!isEditMode); // Toggle edit mode
  };

  // Function to handle video upload
  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const videoURL = URL.createObjectURL(file);
      setVideoFile(file);
      setVideoPreview(videoURL);
      setIsVideoUploaded(true); // Mark video as uploaded
    }
  };

  // Function to handle video submission
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
            <img src={profile.profilePhoto} alt="Profile" className="profile-photo" />
          </label>
          <input
            id="profile-photo-upload"
            type="file"
            className="file-input"
            onChange={handleProfilePhotoChange}
          />
        </div>
        <div className="profile-info">
          <h2 className="profile-name">{profile.name}</h2>
          <p className="profile-college">{profile.college}</p>
          <p className="profile-job-title">{profile.jobTitle}</p>
          <p className="profile-job-preferences">{profile.jobPreferences}</p>
          <button className="profile-enhance-btn" onClick={handleEditToggle}>
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
          <p>Connections: 200</p>
          <p>Posts: 10</p>
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
          {profile.experience.map((exp, index) => (
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
          <div className="education-item">
            <h4>Bachelor of Science in Computer Science</h4>
            <p>XYZ University</p>
          </div>
        </section>

        {isEditMode && (
          <section className="profile-section">
            <h3 className="section-title">Add Skills</h3>
            <form>
              <input
                type="text"
                placeholder="New Skill"
                value={newPost}
                onChange={handlePostChange} // Capture new skill input
                className="input-field"
              />
              <button type="submit" className="submit-btn">Add Skill</button>
            </form>
          </section>
        )}

        <section className="profile-section">
          <h3 className="section-title">Skills</h3>
          <ul className="skills-list">
            {profile.skills.map((skill, index) => (
              <li key={index} className="skill-item">{skill}</li>
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
