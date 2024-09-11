import React, { useState } from 'react';
import ContactForm from '../components/ContactForm';
import ContactList from '../components/ContactList';
import ContactFetcher from '../components/ContactFetcher'; 
import { Contact } from '../features/contacts/contactSlice';
import Modal from '../components/Modal';
import ContactDetails from '../components/ContactDetails';

const ContactPage: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [contactToEdit, setContactToEdit] = useState<Contact | null>(null);
  const [contactToView, setContactToView] = useState<Contact | null>(null); 
  const [theme ] = useState<'light' | 'dark'>('light');
  
  const handleFormClose = () => {
    setIsFormOpen(false);
    setContactToEdit(null);
  };

  const handleFormSubmit = () => {
    setIsFormOpen(false);
    setContactToEdit(null);
  };

  const handleViewClose = () => {
    setIsViewOpen(false);
    setContactToView(null);
  };

  return (
    <div className="flex flex-col items-center px-4 py-0">
      <ContactFetcher /> 
      <button
        onClick={() => setIsFormOpen(true)}
        className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 mb-6"
      >
        <span className="material-icons mr-2">+</span> Create Contact
      </button>

      <Modal isOpen={isFormOpen} onClose={handleFormClose}>
        <ContactForm
          contactToEdit={contactToEdit}
          onFormSubmit={handleFormSubmit}
          onClose={handleFormClose}
          theme={theme}
        />
      </Modal>

      <Modal isOpen={isViewOpen} onClose={handleViewClose}>
        {contactToView && (
          <ContactDetails
            contact={contactToView}
            onClose={handleViewClose}
          />
        )}
      </Modal>

      <div className="w-full max-w-4xl">
        <ContactList
          onEditContact={(contact) => {
            setContactToEdit(contact);
            setIsFormOpen(true);
          }}
          onViewContact={(contact) => {
            setContactToView(contact);
            setIsViewOpen(true);
          }}
        />
      </div>
    </div>
  );
};

export default ContactPage;
