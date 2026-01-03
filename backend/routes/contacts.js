const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// Create a new contact
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validation
    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and phone',
      });
    }

    // Email validation regex
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email',
      });
    }

    // Phone validation (10 digits or international format)
    const phoneRegex = /^\d{10}$|^\+\d{1,3}\d{9,14}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid phone number (10 digits)',
      });
    }

    const newContact = new Contact({
      name,
      email,
      phone,
      message: message || '',
    });

    await newContact.save();
    res.status(201).json({
      success: true,
      message: 'Contact created successfully',
      data: newContact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get a single contact by ID
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      });
    }
    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Delete a contact
router.delete('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully',
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
