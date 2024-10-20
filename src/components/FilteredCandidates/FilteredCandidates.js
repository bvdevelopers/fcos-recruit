import React, { useState } from 'react';
import axios from 'axios';
import { FaUser, FaBirthdayCake, FaVenusMars, FaPhoneAlt, FaEnvelope  } from 'react-icons/fa';
import { IoLocation } from "react-icons/io5";

// import './filteredCandidates.css';

function FilteredCandidates() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState([{ column: '', value: '' }]);

  const handleAddFilter = () => {
    setFilters([...filters, { column: '', value: '' }]);
  };

  const handleFilterChange = (index, key, value) => {
    const newFilters = [...filters];
    newFilters[index][key] = value;
    setFilters(newFilters);
  };

  const handleRemoveFilter = (index) => {
    const newFilters = filters.filter((_, i) => i !== index);
    setFilters(newFilters);
  };

  const handleApplyFilters = () => {
    setLoading(true);
    axios.get('https://fcos-api.onrender.com/index.php') // Ensure this is the correct API endpoint
      .then(response => {
        let filteredData = response.data;

        filters.forEach(filter => {
          if (filter.column === 'age' && filter.value) {
            filteredData = filteredData.filter(candidate =>
              candidate[filter.column].toString().includes(filter.value.toString())
            );
          } else if (filter.column && filter.value) {
            filteredData = filteredData.filter(candidate =>
              candidate[filter.column].toString().toLowerCase().includes(filter.value.toLowerCase())
            );
          }
        });

        setCandidates(filteredData);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  };

  return (
    <div>
  {/* Filter Section */}
  <div className="filter-popup-content">
    {filters.map((filter, index) => (
      <div key={index} className="row g-2 align-items-center mb-3">
        <div className="col-md-5">
          <select
            className="form-select"
            value={filter.column}
            onChange={(e) => handleFilterChange(index, 'column', e.target.value)}
          >
            <option value="">Select Column</option>
            <option value="category">Category</option>
            <option value="candidateName">Candidate Name</option>
            <option value="age">Age</option>
            <option value="gender">Gender</option>
            <option value="contactPhoneNo">Phone Number</option>
            <option value="contactEmailId">Email</option>
            <option value="address">Address</option>
            <option value="city">City</option>
            <option value="district">District</option>
            <option value="state">State</option>
            <option value="qualification">Qualification</option>
            <option value="experience">Experience</option>
            <option value="currentSalary">Current Salary</option>
            <option value="expectingSalary">Expecting Salary</option>
            <option value="status">Status</option>
          </select>
        </div>
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            value={filter.value}
            onChange={(e) => handleFilterChange(index, 'value', e.target.value)}
            placeholder="Value"
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-danger w-100" onClick={() => handleRemoveFilter(index)}>
            Remove
          </button>
        </div>
      </div>
    ))}
    <div className="d-flex justify-content-between">
      <button className="btn btn-primary" onClick={handleAddFilter}>
        Add Filter
      </button>
      <button className="btn btn-success" onClick={handleApplyFilters}>
        Apply Filters
      </button>
    </div>
  </div>

  {/* Loading, Error, or Candidates Display */}
  {loading ? (
    <div className="text-center my-3">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  ) : error ? (
    <div className="alert alert-danger" role="alert">
      Error fetching data: {error.message}
    </div>
  ) : (
    
    <div className="row">
    {candidates.length > 0 ? (
      candidates.map(candidate => (
        <div key={candidate.sNo} className="col-md-4 mb-4">
          <div className="card h-100 p-3">
            <div className="card-body">
              {/* Candidate Name */}
              <h5 className="card-title fw-bold d-flex align-items-center">
                <FaUser className="me-2" />
                {candidate.candidateName}
              </h5>
  
              {/* Category and Age */}
              <p className="mb-1">
                
                <strong>Category:</strong> {candidate.category}
              </p>
              <p className="mb-1">
              <FaBirthdayCake className="me-2" />
                <strong>Age:</strong> {candidate.age}
              </p>
              <p className="mb-3">
              <FaVenusMars className="me-2" />
                <strong>Gender:</strong> {candidate.gender}
              </p>
  
              {/* Contact Information */}
              <h6 className="fw-bold mt-2">Contact Information</h6>
              <p className="mb-1 d-flex align-items-center">
                <FaPhoneAlt className="me-2" />
                <a href={`tel:${candidate.contactPhoneNo}`} className="text-decoration-none">
                  {candidate.contactPhoneNo}
                </a>
              </p>
              <p className="mb-3 d-flex align-items-center">
                <FaEnvelope className="me-2" />
                <a href={`mailto:${candidate.contactEmailId}`} className="text-decoration-none">
                  {candidate.contactEmailId}
                </a>
              </p>
  
              {/* Address */}
              {/* <h6 className="fw-bold mt-2">Address</h6> */}
             
              <p className="mb-1 d-flex align-item-center">
              <IoLocation/> 
                {candidate.address}, {candidate.city}, {candidate.district}, {candidate.state}
              </p>
  
              {/* Qualification and Experience */}
              <h6 className="fw-bold mt-2">Professional Details</h6>
              <p className="mb-1">
                <strong>Qualification:</strong> {candidate.qualification}
              </p>
              <p className="mb-1">
                <strong>Experience:</strong> {candidate.experience} years
              </p>
  
              {/* Salary */}
              <h6 className="fw-bold mt-2">Salary Details</h6>
              <p className="mb-1">
                <strong>Current Salary:</strong> {candidate.currentSalary}
              </p>
              <p className="mb-3">
                <strong>Expecting Salary:</strong> {candidate.expectingSalary}
              </p>
  
              {/* Status */}
              <h6 className="fw-bold mt-2">Status</h6>
              <p className="mb-0">
                <span className="badge bg-info">{candidate.status}</span>
              </p>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="col-12">
        <p className="text-center">No candidates available</p>
      </div>
    )}
  </div>
  
  )}
</div>

  );
}

export default FilteredCandidates;
