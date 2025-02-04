import React, { useState } from 'react'; 
import './User.css'; // CSS for styling
import { FaTrashAlt, FaEye } from 'react-icons/fa'; // Import icons
import AdminNavbar from '../Navbar/Navbar';
import AdminSidenavbar from '../Sidenavbar/Sidenavbar';

// Sample Data for Users (You can replace this with actual data fetched from your API)
const initialUsers = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Applicant', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Employer', status: 'Inactive' },
  { id: 3, name: 'Michael Johnson', email: 'michael.johnson@example.com', role: 'Applicant', status: 'Active' },
  { id: 4, name: 'Emily Davis', email: 'emily.davis@example.com', role: 'Employer', status: 'Active' },
  // Add more users as needed for testing pagination
];

const ManageUsers = () => {
  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState(null); // For the View modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [searchQuery, setSearchQuery] = useState(''); // Search query state
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const usersPerPage = 2; // Number of users per page

  // Handle Delete action with confirmation
  const handleDelete = (id) => {
    const confirmation = window.confirm('Are you sure you want to delete this user?');
    if (confirmation) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  // Handle Edit action (this can be redirected to another page or modal)
  const handleEdit = (id) => {
    alert(`Edit user with ID: ${id}`);
  };

  // Handle View action
  const handleView = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  // Search filter
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Change page handler
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
          
          {/* Search Bar */}
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by name or email"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

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
                {currentUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td className={user.status === 'Active' ? 'active' : 'inactive'}>{user.status}</td>
                    <td>
                      <button
                        onClick={() => handleView(user)}
                        className="action-button view-button"
                      >
                        <FaEye /> View
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="action-button delete-button"
                      >
                        <FaTrashAlt /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="pagination-container">
            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
              Prev
            </button>
            <span>{currentPage}</span>
            <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
              Next
            </button>
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
