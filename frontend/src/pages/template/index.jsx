import React, { useState } from 'react';
import './App.css';

function App() {
  const jobListings = [
    { 
      id: 1, 
      title: 'Software Engineer', 
      department: 'Engineering', 
      datePosted: '2023-09-27', 
      businessFunction: 'Development' 
    },
    { 
      id: 2, 
      title: 'Marketing Specialist', 
      department: 'Marketing', 
      datePosted: '2023-09-28', 
      businessFunction: 'Marketing' 
    },
    { 
      id: 3, 
      title: 'Customer Support Representative', 
      department: 'Support', 
      datePosted: '2023-09-29', 
      businessFunction: 'Customer Support' 
    },
  ];

  const [selectedJob, setSelectedJob] = useState(null);

  const handleJobSelect = (job) => {
    setSelectedJob(job);
  };

  const handleCreateJob = () => {
    console.log('Create Job Posting clicked');
  };

  const handleFilterChange = (event) => {
    console.log(`Filter changed: ${event.target.value}`);
  };

  const handleSearch = (event) => {
    console.log(`Search: ${event.target.value}`);
  };

  const handleApply = (job) => {
    console.log(`Applied for job: ${job.title}`);
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-left">
          <h1>Fwog Portal</h1>
        </div>
        <div className="navbar-right">
          <button className="profile-button">User Profile</button>
          <span className="username">Nicholas Tan</span>
        </div>
      </nav>
      <div className="filters">
      <label>Department:</label>
      <select onChange={handleFilterChange}>
        <option value="all">All</option>
        <option value="engineering">Engineering</option>
        <option value="marketing">Marketing</option>
        <option value="support">Support</option>
      </select>
      <input type="text" placeholder="Search by title" onChange={handleSearch} />
      </div>

      <div className="content-container">
        <div className="job-listings">
          <h2>Available Roles</h2>
          <ul>
            {jobListings.map((job) => (
              <li key={job.id} onClick={() => handleJobSelect(job)}>
                <div>
                  <h3>{job.title}</h3>
                  <p>Department: {job.department}</p>
                  <p>Date Posted: {job.datePosted}</p>
                  <p>Business Function: {job.businessFunction}</p>
                  <button onClick={() => handleApply(job)}>Apply</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {selectedJob && (
          <div className="job-details">
            <h2>Role Details</h2>
            <p>Title: {selectedJob.title}</p>
            <p>Department: {selectedJob.department}</p>
            <button onClick={() => setSelectedJob(null)}>Clear Selection</button>
          </div>
        )}
      </div>

    </div>
  );
}

export default App;
