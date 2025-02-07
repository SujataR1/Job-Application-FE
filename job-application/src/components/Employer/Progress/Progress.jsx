import React, { useState } from 'react';
import EmployerNavbar from '../Navbar/Navbar';
import EmployerSidebar from '../Sidebar/Sidebar';

const initialApplicants = [
  {
    id: 1,
    name: 'John Doe',
    status: 'Shortlisted',
    domain: 'Software Development',
    interviewMode: 'Online',
    interviewDate: '2024-12-10',
    interviewTime: '10:00',
    interviewLink: 'https://meet.google.com/johndoe',
    interviewStatus: 'In Progress',
    designation: 'Software Developer',
  },
  {
    id: 2,
    name: 'Jane Smith',
    status: 'Shortlisted',
    domain: 'Product Management',
    interviewMode: 'Physical',
    interviewDate: '2024-12-12',
    interviewTime: '14:00',
    interviewLink: '',
    interviewStatus: 'Scheduled',
    designation: 'Product Manager',
  },
  {
    id: 3,
    name: 'Emma Watson',
    status: 'Pending',
    domain: 'UI/UX Design',
    interviewMode: '',
    interviewDate: '',
    interviewTime: '',
    interviewLink: '',
    interviewStatus: '',
    designation: 'UI/UX Designer',
  },
  {
    id: 4,
    name: 'Chris Brown',
    status: 'Rejected',
    domain: 'Marketing',
    interviewMode: '',
    interviewDate: '',
    interviewTime: '',
    interviewLink: '',
    interviewStatus: '',
    designation: 'Marketing Executive',
  },
];

const HiringProcessPage = () => {
  const [applicants, setApplicants] = useState(initialApplicants);
  const [selectedCandidates, setSelectedCandidates] = useState([]);

  const handleSendOfferLetter = (id) => {
    const updatedApplicants = applicants.map((applicant) =>
      applicant.id === id ? { ...applicant, status: 'Offer Sent' } : applicant
    );
    setApplicants(updatedApplicants);

    // Add the candidate to selected candidates list
    const selectedCandidate = applicants.find(applicant => applicant.id === id);
    setSelectedCandidates([...selectedCandidates, selectedCandidate]);
  };

  const handleRejectCandidate = (id) => {
    const updatedApplicants = applicants.map((applicant) =>
      applicant.id === id ? { ...applicant, status: 'Rejected' } : applicant
    );
    setApplicants(updatedApplicants);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <EmployerNavbar />
      <div className="flex flex-1">
        <EmployerSidebar />
        <main className="flex-1 p-24 ml-64">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-8">
            Hiring Process
          </h1>

          {/* Shortlisted Candidates */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
              Shortlisted Candidates
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {applicants
                .filter((applicant) => applicant.status === 'Shortlisted')
                .map((applicant) => (
                  <div
                    key={applicant.id}
                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
                  >
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {applicant.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-1">
                      Status: {applicant.interviewStatus}
                    </p>
                    <p className="text-sm text-gray-500 mb-3">
                      Domain: {applicant.domain}
                    </p>

                    {/* Interview Details */}
                    <div className="mt-4">
                      <h4 className="text-base font-semibold text-gray-700 mb-2">
                        Interview Details
                      </h4>
                      <p className="text-sm text-gray-500">
                        Mode: {applicant.interviewMode}
                      </p>
                      <p className="text-sm text-gray-500">
                        Date: {applicant.interviewDate}
                      </p>
                      <p className="text-sm text-gray-500">
                        Time: {applicant.interviewTime}
                      </p>
                      {applicant.interviewMode === 'Online' ? (
                        <p className="text-sm text-gray-500">
                          Link:{' '}
                          <a
                            href={applicant.interviewLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            {applicant.interviewLink}
                          </a>
                        </p>
                      ) : (
                        <p className="text-sm text-gray-500">
                          Location: Office Address
                        </p>
                      )}
                    </div>

                    {/* Action Buttons */}
                    {(applicant.interviewStatus === 'In Progress' ||
                      applicant.interviewStatus === 'Scheduled') && (
                      <div className="mt-6 space-y-3">
                        <button
                          onClick={() => handleSendOfferLetter(applicant.id)}
                          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 rounded-md shadow hover:shadow-xl transition-shadow duration-200"
                        >
                          Send Offer Letter
                        </button>
                        <button
                          onClick={() => handleRejectCandidate(applicant.id)}
                          className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-md shadow hover:shadow-xl transition-shadow duration-200"
                        >
                          Reject Candidate
                        </button>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </section>

          {/* Pending Interviews Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
              Pending Interviews
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {applicants
                .filter((applicant) => applicant.status === 'Pending')
                .map((applicant) => (
                  <div
                    key={applicant.id}
                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
                  >
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {applicant.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-1">
                      Status: Pending
                    </p>
                    <p className="text-sm text-gray-500">
                      Domain: {applicant.domain}
                    </p>
                  </div>
                ))}
            </div>
          </section>

          {/* Rejected Candidates Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
              Rejected Candidates
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {applicants
                .filter((applicant) => applicant.status === 'Rejected')
                .map((applicant) => (
                  <div
                    key={applicant.id}
                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
                  >
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {applicant.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-1">
                      Status: Rejected
                    </p>
                    <p className="text-sm text-gray-500">
                      Domain: {applicant.domain}
                    </p>
                  </div>
                ))}
            </div>
          </section>

          {/* Table for Displaying Selected Candidates */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
              Selected Candidates for Offer
            </h2>
            {selectedCandidates.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-lg rounded-lg">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-3 px-6 text-left text-gray-700">
                        Name
                      </th>
                      <th className="py-3 px-6 text-left text-gray-700">
                        Designation
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedCandidates.map((candidate) => (
                      <tr key={candidate.id} className="border-b border-gray-200">
                        <td className="py-3 px-6 text-gray-800">
                          {candidate.name}
                        </td>
                        <td className="py-3 px-6 text-gray-800">
                          {candidate.designation}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">No selected candidates yet.</p>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default HiringProcessPage;
