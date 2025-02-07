import React, { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import EmployerNavbar from '../Navbar/Navbar';
import EmployerSidebar from '../Sidebar/Sidebar';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement, // Register ArcElement for Pie chart
  Title,
  Tooltip,
  Legend
);

const initialApplicants = [
  {
    id: 1,
    name: 'John Doe',
    status: 'Shortlisted',
    domain: 'Software Development',
    interviewMode: 'Online',
    interviewStatus: 'In Progress',
    designation: 'Software Developer',
  },
  {
    id: 2,
    name: 'Jane Smith',
    status: 'Shortlisted',
    domain: 'Product Management',
    interviewMode: 'Physical',
    interviewStatus: 'Scheduled',
    designation: 'Product Manager',
  },
  {
    id: 3,
    name: 'Emma Watson',
    status: 'Pending',
    domain: 'UI/UX Design',
    interviewMode: '',
    interviewStatus: '',
    designation: 'UI/UX Designer',
  },
  {
    id: 4,
    name: 'Chris Brown',
    status: 'Rejected',
    domain: 'Marketing',
    interviewMode: '',
    interviewStatus: '',
    designation: 'Marketing Executive',
  },
];

const companyAnalyticsData = {
  totalJobsPosted: 25,
  totalApplicants: initialApplicants.length,
  totalHired: 10,
  totalRejected: 5,
  totalUnderCustomAssesment: 8,
  totalInterviewsScheduled: 12,
  employees: 50,
  averageSalary: 75000, // Sample average salary
};

const CompanyAnalyticsPage = () => {
  const [applicants] = useState(initialApplicants);

  // Data for charts
  const applicantStatusData = {
    labels: ['Shortlisted', 'Pending', 'Rejected'],
    datasets: [
      {
        label: 'Applicant Status Distribution',
        data: [
          applicants.filter((a) => a.status === 'Shortlisted').length,
          applicants.filter((a) => a.status === 'Pending').length,
          applicants.filter((a) => a.status === 'Rejected').length,
        ],
        backgroundColor: ['#FFB6C1', '#FF6347', '#3CB371'],
      },
    ],
  };

  const interviewModeData = {
    labels: ['Online', 'Physical'],
    datasets: [
      {
        label: 'Interview Mode Distribution',
        data: [
          applicants.filter((a) => a.interviewMode === 'Online').length,
          applicants.filter((a) => a.interviewMode === 'Physical').length,
        ],
        backgroundColor: ['#34d399', '#f59e0b'], // Online: emerald, Physical: amber
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar/Header */}
      <EmployerNavbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <EmployerSidebar />

        {/* Main Content */}
        <main className="flex-1 mt-10 p-6 md:p-8 lg:p-10 ml-0 md:ml-20">
          <header className="mb-10">
            <h1 className="text-3xl font-bold text-gray-800">Company Analytics</h1>
          </header>

          {/* Overview Cards */}
          <section className="mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                <h2 className="text-lg font-medium text-gray-600">Total Applications</h2>
                <p className="text-2xl font-bold text-gray-800">{applicants.length}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                <h2 className="text-lg font-medium text-gray-600">Shortlisted</h2>
                <p className="text-2xl font-bold text-gray-800">
                  {applicants.filter((a) => a.status === 'Shortlisted').length}
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                <h2 className="text-lg font-medium text-gray-600">Pending</h2>
                <p className="text-2xl font-bold text-gray-800">
                  {applicants.filter((a) => a.status === 'Pending').length}
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                <h2 className="text-lg font-medium text-gray-600">Rejected</h2>
                <p className="text-2xl font-bold text-gray-800">
                  {applicants.filter((a) => a.status === 'Rejected').length}
                </p>
              </div>
            </div>
          </section>

          {/* Charts Section */}
          <section className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  Applicant Status Distribution
                </h3>
                <Pie data={applicantStatusData} />
              </div>
              <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  Interview Mode Distribution
                </h3>
                <Bar data={interviewModeData} />
              </div>
            </div>
          </section>

          {/* Company Analytics Overview */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Company Analytics Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow text-center">
                <h3 className="text-lg font-medium text-gray-600">Total Jobs Posted</h3>
                <p className="text-2xl font-bold text-gray-800">{companyAnalyticsData.totalJobsPosted}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow text-center">
                <h3 className="text-lg font-medium text-gray-600">Total Applicants</h3>
                <p className="text-2xl font-bold text-gray-800">{companyAnalyticsData.totalApplicants}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow text-center">
                <h3 className="text-lg font-medium text-gray-600">Total Hired</h3>
                <p className="text-2xl font-bold text-gray-800">{companyAnalyticsData.totalHired}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow text-center">
                <h3 className="text-lg font-medium text-gray-600">Total Rejected</h3>
                <p className="text-2xl font-bold text-gray-800">{companyAnalyticsData.totalRejected}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow text-center">
                <h3 className="text-lg font-medium text-gray-600">Under Custom Assessment</h3>
                <p className="text-2xl font-bold text-gray-800">
                  {companyAnalyticsData.totalUnderCustomAssesment}
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow text-center">
                <h3 className="text-lg font-medium text-gray-600">Interviews Scheduled</h3>
                <p className="text-2xl font-bold text-gray-800">
                  {companyAnalyticsData.totalInterviewsScheduled}
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow text-center">
                <h3 className="text-lg font-medium text-gray-600">Employees</h3>
                <p className="text-2xl font-bold text-gray-800">{companyAnalyticsData.employees}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow text-center">
                <h3 className="text-lg font-medium text-gray-600">Average Salary</h3>
                <p className="text-2xl font-bold text-gray-800">
                  {companyAnalyticsData.averageSalary} USD
                </p>
              </div>
            </div>
          </section>

          {/* Applicant Lists */}
          <section className="mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Shortlisted Candidates */}
              <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  Shortlisted Candidates
                </h3>
                {applicants
                  .filter((a) => a.status === 'Shortlisted')
                  .map((a) => (
                    <div key={a.id} className="p-4 border-b border-gray-200 last:border-0">
                      <h4 className="text-lg font-medium text-gray-800">{a.name}</h4>
                      <p className="text-sm text-gray-600">{a.domain}</p>
                      <p className="text-sm text-gray-600">{a.designation}</p>
                      <p className="text-sm text-gray-600">{a.interviewStatus}</p>
                    </div>
                  ))}
              </div>
              {/* Pending Candidates */}
              <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  Pending Candidates
                </h3>
                {applicants
                  .filter((a) => a.status === 'Pending')
                  .map((a) => (
                    <div key={a.id} className="p-4 border-b border-gray-200 last:border-0">
                      <h4 className="text-lg font-medium text-gray-800">{a.name}</h4>
                      <p className="text-sm text-gray-600">{a.domain}</p>
                      <p className="text-sm text-gray-600">Status: Pending</p>
                    </div>
                  ))}
              </div>
              {/* Rejected Candidates */}
              <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  Rejected Candidates
                </h3>
                {applicants
                  .filter((a) => a.status === 'Rejected')
                  .map((a) => (
                    <div key={a.id} className="p-4 border-b border-gray-200 last:border-0">
                      <h4 className="text-lg font-medium text-gray-800">{a.name}</h4>
                      <p className="text-sm text-gray-600">{a.domain}</p>
                      <p className="text-sm text-gray-600">Status: Rejected</p>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default CompanyAnalyticsPage;
