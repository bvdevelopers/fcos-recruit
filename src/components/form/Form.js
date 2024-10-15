import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './form.css';
import { updateForm } from '../../redux/formSlice';
import axios from 'axios';
import  Notification  from '../notification/Notification';

function Form() {
  // const { id } = useParams();
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form || {});
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });

  const handleChange =  (e) => {
    const { name, value } = e.target;
    // Ensure the Aadhar number is exactly 12 digits
    if (name === 'aadharNumber' && value.length > 12) {
      return;
    }

    // Ensure only numeric input for Aadhar number
    if (name === 'aadharNumber' && !/^\d*$/.test(value)) {
      return;
    }
    // Ensure the phno is exactly 10 digits
    if (name === 'contactPhoneNo' && value.length > 10) {
      return;
    }

    // Ensure only numeric input for Aadhar number
    if (name === 'contactPhoneNo' && !/^\d*$/.test(value)) {
      return;
    }
    if (name === 'pincode' && value.length === 6) {
      const pincode = { "pincode": value };
    
      axios.post('https://fcos-api.onrender.com/pincode.php', pincode, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        // The response data is already parsed as JSON by axios
        const data = response.data;
        
        console.log('Data successfully retrieved from the server:', data);
    
        // Check if pincode was found and update form data
        if (data.city && data.state && data.district) {
          // Update form data with city, state, district
          // setFormData(prev => ({ ...prev, city: data.city, state: data.state, district: data.district }));
        } else {
          console.error('Pincode not found or invalid response');
        }
    
        setIsSubmitting(false);
      })
      .catch(error => {
        console.error('Error retrieving data from the server:', error);
        setIsSubmitting(false);
      });
    } else {
      console.error('Invalid pincode');
      setIsSubmitting(false);
    }
    

    let updatedData = { [name]: value };

    if (name === 'dob') {
      const age = calculateAge(value);
      updatedData = { ...updatedData, age };
      dispatch(updateForm(updatedData ));
    }
    dispatch(updateForm({ [name]: value } ));
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return Math.round(age);
  };


  const handleSubmit = (e) => {


    e.preventDefault();
    if (isSubmitting) return; // Prevent multiple submissions

    setIsSubmitting(true);

    console.log("Submitting form data:", formData);

    axios.post('https://fcos-api.onrender.com/insert_api.php', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if(response.message === 'Data inserted successfully')
          {
        console.log('Data successfully sent to the server:', response);
        setNotification({ message: 'Form submitted successfully!', type: 'success' });
          }
          else
          {
            setNotification({ message: response.message, type: 'error' });
          }
        // alert('Submitted');
        setIsSubmitting(false);
      })
      .catch(error => {
        setNotification({ message: "There was an error sending the data!", type: 'error' });

        console.error('There was an error sending the data!', error);
        console.error('Error details:', {
          message: error.message,
          name: error.name,
          code: error.code,
          config: error.config,
          request: error.request,
          response: error.response,
        });
        setIsSubmitting(false);
      });
  };
  const closeNotification = () => {
    setNotification({ message: '', type: '' });
  };


  return (
    <div className="formmain">
      <div className="form">
      <Notification message={notification.message} type={notification.type} onClose={closeNotification} />
      <form onSubmit={handleSubmit}>
          <div className="pair">
            <div className="form-section">
              <fieldset>
                <legend>Personal Information</legend>
                <div className="form-row">
                  <label>Category: *</label>
                  <select name="category" onChange={handleChange} value={formData.category || ''} required>
                    <option value="">-select-</option>
                    <option value="Manager">Manager</option>
                    <option value="Supervisor">Supervisor</option>
                    <option value="Security guard">Security guard</option>
                    <option value="Unskilled">Unskilled</option>
                    <option value="Skilled">Skilled</option>
                    <option value="Semiskilled">Semiskilled</option>
                    <option value="ex-service">Ex-Service</option>
                    <option value="Plumber">Plumber</option>
                    <option value="Operator">Operator</option>
                    <option value="Housekeeper">Housekeeper</option>
                    <option value="Scavenger">Scavenger</option>
                    <option value="Lady guard">Lady guard</option>
                  </select>
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
                      M
                    </label>
                    <input type="radio" name="gender" value="male" onChange={handleChange} checked={formData.gender === 'male'} />
                    <label>
                      F
                    </label>
                    <input type="radio" name="gender" value="female" onChange={handleChange} checked={formData.gender === 'female'} />
                    <label>
                      Others
                    </label>
                    <input type="radio" name="gender" value="other" onChange={handleChange} checked={formData.gender === 'other'} />

                  </div>
                </div>
                <div className="form-row">
                  <label>Aadhar Number:</label>
                  <input type="text" inputMode='numeric' pattern="\d{12}" maxLength="12" minLength="12" name="aadharNumber" onChange={handleChange} value={formData.aadharNumber || ''} />
                </div>
                <div className="form-row">
                  <label>Marital Status:</label>
                  <select name="maritalstatus" onChange={handleChange} value={formData.maritalstatus || ''}>
                    <option value="">-select-</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="widowed">Widowed</option>
                    <option value="divorced">Divorced</option>
                    <option value="separated">Separated</option>
                    <option value="registered partnership">Registered Partnership</option>
                  </select>
                </div>
                <div className="form-row">
                  <label>Account Number:</label>
                  <input type="text" name="accountnumber" onChange={handleChange} value={formData.accountnumber || ''} />
                </div>
                <div className="form-row">
                <label>IFSC code:</label>
                  <input type="text" name="ifsccode"   onChange={handleChange} value={formData.ifsccode || ''} />
                  <label>Branch:</label>
                  <input type="text" name="branch" onChange={handleChange} value={formData.branch || ''} />
                 </div>

                 <div className="form-row">
                  <label>shirt Size:</label>
                  <select name="shirtsize" onChange={handleChange} value={formData.shirtsize || ''}>
                    <option value="">-select-</option>
                    <option value="36">36</option>
                    <option value="38">38</option>
                    <option value="40">40</option>
                    <option value="42">42</option>
                    <option value="44">44</option>
                    <option value="46">46</option>
                  </select>
                  <label>pant Size:</label>

                  <select name="pantsize" onChange={handleChange} value={formData.pantsize || ''}>
                    <option value="">-select-</option>
                    <option value="36">32</option>
                    <option value="34">34</option>
                    <option value="36">36</option>
                    <option value="38">38</option>
                    <option value="40">40</option>
                    <option value="42">42</option>
                  </select>
                  <label>Shoe Size:</label>

                  <select name="shoesize" onChange={handleChange} value={formData.shoesize || ''}>
                    <option value="">-select-</option>
                    <option value="36">8</option>
                    <option value="38">9</option>
                    <option value="40">10</option>
                    <option value="42">12</option>
                  </select>
                </div>
               
              </fieldset>
            </div>

            <div className="form-section">
              <fieldset>
                <legend>Communication</legend>
                <div className="form-row">
                  <label>Phone Number:</label>
                  <input type="text" name="contactPhoneNo" inputMode='numeric' pattern="\d{10}" maxLength="10" minLength="10" onChange={handleChange} value={formData.contactPhoneNo || ''} />
                </div>
                <div className="form-row">
                  <label>Alternate Phone Number</label>
                  <input type="text" name="alternateContactPhoneNo" inputMode='numeric' pattern="\d{10}" maxLength="10" minLength="10" onChange={handleChange} value={formData.alternateContactPhoneNo || ''} />
                </div>
                <div className="form-row">
                  <label>Email:</label>
                  <input type="email" name="contactEmailId" onChange={handleChange} value={formData.contactEmailId || ''} />
                </div>
                <div className="form-row">
                  <label>Pin Code *:</label>
                  <input type="text" inputMode='numeric' name="pincode" onChange={handleChange} value={formData.pincode || ''} required />
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
                  <label>District: *</label>
                  <input type="text" name="district" onChange={handleChange} value={formData.district || ''} required/>
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
                  <label>Qualification: *</label>
                  <input type="text" name="qualification" onChange={handleChange} value={formData.qualification || ''} required/>
                </div>
                <div className="form-row">
                  <label>Current Company Name:</label>
                  <input type="text" name="currentCompanyName" onChange={handleChange} value={formData.currentCompanyName || ''} />
                </div>
                <div className="form-row">
                  <label>Experience: *</label>
                  <select name="experience" onChange={handleChange} value={formData.experience || ''} required>
                    <option value="">-select-</option>
                    <option value="0-1">0-1</option>
                    <option value="1-2">1-2</option>
                    <option value="2-3">2-3</option>
                    <option value="3-4">3-4</option>
                    <option value="4-5">4-5</option>
                    <option value="5-6">5-6</option>
                    <option value="6-7">6-7</option>
                    <option value="7-8">7-8</option>
                    <option value="8-9">8-9</option>
                    <option value="9-10">9-10</option>

                  </select>                </div>
                <div className="form-row">
                  <label>Expecting Job:</label>
                  <input type="text" name="expectingJob" onChange={handleChange} value={formData.expectingJob || ''} />
                </div>
                <div className="form-row">
                  <label>Current Salary: *</label>
                  <input type="number" name="currentSalary" onChange={handleChange} value={formData.currentSalary || ''} required/>
                </div>
                <div className="form-row">
                  <label>Expecting Salary: *</label>
                  <input type="number" name="expectingSalary" onChange={handleChange} value={formData.expectingSalary || ''} required/>
                </div>
                <div className="form-row">
                  <label>Accommodation:</label>
                  <input type="text" name="accommodation" onChange={handleChange} value={formData.accommodation || ''} />
                </div>
                <div className="form-row">
                  <label>Food:</label>
                  <input type="text" name="food" onChange={handleChange} value={formData.food || ''} />
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
                  <label>Status: *</label>
                  <select name="status" onChange={handleChange} value={formData.status || ''} required>
                    <option value="">-select-</option>
                    <option value="waiting">Waiting</option>
                    <option value="placed">Placed</option>
                    <option value="relieved">Relived</option>
                    <option value="blocked">Blocked</option>
                  </select>
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

          <button type="submit" disabled={isSubmitting}>Submit</button>
        </form>
      </div>
    </div>

  );
}

export default Form;
