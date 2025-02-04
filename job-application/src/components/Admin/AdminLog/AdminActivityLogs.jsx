import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminActivityLogs.css';
import AdminNavbar from '../Navbar/Navbar';
import AdminSidenavbar from '../Sidenavbar/Sidenavbar';

const AdminActivityLogs = () => {
  const [logs, setLogs] = useState([]);
  const [filters, setFilters] = useState({
    user: '',
    actionType: '',
    date: '',
  });
  const [sortedBy, setSortedBy] = useState('timestamp');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLogs = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('http://localhost:7000/admin/activity-logs', {
          method: 'GET',
          headers: {
            Authorization: ` ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setLogs(data); // Set logs fetched from the API
        } else {
          console.error('Failed to fetch logs', data.message);
        }
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    };

    fetchLogs();
  }, [navigate]);

  const handleSort = (column) => {
    setSortedBy(column);
    const sortedLogs = [...logs].sort((a, b) => {
      if (column === 'timestamp') {
        return new Date(a.timestamp) - new Date(b.timestamp);
      }
      if (column === 'user') {
        return a.user.localeCompare(b.user);
      }
      if (column === 'actionType') {
        return a.actionType.localeCompare(b.actionType);
      }
      return 0;
    });
    setLogs(sortedLogs);
  };

  const filteredLogs = logs.filter(log => {
    return (
      (filters.user ? log.user.toLowerCase().includes(filters.user.toLowerCase()) : true) &&
      (filters.actionType ? log.actionType.toLowerCase().includes(filters.actionType.toLowerCase()) : true) &&
      (filters.date ? log.timestamp.includes(filters.date) : true)
    );
  });

  return (
    <div className="admin-activity-logs-page">
      <AdminNavbar />
      <div className="admin-activity-logs-content flex justify-center items-center min-h-screen bg-gray-100">
        <div className="admin-activity-logs-container flex flex-row">
          <AdminSidenavbar />
          <div className="admin-activity-logs-form-container">
            <h2>User Activity Logs</h2>

            {/* Filters Section */}
            <div className="filters">
              <input
                type="text"
                placeholder="Filter by User"
                value={filters.user}
                onChange={(e) => setFilters({ ...filters, user: e.target.value })}
              />
              <input
                type="text"
                placeholder="Filter by Action Type"
                value={filters.actionType}
                onChange={(e) => setFilters({ ...filters, actionType: e.target.value })}
              />
              <input
                type="date"
                value={filters.date}
                onChange={(e) => setFilters({ ...filters, date: e.target.value })}
              />
            </div>

            {/* Activity Logs Table */}
            <table className="activity-logs-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort('timestamp')}>Timestamp</th>
                  <th onClick={() => handleSort('actionType')}>Action Type</th>
                  <th onClick={() => handleSort('affectedEntity')}>Affected Entity</th>
                  <th onClick={() => handleSort('user')}>User</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log, index) => (
                  <tr key={index} className={`log-row ${log.actionType.toLowerCase()}`}>
                    <td>{new Date(log.timestamp).toLocaleString()}</td>
                    <td>{log.actionType}</td>
                    <td>{log.affectedEntity}</td>
                    <td>{log.user}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminActivityLogs;
