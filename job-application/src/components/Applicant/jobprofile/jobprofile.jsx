// import React, { useState } from 'react';
// import './jobprofile.css';

// const JobProfile = () => {
//   // Default profile data
//   const initialProfile = {
//     name: 'TechCorp',
//     description: 'Leading tech company in software development.',
//     logo: 'https://randomuser.me/api/portraits/men/1.jpg',
//     company: 'TechCorp Ltd',
//     connections: 500,
//   };

//   const [profile, setProfile] = useState(initialProfile);
//   const [profilePhoto, setProfilePhoto] = useState(initialProfile.logo);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [newProfileData, setNewProfileData] = useState({
//     name: profile.name,
//     description: profile.description,
//     company: profile.company,
//     connections: profile.connections,
//   });

//   // Handle profile photo change
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

//   // Handle input changes in edit mode
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewProfileData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   // Toggle edit mode and update profile data
//   const handleEditToggle = () => {
//     if (isEditMode) {
//       setProfile({
//         ...profile,
//         ...newProfileData, // Update profile with new data
//       });
//     }
//     setIsEditMode(!isEditMode);
//   };

//   return (
//     <div className="profile-main-content">
//       <div className="profile-header">
//         <div className="profile-photo">
//           <label htmlFor="profile-photo-upload">
//             <img src={profilePhoto} alt="Profile" className="profile-photo-img" />
//           </label>
//           <input
//             id="profile-photo-upload"
//             type="file"
//             style={{ display: 'none' }}
//             onChange={handleProfilePhotoChange}
//           />
//         </div>
//         <div className="profile-info">
//           <h2>
//             {isEditMode ? (
//               <input
//                 type="text"
//                 name="name"
//                 value={newProfileData.name}
//                 onChange={handleInputChange}
//                 placeholder="Company Name"
//                 className="profile-input"
//               />
//             ) : (
//               profile.name
//             )}
//           </h2>
//           <p>
//             {isEditMode ? (
//               <input
//                 type="text"
//                 name="company"
//                 value={newProfileData.company}
//                 onChange={handleInputChange}
//                 placeholder="Company Name"
//                 className="profile-input"
//               />
//             ) : (
//               profile.company
//             )}
//           </p>
//           <p>
//             {isEditMode ? (
//               <textarea
//                 name="description"
//                 value={newProfileData.description}
//                 onChange={handleInputChange}
//                 placeholder="Company Description"
//                 className="profile-textarea"
//               />
//             ) : (
//               profile.description
//             )}
//           </p>
//           <p>{profile.connections} Connections</p>
//           <button className="enhance-profile-button" onClick={handleEditToggle}>
//             {isEditMode ? 'Save Changes' : 'Edit Profile'}
//           </button>
//         </div>
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
  const [newProfileData, setNewProfileData] = useState({
    name: profile.name,
    college: profile.college,
    jobTitle: profile.jobTitle,
    jobPreferences: profile.jobPreferences,
    skills: profile.skills.join(', '),
    experience: profile.experience,
  });

  // Handle profile photo change
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

  // Handle input changes in edit mode
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Toggle edit mode and update profile data
  const handleEditToggle = () => {
    if (isEditMode) {
      const updatedSkills = newProfileData.skills.split(',').map((skill) => skill.trim());
      setProfile({
        ...profile,
        ...newProfileData,
        skills: updatedSkills,
      });
    }
    setIsEditMode(!isEditMode);
  };

  return (
    <div className="profile-main-content">
      <div className="profile-header">
        <div className="profile-photo">
          <label htmlFor="profile-photo-upload">
            <img src={profile.profilePhoto} alt="Profile" className="profile-photo-img" />
          </label>
          <input
            id="profile-photo-upload"
            type="file"
            style={{ display: 'none' }}
            onChange={handleProfilePhotoChange}
          />
        </div>
        <div className="profile-info">
          <h2>
            {isEditMode ? (
              <input
                type="text"
                name="name"
                value={newProfileData.name}
                onChange={handleInputChange}
                placeholder="Name"
                className="profile-input"
              />
            ) : (
              profile.name
            )}
          </h2>
          <p>
            {isEditMode ? (
              <input
                type="text"
                name="college"
                value={newProfileData.college}
                onChange={handleInputChange}
                placeholder="College Name"
                className="profile-input"
              />
            ) : (
              profile.college
            )}
          </p>
          <p>
            {isEditMode ? (
              <input
                type="text"
                name="jobTitle"
                value={newProfileData.jobTitle}
                onChange={handleInputChange}
                placeholder="Job Title"
                className="profile-input"
              />
            ) : (
              profile.jobTitle
            )}
          </p>
          <p>
            {isEditMode ? (
              <textarea
                name="jobPreferences"
                value={newProfileData.jobPreferences}
                onChange={handleInputChange}
                placeholder="Job Preferences"
                className="profile-textarea"
              />
            ) : (
              profile.jobPreferences
            )}
          </p>
          <p>
            {isEditMode ? (
              <textarea
                name="skills"
                value={newProfileData.skills}
                onChange={handleInputChange}
                placeholder="Skills (comma separated)"
                className="profile-textarea"
              />
            ) : (
              profile.skills.join(', ')
            )}
          </p>

          {/* Experience Section */}
          <div className="experience-section">
            <h4>Experience</h4>
            {profile.experience.map((exp, index) => (
              <div key={index} className="experience-item">
                <p>{exp.title} at {exp.company} ({exp.duration})</p>
              </div>
            ))}
            {isEditMode && (
              <div className="add-experience">
                <input type="text" name="title" placeholder="Job Title" onChange={handleInputChange} />
                <input type="text" name="company" placeholder="Company" onChange={handleInputChange} />
                <input type="text" name="duration" placeholder="Duration" onChange={handleInputChange} />
              </div>
            )}
          </div>
          <button className="enhance-profile-button" onClick={handleEditToggle}>
            {isEditMode ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobProfile;
