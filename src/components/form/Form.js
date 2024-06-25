import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './form.css';
import { updateForm } from '../../redux/formSlice';
import axios from 'axios';

function Form() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form[id] || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateForm({ id, pass: { [name]: value } }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://fcos-recruitment.000webhostapp.com/api/insert_api.php', formData)
      .then(response => {
        console.log('Data successfully sent to the server:', response);
        alert('Submitted');
      })
      .catch(error => {
        console.error('There was an error sending the data!', error);
      });
  };

  return (
    <div className="formmain">
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="pair">
            <div className="form-section">
              <fieldset>
                <legend>Personal Information</legend>
                <div className="form-row">
                  <label>Category:</label>
                  <input type="text" name="category" onChange={handleChange} value={formData.category || ''} />
                </div>
                <div className="form-row">
                  <label>Candidate Name:</label>
                  <input type="text" name="candidateName" onChange={handleChange} value={formData.candidateName || ''} />
                </div>
                <div className="form-row">
                  <label>Date of Birth:</label>
                  <input type="date" name="dob" onChange={handleChange} value={formData.dob || ''} />
                </div>
                <div className="form-row">
                  <label>Age:</label>
                  <input type="number" name="age" onChange={handleChange} value={formData.age || ''} />
                </div>
                <div className="form-row">
                  <label>Gender:</label>
                  <div className="gender">
                    <label>
                      Male
                    </label>
                    <input type="radio" name="gender" value="male" onChange={handleChange} checked={formData.gender === 'male'} />

                    <label>
                      Female
                    </label>
                    <input type="radio" name="gender" value="female" onChange={handleChange} checked={formData.gender === 'female'} />

                  </div>
                </div>
                <div className="form-row">
                  <label>Aadhar Number:</label>
                  <input type="text" name="aadharNumber" onChange={handleChange} value={formData.aadharNumber || ''} />
                </div>
              </fieldset>
            </div>

            <div className="form-section">
              <fieldset>
                <legend>Communication</legend>
                <div className="form-row">
                  <label>Phone Number:</label>
                  <input type="text" name="contactPhoneNo" onChange={handleChange} value={formData.contactPhoneNo || ''} />
                </div>
                <div className="form-row">
                  <label>Email:</label>
                  <input type="email" name="contactEmailId" onChange={handleChange} value={formData.contactEmailId || ''} />
                </div>
                <div className="form-row">
                  <label>Address:</label>
                  <input type="text" name="address" onChange={handleChange} value={formData.address || ''} />
                </div>
                <div className="form-row">
                  <label>City:</label>
                  <select name="city" onChange={handleChange} value={formData.city || ''}>
                    <option value="">-select-</option>
                    <option value="Trichy">Trichy</option>
                    <option value="Coimbatore">Coimbatore</option>
                  </select>
                </div>
                <div className="form-row">
                  <label>District:</label>
                  <input type="text" name="district" onChange={handleChange} value={formData.district || ''} />
                </div>
                <div className="form-row">
                  <label>State:</label>
                  <input type="text" name="state" onChange={handleChange} value={formData.state || ''} />
                </div>
              </fieldset>
            </div>
          </div>
          <div className="pair">

            <div className="form-section">
              <fieldset>
                <legend>Professional Information</legend>
                <div className="form-row">
                  <label>Current Company Name:</label>
                  <input type="text" name="currentCompanyName" onChange={handleChange} value={formData.currentCompanyName || ''} />
                </div>
                <div className="form-row">
                  <label>Experience:</label>
                  <input type="text" name="experience" onChange={handleChange} value={formData.experience || ''} />
                </div>
                <div className="form-row">
                  <label>Expecting Job:</label>
                  <input type="text" name="expectingJob" onChange={handleChange} value={formData.expectingJob || ''} />
                </div>
                <div className="form-row">
                  <label>Current Salary:</label>
                  <input type="number" name="currentSalary" onChange={handleChange} value={formData.currentSalary || ''} />
                </div>
                <div className="form-row">
                  <label>Expecting Salary:</label>
                  <input type="number" name="expectingSalary" onChange={handleChange} value={formData.expectingSalary || ''} />
                </div>
                <div className="form-row">
                  <label>Accommodation:</label>
                  <input type="text" name="accommodation" onChange={handleChange} value={formData.accommodation || ''} />
                </div>
                <div className="form-row">
                  <label>Food:</label>
                  <input type="text" name="food" onChange={handleChange} value={formData.food || ''} />
                </div>
                <div className="form-row">
                  <label>Placed:</label>
                  <input type="text" name="placed" onChange={handleChange} value={formData.placed || ''} />
                </div>
              </fieldset>
            </div>
            <div className="form-section">
              <fieldset>
                <legend>Others</legend>
                <div className="form-row">
                  <label>Biodata Received Date:</label>
                  <input type="date" name="biodataReceivedDate" onChange={handleChange} value={formData.biodataReceivedDate || ''} />
                </div>
                <div className="form-row">
                  <label>Status:</label>
                  <input type="text" name="status" onChange={handleChange} value={formData.status || ''} />
                </div>
                <div className="form-row">
                  <label>Proposed Company Name - Joined/Placed:</label>
                  <input type="text" name="proposedCompanyNameJoinedOrPlaced" onChange={handleChange} value={formData.proposedCompanyNameJoinedOrPlaced || ''} />
                </div>
                <div className="form-row">
                  <label>Date of Joined:</label>
                  <input type="date" name="dateOfJoined" onChange={handleChange} value={formData.dateOfJoined || ''} />
                </div>
                <div className="form-row">
                  <label>Last Update Date:</label>
                  <input type="date" name="lastUpdateDate" onChange={handleChange} value={formData.lastUpdateDate || ''} />
                </div>
                <div className="form-row">
                  <label>Remarks:</label>
                  <textarea name="remarks" onChange={handleChange} value={formData.remarks || ''}></textarea>
                </div>
                <div className="form-row">
                  <label>EPF Number:</label>
                  <input type="text" name="epfNumber" onChange={handleChange} value={formData.epfNumber || ''} />
                </div>
                <div className="form-row">
                  <label>ESI Number:</label>
                  <input type="text" name="esiNumber" onChange={handleChange} value={formData.esiNumber || ''} />
                </div>
              </fieldset>
            </div>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>

  );
}

export default Form;
