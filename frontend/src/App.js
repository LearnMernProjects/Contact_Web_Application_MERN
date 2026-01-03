import React, { useState } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import './styles/App.css';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleContactAdded = () => {
    // Trigger a refresh of the contacts list
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>Contact Management App</h1>
          <p>Manage your contacts efficiently</p>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          <div className="form-section">
            <ContactForm onContactAdded={handleContactAdded} />
          </div>

          <div className="list-section">
            <ContactList refreshTrigger={refreshTrigger} />
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>&copy; 2024 Contact Management App | Built with MERN Stack</p>
      </footer>
    </div>
  );
}

export default App;
