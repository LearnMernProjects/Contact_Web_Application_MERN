import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ContactList.css';

const ContactList = ({ refreshTrigger }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    fetchContacts();
  }, [refreshTrigger]);

  const fetchContacts = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('/api/contacts');
      setContacts(response.data.data || []);
    } catch (err) {
      setError('Failed to fetch contacts');
      console.error('Error fetching contacts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await axios.delete(`/api/contacts/${id}`);
        setContacts((prev) => prev.filter((contact) => contact._id !== id));
      } catch (err) {
        setError('Failed to delete contact');
        console.error('Error deleting contact:', err);
      }
    }
  };

  const sortContacts = (contactsToSort) => {
    const sorted = [...contactsToSort];
    if (sortBy === 'name') {
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'email') {
      return sorted.sort((a, b) => a.email.localeCompare(b.email));
    } else {
      return sorted.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }
  };

  const sortedContacts = sortContacts(contacts);

  if (loading) {
    return <div className="contacts-container"><p>Loading contacts...</p></div>;
  }

  return (
    <div className="contacts-container">
      <div className="contacts-header">
        <h2>Contacts List</h2>
        {contacts.length > 0 && (
          <div className="sort-controls">
            <label htmlFor="sort">Sort by:</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date">Date (Newest)</option>
              <option value="name">Name (A-Z)</option>
              <option value="email">Email (A-Z)</option>
            </select>
          </div>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}

      {sortedContacts.length === 0 ? (
        <div className="no-contacts">
          <p>No contacts yet. Add one above to get started!</p>
        </div>
      ) : (
        <div className="contacts-table-wrapper">
          <table className="contacts-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Message</th>
                <th>Date Added</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedContacts.map((contact) => (
                <tr key={contact._id} className="contact-row">
                  <td data-label="Name">{contact.name}</td>
                  <td data-label="Email">{contact.email}</td>
                  <td data-label="Phone">{contact.phone}</td>
                  <td data-label="Message">{contact.message || '-'}</td>
                  <td data-label="Date Added">
                    {new Date(contact.createdAt).toLocaleDateString()} 
                    <br /> 
                    <small>{new Date(contact.createdAt).toLocaleTimeString()}</small>
                  </td>
                  <td data-label="Action">
                    <button
                      onClick={() => handleDelete(contact._id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="contacts-count">Total: {sortedContacts.length} contact(s)</p>
    </div>
  );
};

export default ContactList;
