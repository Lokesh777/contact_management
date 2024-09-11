import React from 'react';
import { Contact } from '../features/contacts/contactSlice';

interface ContactDetailsProps {
  contact: Contact;
  onClose: () => void;
}

const ContactDetails: React.FC<ContactDetailsProps> = ({ contact, onClose }) => {
  return (
    <div className={`bg-white p-6 rounded-lg max-w-md mx-auto border-2 ${contact.status === 'active' ? 'border-green-500' : 'border-red-500'}`}>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Contact Details</h2>
      <div className="space-y-4">
        <p className="text-lg text-gray-700"><strong>Name:</strong> <span className="font-medium">{contact.name}</span></p>
        <p className="text-lg text-gray-700"><strong>Phone:</strong> <span className="font-medium">{contact.phone}</span></p>
        <p className="text-lg text-gray-700"><strong>Email:</strong> <span className="font-medium">{contact.email}</span></p>
        <div className="mt-2">
          <span
            className={`inline-block px-2 py-1 text-sm font-medium rounded-full ${contact.status === 'active' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}
          >
            {contact.status}
          </span>
        </div>
      </div>
      <button
        onClick={onClose}
        className="mt-6 bg-orange-500 text-white px-6 py-2 rounded-lg shadow hover:bg-orange-600 transition duration-300 ease-in-out"
      >
        Close
      </button>
    </div>
  );
};

export default ContactDetails;
