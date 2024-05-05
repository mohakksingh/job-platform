// src/components/SignUpForm.js

import React from 'react';
import axios from 'axios';

const SignUpForm = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/register', {
        email: 'user@example.com',
        password: 'password',
        role: 'candidate',
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields for email, password, etc. */}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default SignUpForm;
