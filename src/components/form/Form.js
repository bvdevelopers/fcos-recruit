import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import './form.css';
import "./new.css";
import { updateForm } from '../../redux/formSlice';
import axios from 'axios';
import Notification from '../notification/Notification';

function Form() {
  // const { id } = useParams();
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form || {});
  // const [taluks, setTaluks] = useState([]); // Holds the list of cities/taluks

  // const [formData,setFormData] = useState()
  // const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [imagePreview, setImagePreview] = useState(null);
  const [documentPreview, setDocumentPreview] = useState(null);


  const handleChange = (e) => {
    const { name, value } = e.target;
    // Ensure the Aadhar number is exactly 12 digits
    if (name === 'aadharNumber' && value.length > 12 ) {
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
            dispatch(updateForm({city:data.city,state:data.state,district:data.district}));
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
      dispatch(updateForm(updatedData));
    }
    dispatch(updateForm({ [name]: value }));
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


  // Image preview handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
    dispatch(updateForm({ image: file }));
  };

  // Document preview handler
  const handleDocumentChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDocumentPreview(file.name); // Display document name
    }
    dispatch(updateForm({ document: file }));
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
        if (response.message === 'Data inserted successfully') {
          console.log('Data successfully sent to the server:', response);
          setNotification({ message: 'Form submitted successfully!', type: 'success' });
        }
        else {
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
    <div className="container my-5">
    <div className="row justify-content-center">
      <div className="col-lg-10">
        <Notification message={notification.message} type={notification.type} onClose={closeNotification} />
        <form onSubmit={handleSubmit}>
          {/* Personal Information Section */}
          <div className="card mb-4">
            <div className="card-header">
              <h5>Personal Information</h5>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Category: *</label>
                  <select className="form-select" name="category" onChange={handleChange} value={formData.category || ''} required>
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
                    {/* Category options */}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Candidate Name:</label>
                  <input type="text" className="form-control" name="candidateName" onChange={handleChange} value={formData.candidateName || ''} />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Date of Birth:</label>
                  <input type="date" className="form-control" name="dob" onChange={handleChange} value={formData.dob || ''} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Age:</label>
                  <input type="number" className="form-control" name="age" onChange={handleChange} value={formData.age || ''} />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <label className="form-label">Gender:</label>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="gender" value="male" onChange={handleChange} checked={formData.gender === 'male'} />
                    <label className="form-check-label">Male</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="gender" value="female" onChange={handleChange} checked={formData.gender === 'female'} />
                    <label className="form-check-label">Female</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="gender" value="other" onChange={handleChange} checked={formData.gender === 'other'} />
                    <label className="form-check-label">Other</label>
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Aadhar Number:</label>
                  <input type="text" className="form-control" name="aadharNumber" inputMode="numeric" pattern="\d{12}" maxLength="12" onChange={handleChange} value={formData.aadharNumber || ''} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Marital Status:</label>
                  <select className="form-select" name="maritalstatus" onChange={handleChange} value={formData.maritalstatus || ''}>
                    <option value="">-select-</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="widowed">Widowed</option>
                    <option value="divorced">Divorced</option>
                    <option value="separated">Separated</option>
                    <option value="registered partnership">Registered Partnership</option>
                    {/* Marital status options */}
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Account Number:</label>
                  <input type="text" className="form-control" name="accountnumber" onChange={handleChange} value={formData.accountnumber || ''} />
                </div>
                <div className="col-md-3">
                  <label className="form-label">IFSC code:</label>
                  <input type="text" className="form-control" name="ifsccode" onChange={handleChange} value={formData.ifsccode || ''} />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Branch:</label>
                  <input type="text" className="form-control" name="branch" onChange={handleChange} value={formData.branch || ''} />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label className="form-label">Shirt Size:</label>
                  <select className="form-select" name="shirtsize" onChange={handleChange} value={formData.shirtsize || ''}>
                    <option value="">-select-</option>
                    <option value="36">36</option>
                    <option value="38">38</option>
                    <option value="40">40</option>
                    <option value="42">42</option>
                    <option value="44">44</option>
                    <option value="46">46</option>
                    {/* Shirt size options */}
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">Pant Size:</label>
                  <select className="form-select" name="pantsize" onChange={handleChange} value={formData.pantsize || ''}>
                    <option value="">-select-</option>
                    <option value="36">32</option>
                    <option value="34">34</option>
                    <option value="36">36</option>
                    <option value="38">38</option>
                    <option value="40">40</option>
                    <option value="42">42</option>
                    {/* Pant size options */}
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">Shoe Size:</label>
                  <select className="form-select" name="shoesize" onChange={handleChange} value={formData.shoesize || ''}>
                    <option value="">-select-</option>
                    <option value="36">8</option>
                    <option value="38">9</option>
                    <option value="40">10</option>
                    <option value="42">12</option>
                    {/* Shoe size options */}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Communication Section */}
          <div className="card mb-4">
            <div className="card-header">
              <h5>Communication</h5>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Phone Number:</label>
                  <input type="text" className="form-control" name="contactPhoneNo" inputMode="numeric" pattern="\d{10}" maxLength="10" onChange={handleChange} value={formData.contactPhoneNo || ''} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Alternate Phone Number:</label>
                  <input type="text" className="form-control" name="alternateContactPhoneNo" inputMode="numeric" pattern="\d{10}" maxLength="10" onChange={handleChange} value={formData.alternateContactPhoneNo || ''} />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Email:</label>
                  <input type="email" className="form-control" name="contactEmailId" onChange={handleChange} value={formData.contactEmailId || ''} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Pin Code *</label>
                  <input type="text" className="form-control" name="pincode" inputMode="numeric" required onChange={handleChange} value={formData.pincode || ''} />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Address:</label>
                  <input type="text" className="form-control" name="address" onChange={handleChange} value={formData.address || ''} />
                </div>
                <div className="col-md-3">
                  {/* <label className="form-label">City:</label>
                  <select className="form-select" name="city" onChange={handleChange} value={formData.city || ''}>
                    <option value="">-select-</option>
                    {taluks.map((taluk, index) => (
            <option key={index} value={taluk}>{taluk}</option>
          ))} */}
                    {/* City options */}
                  {/* </select> */}
                </div>
                <div className="col-md-3">
                  <label className="form-label">District: *</label>
                  <input type="text" className="form-control" name="district" required onChange={handleChange} value={formData.district || ''} />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">State:</label>
                  <input type="text" className="form-control" name="state" onChange={handleChange} value={formData.state || ''} />
                </div>
              </div>
            </div>
          </div>

          {/* Professional Information Section */}
          <div className="card mb-4">
            <div className="card-header">
              <h5>Professional Information</h5>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Qualification: *</label>
                  <input type="text" className="form-control" name="qualification" onChange={handleChange} value={formData.qualification || ''} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Current Salary: *</label>
                  <input type="number" className="form-control" name="currentSalary" onChange={handleChange} value={formData.currentSalary || ''} required />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Job Expectation:</label>
                  <input type="text" className="form-control" name="expectingJob" onChange={handleChange} value={formData.expectingJob || ''} />
                </div>
               
                <div className="col-md-6">
                  <label className="form-label">Experience:</label>
                  <select className="form-select" name="experience" onChange={handleChange} value={formData.experience || ''} >
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
                    </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Expected Salary:</label>
                  <input type="number" className="form-control" name="expectingSalary" onChange={handleChange} value={formData.expectingSalary || ''} />
                </div>
              </div>
            </div>
          </div>

          {/* Others Section */}
          <div className="card mb-4">
            <div className="card-header">
              <h5>Others</h5>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Biodata Received Date:</label>
                  <input type="date" className="form-control" name="biodataReceivedDate" onChange={handleChange} value={formData.biodataReceivedDate || ''} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Status: *</label>
                  <select className="form-select" name="status" onChange={handleChange} value={formData.status || ''} required>
                    <option value="">-select-</option>
                    <option value="waiting">Waiting</option>
                    <option value="placed">Placed</option>
                    <option value="relieved">Relieved</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="mb-4">
          <label className="form-label">Upload Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imagePreview && (
            <div className="preview">
              <image src={imagePreview} alt="Image Preview" width="100" height="100" />
            </div>
          )}
        </div>

        {/* Document Upload Section */}
        <div className="mb-4">
          <label className="form-label">Upload Document:</label>
          <input type="file" accept=".pdf,.doc,.docx" onChange={handleDocumentChange} />
          {documentPreview && <p>Document: {documentPreview}</p>}
        </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
}

export default Form;
