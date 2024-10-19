import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEdit } from 'react-icons/fa'; // Assuming you use react-icons for icons
import Modal from './Modal'; // Corrected the import
// import './table.css';
import { saveAs } from 'file-saver';
import 'bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";




function Table() {
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState([]);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage,setRowsPerPage] = useState(10); // Number of rows per page
  const navigate = useNavigate(); // To use the history object for navigation

  useEffect(() => {
    axios.get('https://fcos-api.onrender.com') // Ensure this is the correct API endpoint
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
    axios.post('https://fcos-api.onrender.com/print_api.php', { ids: selectedCandidates }, { responseType: 'blob' })
      .then(response => {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        saveAs(blob, 'candidates.pdf');
      })
      .catch(error => {
        alert('Error printing candidates: ' + error.message);
      });
  };

  const handleDeleteSelected = () => {

      axios.post('https://fcos-api.onrender.com/delete_api.php', { ids: selectedCandidates })
        .then(response => {
          if (response.data.success) {
            setCandidates(candidates.filter(candidate => !selectedCandidates.includes(candidate.sNo)));
            setFilteredCandidates(filteredCandidates.filter(candidate => !selectedCandidates.includes(candidate.sNo)));
            setSelectedCandidates([]);

            window.location.reload();

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

  const rowsPerPageChange = (e) =>{
    const newRowsPerPage = Number(e.target.value);
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1); // Reset to first page when rows per page changes
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
  const handleEditCandidate = (sNo) => {
    navigate(`/viewForm/${sNo}`);
  };


  return (

    <div>
      <div class="d-flex justify-content-end">

        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
          <button class="btn btn-primary" onClick={() => setIsFilterPopupOpen(true)}>Filter</button>
          <button
            className="btn btn-danger"
            disabled={selectedCandidates.length === 0}
            data-bs-toggle="modal"
            data-bs-target="#deleteConfirmationModal"
          >
            Delete
          </button>
          <button class="btn btn-secondary" onClick={handlePrintCandidates} disabled={selectedCandidates.length === 0}>Print</button>

        </div>
      </div>
      {/* -----dlete conform modal */}
      <div class="modal fade" id="deleteConfirmationModal" tabindex="-1" aria-labelledby="deleteConfirmationLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="deleteConfirmationLabel">Confirm Deletion</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              Are you sure you want to delete the selected candidates?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-danger" id="confirmDeleteBtn" onClick={handleDeleteSelected}>Delete</button>
            </div>
          </div>
        </div>
      </div>
      {/* ---------------------------------------------------------- */}

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
      <div class="table-responsive">
        <table class='table' style={{ width: '100%' }}>
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
              {/* <th>Address</th> */}
              {/* <th>City</th> */}
              <th>District</th>
              <th>State</th>
              {/* <th>Aadhar Number</th> */}
              <th>Qualification</th>
              {/* <th>Current Company</th> */}
              {/* <th>Experience</th> */}
              {/* <th>Expecting Job</th> */}
              {/* <th>Current Salary</th> */}
              {/* <th>Expecting Salary</th> */}
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
                  {/* <td>{candidate.address}</td> */}
                  {/* <td>{candidate.city}</td> */}
                  <td>{candidate.district}</td>
                  <td>{candidate.state}</td>
                  {/* <td>{candidate.aadharNumber}</td> */}
                  <td>{candidate.qualification}</td>
                  {/* <td>{candidate.currentCompanyName}</td> */}
                  {/* <td>{candidate.experience}</td> */}
                  {/* <td>{candidate.expectingJob}</td> */}
                  {/* <td>{candidate.currentSalary}</td> */}
                  {/* <td>{candidate.expectingSalary}</td> */}
                  <td>{candidate.status}</td>
                  <td>
                    <FaEye onClick={() => handleViewCandidate(candidate.sNo)} style={{ cursor: 'pointer' }} className="me-2" />
                    <FaEdit onClick={() => handleEditCandidate(candidate.sNo)} style={{ cursor: 'pointer' }} />
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
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item"><a class="page-link" onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</a></li>
          <li class="page-item"><a class="page-link">Page {currentPage} / {Math.ceil(filteredCandidates.length / rowsPerPage)}</a></li>
          <li class="page-item"><a class="page-link" onClick={handleNextPage} disabled={currentPage === Math.ceil(filteredCandidates.length / rowsPerPage)}>Next</a></li>
        </ul>
        <select onChange={rowsPerPageChange} class="form-select" aria-label="Default select example">
  <option selected value="10" >10</option>
  <option value="20">20</option>
  <option value="30">30</option>
</select>
      </nav>
      
      {/* <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} / {Math.ceil(filteredCandidates.length / rowsPerPage)}</span>
        <button onClick={handleNextPage} disabled={currentPage === Math.ceil(filteredCandidates.length / rowsPerPage)}>Next</button>
      </div> */}

    </div>
  );
}

export default Table;
