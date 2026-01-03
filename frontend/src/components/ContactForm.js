import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ContactForm.css';

const ContactForm = ({ onContactAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Phone validation
    const phoneRegex = /^\d{10}$|^\+\d{1,3}\d{9,14}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!phoneRegex.test(formData.phone.replace(/[\s\-]/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrors({});

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('/api/contacts', formData);
      
      setSuccessMessage('Contact added successfully! ✓');
      setErrors({});
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
      
      // Call the callback to refresh contacts list
      if (onContactAdded) {
        onContactAdded(response.data.data);
      }

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrors({
        submit: error.response?.data?.message || 'Failed to add contact',
      });
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const phoneRegex = /^\d{10}$|^\+\d{1,3}\d{9,14}$/;
    
    return (
      formData.name.trim() &&
      formData.name.trim().length >= 2 &&
      formData.email.trim() &&
      emailRegex.test(formData.email) &&
      formData.phone.trim() &&
      phoneRegex.test(formData.phone.replace(/[\s\-]/g, ''))
    );
  };

  return (
    <div className="form-container">
      <h2>Add New Contact</h2>
      
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errors.submit && <div className="error-message">{errors.submit}</div>}

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className={errors.name ? 'input-error' : ''}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter 10-digit phone number"
            className={errors.phone ? 'input-error' : ''}
          />
          {errors.phone && <span className="error-text">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your message (optional)"
            rows="4"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={!isFormValid() || loading}
          className="submit-btn"
        >
          {loading ? 'Adding...' : 'Add Contact'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
