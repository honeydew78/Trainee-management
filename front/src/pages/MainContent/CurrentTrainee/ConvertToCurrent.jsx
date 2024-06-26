import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ConvertToCurrentTraineeForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    applicationId: '',
    email: '',
    cgpa: '',
    yearOfStudy: '',
    traineePeriod: '',
    mentor: '',
    department: '',
    topicOfPursue: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [emailError, setEmailError] = useState('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!emailRegex.test(formData.email)) {
      setEmailError('Invalid email format.');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/v1/currentTrainees/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to convert to current trainee');
      }

      const data = await response.json();
      setSuccessMessage(data.message);
      navigate(`/home-admin/home-current-trainees/${response.data.data._id}`);
    } catch (error) {
      console.error('Error converting to current trainee:', error);
      // Handle error here (e.g., display error message)
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'email') {
      setEmailError(emailRegex.test(value) ? '' : 'Invalid email format.');
    }
  };

  return (
    <div className="min-h-screen bg-white flex justify-center items-center">
      <div className="p-8 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Convert to Current Trainee</h2>
        {successMessage && <p className="text-green-700 mb-4">{successMessage}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label className="block mb-2">Application ID:</label>
            <input
              type="text"
              name="applicationId"
              placeholder="Enter Application ID"
              value={formData.applicationId}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
              required
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-2">CGPA:</label>
            <input
              type="text"
              name="cgpa"
              placeholder="Enter CGPA"
              value={formData.cgpa}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Year of Study:</label>
            <input
              type="number"
              name="yearOfStudy"
              placeholder="Enter Year of Study"
              value={formData.yearOfStudy}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Trainee Period:</label>
            <input
              type="text"
              name="traineePeriod"
              placeholder="Enter Trainee Period"
              value={formData.traineePeriod}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Mentor:</label>
            <input
              type="text"
              name="mentor"
              placeholder="Enter Mentor"
              value={formData.mentor}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Department:</label>
            <input
              type="text"
              name="department"
              placeholder="Enter Department"
              value={formData.department}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Topic of Pursue:</label>
            <input
              type="text"
              name="topicOfPursue"
              placeholder="Enter Topic of Pursue"
              value={formData.topicOfPursue}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-800 hover:bg-green-900 text-white py-2 px-4 rounded focus:outline-none focus:bg-green-900"
          >
            Convert to Current Trainee
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConvertToCurrentTraineeForm;
