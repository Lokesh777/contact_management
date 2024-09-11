import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../features/contacts/contactSlice';
import { RootState } from '../store/store';
import { Contact } from '../features/contacts/contactSlice';
import { FiUser } from 'react-icons/fi';

interface ContactListProps {
  onEditContact: (contact: Contact) => void;
  onViewContact: (contact: Contact) => void; 
}

const ContactList: React.FC<ContactListProps> = ({ onEditContact, onViewContact }) => {
  const dispatch = useDispatch();
  const contacts = useSelector((state: RootState) => state.contacts.contacts);

  if (contacts.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-full mt-10">
        <FiUser className="h-24 w-24 text-gray-400 animate-fade-in" />
        <div className="text-center mt-4">
          <p className="text-2xl font-semibold text-gray-600 animate-fade-in">No contacts found</p>
          <p className="text-gray-500">Please add some contacts to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Contact List</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {contacts.map(contact => (
          <li
            key={contact.id}
            className={`border p-4 rounded-lg shadow-md bg-white cursor-pointer hover:shadow-lg transition-shadow duration-300 ${contact.status === 'active' ? 'border-green-500' : 'border-red-500'}`}
            onClick={() => onViewContact(contact)}
          >
            <p className="text-lg font-semibold">Name: {contact.name}</p>
            <p>Phone: {contact.phone}</p>
            <p>Email: {contact.email}</p>
            <div className="mt-2">
              <span
                className={`inline-block px-2 py-1 text-sm font-medium rounded-full ${contact.status === 'active' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}
              >
                {contact.status}
              </span>
            </div>
            <div className="mt-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(deleteContact(contact.id));
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-105 mr-2"
              >
                Delete
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEditContact(contact);
                }}
                className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
