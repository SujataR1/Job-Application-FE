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

  // Handle profile photo change
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

  // Handle post creation
  const handlePostChange = (e) => {
    setNewPost(e.target.value);
  };

  const handlePostSubmit = () => {
    if (newPost) {
      companyProfile.posts.push({ content: newPost, date: new Date().toISOString() });
      setNewPost('');
    }
  };

  // Toggle edit mode for profile enhancement
  const handleProfileEnhance = () => {
    setIsEditMode(!isEditMode);
  };

  return (
    

        <div className="profile-main-content">
          <div className="profile-header">
            <div className="profile-photo">
              <label htmlFor="profile-photo-upload">
                <img src={profilePhoto} alt="Company Logo" className="profile-photo-img" />
              </label>
              <input
                id="profile-photo-upload"
                type="file"
                style={{ display: 'none' }}
                onChange={handleProfilePhotoChange}
              />
            </div>
            <div className="profile-info">
              <h2>{companyProfile.name}</h2>
              <p>{companyProfile.company}</p>
              <p>{companyProfile.description}</p>
              <p>{companyProfile.connections} Connections</p>
              <button className="enhance-profile-button" onClick={handleProfileEnhance}>
                {isEditMode ? 'Save Profile' : 'Enhance Profile'}
              </button>
            </div>
          </div>

          <div className="profile-sections">
            <div className="profile-section">
              <h3>Open to Opportunities</h3>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
            </div>

            <div className="profile-section">
              <h3>Analytics</h3>
              <p>Connections: {companyProfile.connections}</p>
              <p>Posts: {companyProfile.posts.length}</p>
            </div>

            {/* Experience Section */}
            {isEditMode && (
              <div className="profile-section">
                <h3>Add Experience</h3>
                <form>
                  <input type="text" placeholder="Job Title" />
                  <input type="text" placeholder="Company Name" />
                  <input type="text" placeholder="Duration" />
                  <button type="submit">Add Experience</button>
                </form>
              </div>
            )}
            <div className="profile-section">
              <h3>Experience</h3>
              {companyProfile.experiences.map((exp, index) => (
                <div key={index} className="experience-item">
                  <h4>{exp.title}</h4>
                  <p>{exp.company}</p>
                  <p>{exp.duration}</p>
                </div>
              ))}
            </div>

            {/* Education Section */}
            {isEditMode && (
              <div className="profile-section">
                <h3>Add Education</h3>
                <form>
                  <input type="text" placeholder="Degree" />
                  <input type="text" placeholder="School/University" />
                  <button type="submit">Add Education</button>
                </form>
              </div>
            )}
            <div className="profile-section">
              <h3>Education</h3>
              {companyProfile.education.map((edu, index) => (
                <div key={index} className="education-item">
                  <h4>{edu.degree}</h4>
                  <p>{edu.school}</p>
                </div>
              ))}
            </div>

            {/* Skills Section */}
            {isEditMode && (
              <div className="profile-section">
                <h3>Add Skills</h3>
                <form>
                  <input type="text" placeholder="Skill" />
                  <button type="submit">Add Skill</button>
                </form>
              </div>
            )}
            <div className="profile-section">
              <h3>Skills</h3>
              <ul
  style={{
    backgroundColor: 'black',
    padding: '15px',
    borderRadius: '8px',
    width: 'fit-content',
  }}
>
  {companyProfile.skills.map((skill, index) => (
    <li
      key={index}
      style={{
        color: 'black',
        padding: '8px',
        listStyleType: 'none',
        marginBottom: '5px',
        cursor: 'pointer', // Optional: Adds a pointer cursor on hover
      }}
     
      onMouseOut={(e) => (e.target.style.backgroundColor = '')} // Reset background when not hovering
    >
      {skill}
    </li>
  ))}
</ul>
            </div>

            {/* Interests Section */}
            <div className="profile-section">
              <h3>Interests</h3>
              <ul
  style={{
    backgroundColor: 'black',
    padding: '15px',
    borderRadius: '8px',
    width: 'fit-content',
  }}
>
  {companyProfile.interests.map((interest, index) => (
    <li
      key={index}
      style={{
        color: 'black',
        padding: '8px',
        listStyleType: 'none',
        marginBottom: '5px',
        cursor: 'pointer', // Optional: Adds a pointer cursor on hover
      }}
     // Darker background on hover
      onMouseOut={(e) => (e.target.style.backgroundColor = '')} // Reset background when not hovering
    >
      {interest}
    </li>
  ))}
</ul>

            </div>
          </div>
        </div>
      
  );
};

export default JobProfile;
