// // EmployerProfile.js
// import React, { useState } from 'react';

// const EmployerProfile = ({ company, onUpdateCompany }) => {
//   const [companyName, setCompanyName] = useState(company.name);
//   const [companyDescription, setCompanyDescription] = useState(company.description);
//   const [companyLogo, setCompanyLogo] = useState(company.logo);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const updatedCompany = {
//       name: companyName,
//       description: companyDescription,
//       logo: companyLogo,
//     };
//     onUpdateCompany(updatedCompany);
//   };

//   return (
//     <div>
//       <h3>Company Profile</h3>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Company Name</label>
//           <input
//             type="text"
//             value={companyName}
//             onChange={(e) => setCompanyName(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Company Description</label>
//           <textarea
//             value={companyDescription}
//             onChange={(e) => setCompanyDescription(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Company Logo URL</label>
//           <input
//             type="text"
//             value={companyLogo}
//             onChange={(e) => setCompanyLogo(e.target.value)}
//           />
//         </div>
//         <button type="submit">Update Profile</button>
//       </form>
//     </div>
//   );
// };

// export default EmployerProfile;
import React from 'react';

const ProfileManagement = () => {
  const companyProfile = {
    name: 'TechCorp',
    description: 'Leading tech company in software development.',
    logo: 'https://randomuser.me/api/portraits/men/1.jpg',
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Company Profile</h2>
      <div style={{ marginBottom: '20px' }}>
        <img src={companyProfile.logo} alt="Company Logo" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
      </div>
      <div>
        <h3>{companyProfile.name}</h3>
        <p>{companyProfile.description}</p>
      </div>
      <button style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}>
        Edit Profile
      </button>
    </div>
  );
};

export default ProfileManagement;


