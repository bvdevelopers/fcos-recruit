import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { saveAs } from 'file-saver';
import './viewForm.css';

function ViewForm() {
  const { id } = useParams();
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://fcos-api.onrender.com/get_candidate_by_id.php?sNo=${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setCandidate(data.data);
        } else {
          setError(data.message);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("An error occurred: " + err.message);
        setLoading(false);
      });
  }, [id]);

  const handlePrintCandidates = () => {
    axios
      .post(
        'https://fcos-api.onrender.com/print_api.php',
        { ids: [id] },
        { responseType: 'blob' }
      )
      .then((response) => {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        saveAs(blob, `candidate_${id}.pdf`);
      })
      .catch((error) => {
        alert('Error printing candidate: ' + error.message);
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="view-form">
      <div className="container my-5">
        <div className="card">
          <div className="card-header text-center">
            <h2>{candidate.candidateName}'s Profile</h2>
          </div>
          <div className="card-body">
            {/* Personal Information */}
            <h5 className="mb-3">Personal Information</h5>
            <div className="row mb-3">
              <div className="col-md-6">
                <p><strong>Category:</strong> {candidate.category}</p>
                <p><strong>Date of Birth:</strong> {candidate.dob}</p>
                <p><strong>Age:</strong> {candidate.age || "N/A"}</p>
                <p><strong>Gender:</strong> {candidate.gender}</p>
              </div>
              <div className="col-md-6">
                <p><strong>Aadhar Number:</strong> {candidate.aadharNumber || "N/A"}</p>
                <p><strong>Contact Number:</strong> {candidate.contactPhoneNo}</p>
                <p><strong>Email:</strong> {candidate.contactEmailId}</p>
              </div>
            </div>

            {/* Address */}
            <h5 className="mb-3">Address</h5>
            <div className="row mb-3">
              <div className="col-md-6">
                <p><strong>Address:</strong> {candidate.address || "N/A"}</p>
                <p><strong>City:</strong> {candidate.city || "N/A"}</p>
                <p><strong>District:</strong> {candidate.district || "N/A"}</p>
              </div>
              <div className="col-md-6">
                <p><strong>State:</strong> {candidate.state || "N/A"}</p>
                <p><strong>Pincode:</strong> {candidate.pincode || "N/A"}</p>
              </div>
            </div>

            {/* Professional Details */}
            <h5 className="mb-3">Professional Information</h5>
            <div className="row mb-3">
              <div className="col-md-6">
                <p><strong>Qualification:</strong> {candidate.qualification}</p>
                <p><strong>Current Company:</strong> {candidate.currentCompanyName}</p>
                <p><strong>Experience:</strong> {candidate.experience}</p>
                <p><strong>Current Salary:</strong> ₹{candidate.currentSalary}</p>
              </div>
              <div className="col-md-6">
                <p><strong>Expecting Job:</strong> {candidate.expectingJob}</p>
                <p><strong>Expected Salary:</strong> ₹{candidate.expectingSalary}</p>
                <p><strong>Biodata Received Date:</strong> {candidate.biodataReceivedDate || "N/A"}</p>
                <p><strong>Status:</strong> {candidate.status}</p>
              </div>
            </div>

            {/* Additional Information */}
            <h5 className="mb-3">Other Details</h5>
            <div className="row">
              <div className="col-md-6">
                <p><strong>EPF Number:</strong> {candidate.epfNumber || "N/A"}</p>
                <p><strong>ESI Number:</strong> {candidate.esiNumber || "N/A"}</p>
              </div>
              <div className="col-md-6">
                <p><strong>Date of Joining:</strong> {candidate.dateOfJoined || "N/A"}</p>
                <p><strong>Remarks:</strong> {candidate.remarks || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Print Button */}
          <div className="card-footer text-center">
            <button
              className="btn btn-primary"
              onClick={handlePrintCandidates}
            >
              Print Candidate Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewForm;
