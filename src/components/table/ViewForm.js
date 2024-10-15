import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './viewForm.css';

function ViewForm() {
  const { id } = useParams();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`https://fcosrecruit.rf.gd/api/getById.php?id=${id}`)
      .then(response => {
        setFormData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);
  const handlePrintCandidates = () => {
    let selectedCandidates=[id]
    axios.post('https://fcos-api.onrender.com/pincode.php/print_api.php', { ids: selectedCandidates }, { responseType: 'blob' })
      .then(response => {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        saveAs(blob, 'candidates.pdf');
      })
      .catch(error => {
        alert('Error printing candidates: ' + error.message);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (

    <div className="view-form">
      <h1>Form Details</h1>
      <div className="form-section">
        <fieldset>
          <legend>Personal Information</legend>
          <div className="form-row"><label>Category:</label><span>{formData.category}</span></div>
          <div className="form-row"><label>Candidate Name:</label><span>{formData.candidateName}</span></div>
          <div className="form-row"><label>Date of Birth:</label><span>{formData.dob}</span></div>
          <div className="form-row"><label>Age:</label><span>{formData.age}</span></div>
          <div className="form-row"><label>Gender:</label><span>{formData.gender}</span></div>
          <div className="form-row"><label>Aadhar Number:</label><span>{formData.aadharNumber}</span></div>
          <div className="form-row"><label>Marital Status:</label><span>{formData.maritalstatus}</span></div>
          <div className="form-row"><label>Account Number:</label><span>{formData.accountnumber}</span></div>
          <div className="form-row"><label>IFSC code:</label><span>{formData.ifsccode}</span></div>
          <div className="form-row"><label>Branch:</label><span>{formData.branch}</span></div>
          <div className="form-row"><label>Shirt Size:</label><span>{formData.shirtsize}</span></div>
          <div className="form-row"><label>Pant Size:</label><span>{formData.pantsize}</span></div>
          <div className="form-row"><label>Shoe Size:</label><span>{formData.shoesize}</span></div>
        </fieldset>
      </div>
      <div className="form-section">
        <fieldset>
          <legend>Communication</legend>
          <div className="form-row"><label>Phone Number:</label><span>{formData.contactPhoneNo}</span></div>
          <div className="form-row"><label>Alternate Phone Number:</label><span>{formData.alternateContactPhoneNo}</span></div>
          <div className="form-row"><label>Email:</label><span>{formData.contactEmailId}</span></div>
          <div className="form-row"><label>Pin Code:</label><span>{formData.pincode}</span></div>
          <div className="form-row"><label>Address:</label><span>{formData.address}</span></div>
          <div className="form-row"><label>City:</label><span>{formData.city}</span></div>
          <div className="form-row"><label>District:</label><span>{formData.district}</span></div>
          <div className="form-row"><label>State:</label><span>{formData.state}</span></div>
        </fieldset>
      </div>
      <div className="form-section">
        <fieldset>
          <legend>Professional Information</legend>
          <div className="form-row"><label>Qualification:</label><span>{formData.qualification}</span></div>
          <div className="form-row"><label>Current Company Name:</label><span>{formData.currentCompanyName}</span></div>
          <div className="form-row"><label>Experience:</label><span>{formData.experience}</span></div>
          <div className="form-row"><label>Expecting Job:</label><span>{formData.expectingJob}</span></div>
          <div className="form-row"><label>Current Salary:</label><span>{formData.currentSalary}</span></div>
          <div className="form-row"><label>Expecting Salary:</label><span>{formData.expectingSalary}</span></div>
          <div className="form-row"><label>Accommodation:</label><span>{formData.accommodation}</span></div>
          <div className="form-row"><label>Food:</label><span>{formData.food}</span></div>
        </fieldset>
      </div>
      <div className="form-section">
        <fieldset>
          <legend>Others</legend>
          <div className="form-row"><label>Biodata Received Date:</label><span>{formData.biodataReceivedDate}</span></div>
          <div className="form-row"><label>Status:</label><span>{formData.status}</span></div>
          <div className="form-row"><label>Proposed Company Name - Joined/Placed:</label><span>{formData.proposedCompanyNameJoinedOrPlaced}</span></div>
          <div className="form-row"><label>Date of Joined:</label><span>{formData.dateOfJoined}</span></div>
          <div className="form-row"><label>Last Update Date:</label><span>{formData.lastUpdateDate}</span></div>
          <div className="form-row"><label>Remarks:</label><span>{formData.remarks}</span></div>
          <div className="form-row"><label>EPF Number:</label><span>{formData.epfNumber}</span></div>
          <div className="form-row"><label>ESI Number:</label><span>{formData.esiNumber}</span></div>
        </fieldset>
      </div>
    </div>
  );
}

export default ViewForm;
