import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from './Modal'; // Corrected the import
import './table.css';

function Table() {
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState([]);
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);

  useEffect(() => {
    axios.get('https://fcos-recruitment.000webhostapp.com/api/index.php') // Ensure this is the correct API endpoint
      .then(response => {
        setCandidates(response.data);
        setFilteredCandidates(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleAddFilter = () => {
    setFilters([...filters, { column: '', value: '' }]);
  };

  const handleFilterChange = (index, key, value) => {
    const newFilters = [...filters];
    newFilters[index][key] = value;
    setFilters(newFilters);
  };

  const handleApplyFilters = () => {
    let filteredData = candidates;
    filters.forEach(filter => {
      if (filter.column && filter.value) {
        filteredData = filteredData.filter(candidate =>
          candidate[filter.column].toString().toLowerCase().includes(filter.value.toLowerCase())
        );
      }
    });
    setFilteredCandidates(filteredData);
    setIsFilterPopupOpen(false);
  };

  const handleRemoveFilter = (index) => {
    const newFilters = filters.filter((_, i) => i !== index);
    setFilters(newFilters);
  };

  const availableColumns = [
    'category', 'candidateName', 'dob', 'age', 'gender', 'contactPhoneNo', 'contactEmailId', 'address', 'city', 'district', 'state', 'aadharNumber', 'qualification', 'currentCompanyName', 'experience', 'expectingJob', 'currentSalary', 'expectingSalary', 'accommodation', 'food', 'placed', 'biodataReceivedDate', 'status', 'proposedCompanyNameJoinedOrPlaced', 'dateOfJoined', 'lastUpdateDate', 'remarks', 'epfNumber', 'esiNumber'
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <div>
      <button onClick={() => setIsFilterPopupOpen(true)}>Filter</button>
      <Modal isOpen={isFilterPopupOpen} onClose={() => setIsFilterPopupOpen(false)}>
        <div className="filter-popup-content">
          {filters.map((filter, index) => (
            <div key={index}>
              <select
                value={filter.column}
                onChange={(e) => handleFilterChange(index, 'column', e.target.value)}
              >
                <option value="">Select Column</option>
                {availableColumns.map(column => (
                  <option key={column} value={column}>{column}</option>
                ))}
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
      </Modal>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Category</th>
              <th>Candidate Name</th>
              <th>Date of Birth</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Address</th>
              <th>City</th>
              <th>District</th>
              <th>State</th>
              <th>Aadhar Number</th>
              <th>Qualification</th>
              <th>Current Company</th>
              <th>Experience</th>
              <th>Expecting Job</th>
              <th>Current Salary</th>
              <th>Expecting Salary</th>
              <th>Accommodation</th>
              <th>Food</th>
              <th>Placed</th>
              <th>Biodata Received Date</th>
              <th>Status</th>
              <th>Proposed Company (Joined/Placed)</th>
              <th>Date of Joined</th>
              <th>Last Update Date</th>
              <th>Remarks</th>
              <th>EPF Number</th>
              <th>ESI Number</th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.length > 0 ? (
              filteredCandidates.map((candidate, index) => (
                <tr key={candidate.sNo}>
                  <td>{index + 1}</td>
                  <td>{candidate.category}</td>
                  <td>{candidate.candidateName}</td>
                  <td>{candidate.dob}</td>
                  <td>{candidate.age}</td>
                  <td>{candidate.gender}</td>
                  <td>{candidate.contactPhoneNo}</td>
                  <td>{candidate.contactEmailId}</td>
                  <td>{candidate.address}</td>
                  <td>{candidate.city}</td>
                  <td>{candidate.district}</td>
                  <td>{candidate.state}</td>
                  <td>{candidate.aadharNumber}</td>
                  <td>{candidate.qualification}</td>
                  <td>{candidate.currentCompanyName}</td>
                  <td>{candidate.experience}</td>
                  <td>{candidate.expectingJob}</td>
                  <td>{candidate.currentSalary}</td>
                  <td>{candidate.expectingSalary}</td>
                  <td>{candidate.accommodation}</td>
                  <td>{candidate.food}</td>
                  <td>{candidate.placed}</td>
                  <td>{candidate.biodataReceivedDate}</td>
                  <td>{candidate.status}</td>
                  <td>{candidate.proposedCompanyNameJoinedOrPlaced}</td>
                  <td>{candidate.dateOfJoined}</td>
                  <td>{candidate.lastUpdateDate}</td>
                  <td>{candidate.remarks}</td>
                  <td>{candidate.epfNumber}</td>
                  <td>{candidate.esiNumber}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="30">No candidates available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
