import React, { useState } from 'react';
import axios from 'axios';
import './filteredCandidates.css';

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
    axios.get('https://fcos-recruitment.000webhostapp.com/api/index.php') // Ensure this is the correct API endpoint
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
      <div className="filter-popup-content">
        {filters.map((filter, index) => (
          <div key={index} className="filter-row">
            <select
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
            <input
              type="text"
              value={filter.value}
              onChange={(e) => handleFilterChange(index, 'value', e.target.value)}
              placeholder="Value"
            />
            <button onClick={() => handleRemoveFilter(index)}>Remove</button>
          </div>
        ))}
        <button onClick={handleAddFilter}>Add Filter</button>
        <button onClick={handleApplyFilters}>Apply Filters</button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error fetching data: {error.message}</div>
      ) : (
        <div className="cards-container">
          {candidates.length > 0 ? (
            candidates.map(candidate => (
              <div key={candidate.sNo} className="candidate-card">
                <h2>{candidate.candidateName}</h2>
                <p><strong>Category:</strong> {candidate.category}</p>
                <p><strong>Age:</strong> {candidate.age}</p>
                <p><strong>Gender:</strong> {candidate.gender}</p>
                <p><strong>Phone Number:</strong> {candidate.contactPhoneNo}</p>
                <p><strong>Email:</strong> {candidate.contactEmailId}</p>
                <p><strong>Address:</strong> {candidate.address}</p>
                <p><strong>City:</strong> {candidate.city}</p>
                <p><strong>District:</strong> {candidate.district}</p>
                <p><strong>State:</strong> {candidate.state}</p>
                <p><strong>Qualification:</strong> {candidate.qualification}</p>
                <p><strong>Experience:</strong> {candidate.experience}</p>
                <p><strong>Current Salary:</strong> {candidate.currentSalary}</p>
                <p><strong>Expecting Salary:</strong> {candidate.expectingSalary}</p>
                <p><strong>Status:</strong> {candidate.status}</p>
              </div>
            ))
          ) : (
            <p>No candidates available</p>
          )}
        </div>
      )}
    </div>
  );
}

export default FilteredCandidates;
