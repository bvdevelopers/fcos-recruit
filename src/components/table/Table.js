import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEdit } from 'react-icons/fa'; // Assuming you use react-icons for icons
import Modal from './Modal'; // Corrected the import
import './table.css';
import { saveAs } from 'file-saver';


function Table() {
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState([]);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8; // Number of rows per page
  const navigate = useNavigate(); // To use the history object for navigation

  useEffect(() => {
    axios.get('https://fcosrecruit.rf.gd/api/index.php') // Ensure this is the correct API endpoint
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
    setFilteredCandidates(filteredData);
    setIsFilterPopupOpen(false);
    setCurrentPage(1); // Reset to first page when filters are applied
  };

  const handleRemoveFilter = (index) => {
    const newFilters = filters.filter((_, i) => i !== index);
    setFilters(newFilters);
  };

  const handleSelectCandidate = (sNo) => {
    setSelectedCandidates(prevSelected => {
      if (prevSelected.includes(sNo)) {
        return prevSelected.filter(id => id !== sNo);
      } else {
        return [...prevSelected, sNo];
      }
    });
  };
  const handlePrintCandidates = () => {
    axios.post('https://fcosrecruit.rf.gd/api/print_api.php', { ids: selectedCandidates }, { responseType: 'blob' })
      .then(response => {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        saveAs(blob, 'candidates.pdf');
      })
      .catch(error => {
        alert('Error printing candidates: ' + error.message);
      });
  };

  const handleDeleteSelected = () => {
    axios.post('https://fcosrecruit.rf.gd/api/delete_api.php', { ids: selectedCandidates })
      .then(response => {
        if (response.data.success) {
          setCandidates(candidates.filter(candidate => !selectedCandidates.includes(candidate.sNo)));
          setFilteredCandidates(filteredCandidates.filter(candidate => !selectedCandidates.includes(candidate.sNo)));
          setSelectedCandidates([]);
        } else {
          alert('Failed to delete selected candidates.');
        }
      })
      .catch(error => {
        alert('Error deleting candidates: ' + error.message);
      });
  };

  const handleViewCandidate = (sNo) => {
   navigate(`/viewForm/${sNo}`);
  };

  const availableColumns = [
    'category', 'candidateName', 'dob', 'age', 'gender', 'contactPhoneNo', 'contactEmailId', 'address', 'city', 'district', 'state', 'aadharNumber', 'qualification', 'currentCompanyName', 'experience', 'expectingJob', 'currentSalary', 'expectingSalary', 'accommodation', 'food', 'placed', 'biodataReceivedDate', 'status', 'proposedCompanyNameJoinedOrPlaced', 'dateOfJoined', 'lastUpdateDate', 'remarks', 'epfNumber', 'esiNumber'
  ];

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredCandidates.slice(indexOfFirstRow, indexOfLastRow);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredCandidates.length / rowsPerPage)) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }
  const handleEditCandidate = (sNo) =>{
    navigate(`/viewForm/${sNo}`); 
  };


  return (
    <div>
      <br/><br/><br/>
      <div className='buttons'>
      <button onClick={() => setIsFilterPopupOpen(true)}>Filter</button>
      <button onClick={handleDeleteSelected} disabled={selectedCandidates.length === 0}>Delete</button>
      <button onClick={handlePrintCandidates} disabled={selectedCandidates.length === 0}>Print</button>

      </div>
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
              <th>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedCandidates(filteredCandidates.map(candidate => candidate.sNo));
                    } else {
                      setSelectedCandidates([]);
                    }
                  }}
                  checked={selectedCandidates.length === filteredCandidates.length}
                />
              </th>
              <th>S.No</th>
              <th>Category</th>
              <th>Candidate Name</th>
              {/* <th>Date of Birth</th> */}
              <th>Age</th>
              <th>Gender</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Address</th>
              <th>City</th>
              <th>District</th>
              <th>State</th>
              {/* <th>Aadhar Number</th> */}
              <th>Qualification</th>
              {/* <th>Current Company</th> */}
              <th>Experience</th>
              {/* <th>Expecting Job</th> */}
              <th>Current Salary</th>
              <th>Expecting Salary</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.length > 0 ? (
              currentRows.map((candidate, index) => (
                <tr key={candidate.sNo}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedCandidates.includes(candidate.sNo)}
                      onChange={() => handleSelectCandidate(candidate.sNo)}
                    />
                  </td>
                  <td>{indexOfFirstRow + index + 1}</td>
                  <td>{candidate.category}</td>
                  <td>{candidate.candidateName}</td>
                  {/* <td>{candidate.dob}</td> */}
                  <td>{candidate.age}</td>
                  <td>{candidate.gender}</td>
                  <td>{candidate.contactPhoneNo}</td>
                  <td>{candidate.contactEmailId}</td>
                  <td>{candidate.address}</td>
                  <td>{candidate.city}</td>
                  <td>{candidate.district}</td>
                  <td>{candidate.state}</td>
                  {/* <td>{candidate.aadharNumber}</td> */}
                  <td>{candidate.qualification}</td>
                  {/* <td>{candidate.currentCompanyName}</td> */}
                  <td>{candidate.experience}</td>
                  {/* <td>{candidate.expectingJob}</td> */}
                  <td>{candidate.currentSalary}</td>
                  <td>{candidate.expectingSalary}</td>
                  <td>{candidate.status}</td>
                  <td>
                    <FaEye onClick={() => handleViewCandidate(candidate.sNo)} style={{ cursor: 'pointer' }} />
                     <FaEdit  onClick={() => handleEditCandidate(candidate.sNo)} style={{ cursor: 'pointer' }}/>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="31">No candidates available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} / {Math.ceil(filteredCandidates.length / rowsPerPage)}</span>
        <button onClick={handleNextPage} disabled={currentPage === Math.ceil(filteredCandidates.length / rowsPerPage)}>Next</button>
      </div>
    </div>
  );
}

export default Table;
