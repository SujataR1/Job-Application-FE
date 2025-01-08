
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import './JobStatus.css'; // Add a CSS file for styling

// // Dummy Data for jobs
// const initialJobs = [
//   {
//     id: 1,
//     title: 'Software Engineer',
//     company: 'Tech Innovators',
//     location: 'New York, NY',
//     salary: '₹50,000 - ₹70,000',
//     status: 'Shortlisted',
//     appliedOn: '2024-12-01',
//     resumeDownloaded: true,
//     shortlisted: true,
//     rejected: false,
//     emailSent: true,
//     assessmentSent: true,
//     interviewScheduled: true,
//     interviewDate: '2024-12-15 10:00 AM', // Interview Date and Time
//   },
//   {
//     id: 2,
//     title: 'Product Manager',
//     company: 'Innovative Solutions',
//     location: 'San Francisco, CA',
//     salary: '₹70,000 - ₹90,000',
//     status: 'Rejected',
//     appliedOn: '2024-11-25',
//     resumeDownloaded: false,
//     shortlisted: false,
//     rejected: true,
//     emailSent: false,
//     assessmentSent: false,
//     interviewScheduled: false,
//     interviewDate: '',
//   },
// ];

// const JobStatusPage = () => {
//   const { jobId } = useParams(); // Retrieve the job ID from the URL
//   const [job, setJob] = useState(null);
//   const [newInterviewDate, setNewInterviewDate] = useState('');
//   const [notification, setNotification] = useState(''); // To show status change notifications

//   // Simulate fetching job details by ID
//   useEffect(() => {
//     // Find the job using the jobId (replace with API call in real use case)
//     const selectedJob = initialJobs.find((job) => job.id === parseInt(jobId));
//     setJob(selectedJob);
//   }, [jobId]);

//   // Function to handle scheduling the interview
//   const handleScheduleInterview = () => {
//     if (!newInterviewDate) {
//       setNotification('Please select a valid date and time for the interview.');
//       return;
//     }

//     const updatedJob = { ...job, interviewScheduled: true, interviewDate: newInterviewDate };
//     setJob(updatedJob);
//     setNotification(`Interview scheduled for ${newInterviewDate}`);
//     setNewInterviewDate('');
//   };

//   return (
//     <div className="job-status-page">
//       {job ? (
//         <div className="job-details">
//           <h2>{job.title}</h2>
//           <p><strong>Company:</strong> {job.company}</p>
//           <p><strong>Location:</strong> {job.location}</p>
//           <p><strong>Salary:</strong> {job.salary}</p>
//           <p><strong>Status:</strong>
//             <span className={`status ${job.status.toLowerCase()}`}>{job.status}</span>
//           </p>
//           <p><strong>Applied On:</strong> {job.appliedOn}</p>

//           {/* Interview scheduling section */}
//           {job.status === 'Shortlisted' && !job.interviewScheduled && (
//             <div>
//               <h3>Schedule Interview</h3>
//               <input
//                 type="datetime-local"
//                 value={newInterviewDate}
//                 onChange={(e) => setNewInterviewDate(e.target.value)}
//               />
//               <button onClick={handleScheduleInterview}>Schedule Interview</button>
//             </div>
//           )}

//           {/* Show the interview date if it's scheduled */}
//           {job.interviewScheduled && (
//             <div>
//               <h3>Interview Scheduled</h3>
//               <p><strong>Interview Date:</strong> {job.interviewDate}</p>
//             </div>
//           )}

//           {/* Display notification */}
//           {notification && <div className="notification">{notification}</div>}

//         </div>
//       ) : (
//         <p>Job not found!</p>
//       )}
//     </div>
//   );
// };

// export default JobStatusPage;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './JobStatus.css'; // Add a CSS file for styling

// Dummy Data for jobs
const initialJobs = [
  {
    id: 1,
    title: 'Software Engineer',
    company: 'Tech Innovators',
    location: 'New York, NY',
    salary: '₹50,000 - ₹70,000',
    status: 'Shortlisted',
    appliedOn: '2024-12-01',
    resumeDownloaded: true,
    shortlisted: true,
    rejected: false,
    emailSent: true,
    assessmentSent: true,
    interviewScheduled: true,
    interviewDate: '2024-12-15 10:00 AM', // Interview Date and Time
    selected: false, // New property to track if the applicant is selected
  },
  {
    id: 2,
    title: 'Product Manager',
    company: 'Innovative Solutions',
    location: 'San Francisco, CA',
    salary: '₹70,000 - ₹90,000',
    status: 'Rejected',
    appliedOn: '2024-11-25',
    resumeDownloaded: false,
    shortlisted: false,
    rejected: true,
    emailSent: false,
    assessmentSent: false,
    interviewScheduled: false,
    interviewDate: '',
    selected: false,
  },
];

const JobStatusPage = () => {
  const { jobId } = useParams(); // Retrieve the job ID from the URL
  const [job, setJob] = useState(null);
  const [newInterviewDate, setNewInterviewDate] = useState('');
  const [notification, setNotification] = useState(''); // To show status change notifications
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false); // For showing the review form
  const [reviews, setReviews] = useState([]); // Store reviews submitted by applicants

  // Simulate fetching job details by ID
  useEffect(() => {
    // Find the job using the jobId (replace with API call in real use case)
    const selectedJob = initialJobs.find((job) => job.id === parseInt(jobId));
    setJob(selectedJob);
  }, [jobId]);

  // Function to handle scheduling the interview
  const handleScheduleInterview = () => {
    if (!newInterviewDate) {
      setNotification('Please select a valid date and time for the interview.');
      return;
    }

    const updatedJob = { ...job, interviewScheduled: true, interviewDate: newInterviewDate };
    setJob(updatedJob);
    setNotification(`Interview scheduled for ${newInterviewDate}`);
    setNewInterviewDate('');
  };

  // Function to mark the applicant as selected and show the review form
  const handleApplicantSelection = () => {
    const updatedJob = { ...job, selected: true };
    setJob(updatedJob);
    setNotification('Applicant selected for the job!');
    setIsReviewFormVisible(true); // Show the review form once selected
  };

  // Function to handle submitting the review
  const handleReviewSubmission = (rating, feedback) => {
    const newReview = {
      rating,
      feedback,
      date: new Date().toLocaleDateString(),
    };
    setReviews([...reviews, newReview]);
    setIsReviewFormVisible(false); // Hide the review form after submission
    setNotification('Thank you for your review!');
  };

  return (
    <div className="job-status-page">
      {job ? (
        <div className="job-details">
          <h2>{job.title}</h2>
          <p><strong>Company:</strong> {job.company}</p>
          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Salary:</strong> {job.salary}</p>
          <p><strong>Status:</strong>
            <span className={`status ${job.status.toLowerCase()}`}>{job.status}</span>
          </p>
          <p><strong>Applied On:</strong> {job.appliedOn}</p>

          {/* Interview scheduling section */}
          {job.status === 'Shortlisted' && !job.interviewScheduled && (
            <div>
              <h3>Schedule Interview</h3>
              <input
                type="datetime-local"
                value={newInterviewDate}
                onChange={(e) => setNewInterviewDate(e.target.value)}
              />
              <button onClick={handleScheduleInterview}>Schedule Interview</button>
            </div>
          )}

          {/* Show the interview date if it's scheduled */}
          {job.interviewScheduled && (
            <div>
              <h3>Interview Scheduled</h3>
              <p><strong>Interview Date:</strong> {job.interviewDate}</p>
            </div>
          )}

          {/* Option to select the applicant */}
          {job.interviewScheduled && !job.selected && (
            <div>
              <button onClick={handleApplicantSelection}>Select Applicant</button>
            </div>
          )}

          {/* Display notification */}
          {notification && <div className="notification">{notification}</div>}

          {/* Show the review form if the applicant is selected */}
          {isReviewFormVisible && (
            <ReviewSubmissionForm onSubmitReview={handleReviewSubmission} />
          )}
        </div>
      ) : (
        <p>Job not found!</p>
      )}
    </div>
  );
};

// Review Form Component
const ReviewSubmissionForm = ({ onSubmitReview }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating > 0 && feedback) {
      onSubmitReview(rating, feedback);
    }
  };

  return (
    <div className="review-form">
      <h3>Leave a Review for the Recruiter</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Rating (1-5 Stars)</label>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={star <= rating ? 'star-selected' : 'star'}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <div>
          <label>Write Your Feedback</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="What was your experience like?"
          />
        </div>
        <button type="submit" disabled={rating === 0 || !feedback}>
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default JobStatusPage;
