import React, { useState } from 'react';
import './User.css'; // CSS for styling
import {  FaTrashAlt, FaEye } from 'react-icons/fa'; // Import icons
import AdminNavbar from '../Navbar/Navbar';
import AdminSidenavbar from '../Sidenavbar/Sidenavbar';

// Sample Data for Users (You can replace this with actual data fetched from your API)
const initialUsers = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Applicant', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Employer', status: 'Inactive' },
  { id: 3, name: 'Michael Johnson', email: 'michael.johnson@example.com', role: 'Applicant', status: 'Active' },
  { id: 4, name: 'Emily Davis', email: 'emily.davis@example.com', role: 'Employer', status: 'Active' },
];

const ManageUsers = () => {
  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState(null); // For the View modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

  const handleDelete = (id) => {
    // Handle deleting the user
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleEdit = (id) => {
    // Handle editing the user (redirect to edit user page or show modal)
    alert(`Edit user with ID: ${id}`);
  };

  const handleView = (user) => {
    // Open modal to show user details
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };
  const homePageStyle = {
    backgroundImage: 'url(./components/Admin/background.jpg)', // Replace with your image URL
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  };
  return (
    <div className="home-page" style={homePageStyle}>
      <AdminNavbar />
      <div className="home-content flex flex-row">
        <AdminSidenavbar />
        <div className="manage-users-container">
          <h2>Manage Users</h2>
          <div className="user-table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td className={user.status === 'Active' ? 'active' : 'inactive'}>{user.status}</td>
                    <td>
                      <button
                        onClick={() => handleView(user)}
                        style={{
                          backgroundColor: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          margin: '0 10px',
                          fontSize: '18px',
                          color: '#007bff',
                          transition: 'color 0.3s ease',
                        }}
                      >
                        <FaEye /> View
                      </button>
                     
                      <button
                        onClick={() => handleDelete(user.id)}
                        style={{
                          backgroundColor: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          margin: '0 10px',
                          fontSize: '18px',
                          color: '#dc3545',
                          transition: 'color 0.3s ease',
                        }}
                      >
                        <FaTrashAlt /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal for Viewing User Details */}
      {isModalOpen && selectedUser && (
        <div className="user-modal-overlay">
          <div className="user-modal">
            <h3>User Details</h3>
            <p><strong>Name:</strong> {selectedUser.name}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Role:</strong> {selectedUser.role}</p>
            <p><strong>Status:</strong> {selectedUser.status}</p>
            <button onClick={closeModal} className="close-modal-btn">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
