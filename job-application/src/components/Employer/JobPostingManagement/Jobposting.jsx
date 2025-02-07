import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployerNavbar from '../Navbar/Navbar';
import EmployerSidebar from '../Sidebar/Sidebar';

const JobPost = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState('');
  const [job, setJob] = useState({
    title: '',
    summary: '',
    description: '',
    locations: [''],
    address: {
      street: '',
      city: '',
      zip: '',
      country: ''
    },
    skills: [''],
    requirements: [''],
    min_experience: '',
    max_experience: '',
    min_salary: '',
    max_salary: '',
    companyId: '',
    tags: ['']
  });
  const [token, setToken] = useState('');

  // Fetch companies on component mount
  useEffect(() => {
      const authToken = localStorage.getItem('token');
      setToken(authToken);
  
      if (authToken) {
        axios
          .get('http://localhost:7000/jobposts/companies-user-can-post-jobs-for', {
            headers: {
              Authorization: ` ${authToken}`,
            },
          })
          .then((response) => {
            setCompanies(response.data.companies || []);
          })
          .catch((error) => console.error('Error fetching companies:', error));
      }
    }, []);
  

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!job.title || typeof job.title !== 'string' || job.title.trim() === '') {
      alert('Job title is required and must be a string.');
      return;
    }
    if (isNaN(job.min_experience) || isNaN(job.max_experience)) {
      alert('Experience fields must be numbers.');
      return;
    }
    if (isNaN(job.min_salary) || isNaN(job.max_salary)) {
      alert('Salary fields must be numbers.');
      return;
    }

    const jobPostData = {
      title: job.title,
      summary: job.summary,
      description: job.description,
      locations: job.locations,
      address: job.address,
      skills: job.skills,
      requirements: job.requirements,
      min_experience: job.min_experience,
      max_experience: job.max_experience,
      min_salary: job.min_salary,
      max_salary: job.max_salary,
      companyId: selectedCompanyId || job.companyId,
      status: "Open",
      tags: job.tags
    };

    axios
      .post('http://localhost:7000/jobposts', jobPostData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: ` ${token}`
        }
      })
      .then((response) => {
        console.log('Job posted successfully:', response.data);
        alert('Job posted successfully!');
      })
      .catch((error) => {
        console.error('Error posting job:', error);
        alert('Failed to post job. Please try again.');
      });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar/Header */}
      <EmployerNavbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <EmployerSidebar />

        {/* Main Content */}
        <div className="flex-1 px-8 py-12">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-8 ml-4">
            Post a New Job
          </h2>

          <form
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto p-8 bg-white border border-gray-200 rounded-xl shadow-lg space-y-8"
          >
            {/* Job Title */}
            <div className="space-y-2">
              <label className="block text-xl font-semibold text-gray-700">
                Job Title
              </label>
              <input
                type="text"
                value={job.title}
                onChange={(e) => setJob({ ...job, title: e.target.value })}
                required
                className="w-full p-4 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Job Summary */}
            <div className="space-y-2">
              <label className="block text-xl font-semibold text-gray-700">
                Job Summary
              </label>
              <textarea
                value={job.summary}
                onChange={(e) => setJob({ ...job, summary: e.target.value })}
                required
                className="w-full p-4 border border-gray-300 rounded-md text-lg h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Job Description */}
            <div className="space-y-2">
              <label className="block text-xl font-semibold text-gray-700">
                Job Description
              </label>
              <textarea
                value={job.description}
                onChange={(e) => setJob({ ...job, description: e.target.value })}
                required
                className="w-full p-4 border border-gray-300 rounded-md text-lg h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Job Locations */}
            <div className="space-y-2">
              <label className="block text-xl font-semibold text-gray-700">
                Locations
              </label>
              <input
                type="text"
                value={job.locations.join(', ')}
                onChange={(e) =>
                  setJob({ ...job, locations: e.target.value.split(',').map((loc) => loc.trim()) })
                }
                required
                className="w-full p-4 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Job Address Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xl font-semibold text-gray-700">
                  Street Address
                </label>
                <input
                  type="text"
                  value={job.address.street}
                  onChange={(e) =>
                    setJob({ ...job, address: { ...job.address, street: e.target.value } })
                  }
                  required
                  className="w-full p-4 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xl font-semibold text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  value={job.address.city}
                  onChange={(e) =>
                    setJob({ ...job, address: { ...job.address, city: e.target.value } })
                  }
                  required
                  className="w-full p-4 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xl font-semibold text-gray-700">
                  Pin Code
                </label>
                <input
                  type="text"
                  value={job.address.zip}
                  onChange={(e) =>
                    setJob({ ...job, address: { ...job.address, zip: e.target.value } })
                  }
                  required
                  className="w-full p-4 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xl font-semibold text-gray-700">
                  Country
                </label>
                <input
                  type="text"
                  value={job.address.country}
                  onChange={(e) =>
                    setJob({ ...job, address: { ...job.address, country: e.target.value } })
                  }
                  required
                  className="w-full p-4 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Job Skills */}
            <div className="space-y-2">
              <label className="block text-xl font-semibold text-gray-700">
                Skills
              </label>
              <input
                type="text"
                value={job.skills.join(', ')}
                onChange={(e) =>
                  setJob({ ...job, skills: e.target.value.split(',').map((skill) => skill.trim()) })
                }
                required
                className="w-full p-4 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Job Requirements */}
            <div className="space-y-2">
              <label className="block text-xl font-semibold text-gray-700">
                Requirements
              </label>
              <input
                type="text"
                value={job.requirements.join(', ')}
                onChange={(e) =>
                  setJob({ ...job, requirements: e.target.value.split(',').map((req) => req.trim()) })
                }
                required
                className="w-full p-4 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Job Experience */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xl font-semibold text-gray-700">
                  Min Experience
                </label>
                <input
                  type="number"
                  value={job.min_experience}
                  onChange={(e) => setJob({ ...job, min_experience: parseInt(e.target.value) })}
                  required
                  className="w-full p-4 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xl font-semibold text-gray-700">
                  Max Experience
                </label>
                <input
                  type="number"
                  value={job.max_experience}
                  onChange={(e) => setJob({ ...job, max_experience: parseInt(e.target.value) })}
                  required
                  className="w-full p-4 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Job Salary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xl font-semibold text-gray-700">
                  Min Salary
                </label>
                <input
                  type="number"
                  value={job.min_salary}
                  onChange={(e) => setJob({ ...job, min_salary: parseInt(e.target.value) })}
                  required
                  className="w-full p-4 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xl font-semibold text-gray-700">
                  Max Salary
                </label>
                <input
                  type="number"
                  value={job.max_salary}
                  onChange={(e) => setJob({ ...job, max_salary: parseInt(e.target.value) })}
                  required
                  className="w-full p-4 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Company Selection */}
            <div className="space-y-2">
              <label className="block text-xl font-semibold text-gray-700">
                Company
              </label>
              <select
                value={selectedCompanyId || job.companyId}
                onChange={(e) => setSelectedCompanyId(e.target.value)}
                required
                className="w-full p-4 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a company</option>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Job Tags */}
            <div className="space-y-2">
              <label className="block text-xl font-semibold text-gray-700">
                Tags
              </label>
              <input
                type="text"
                value={job.tags.join(', ')}
                onChange={(e) =>
                  setJob({ ...job, tags: e.target.value.split(',').map((tag) => tag.trim()) })
                }
                required
                className="w-full p-4 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-green-600 text-white font-bold text-xl rounded-md hover:bg-green-700 transition"
            >
              Post Job
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobPost;
