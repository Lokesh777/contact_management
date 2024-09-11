import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addContact, updateContact } from '../features/contacts/contactSlice';
import { Contact } from '../features/contacts/contactSlice';

interface ContactFormProps {
  contactToEdit?: Contact | null;
  onFormSubmit: () => void;
  onClose: () => void;
  theme: 'light' | 'dark';
}

const ContactForm: React.FC<ContactFormProps> = ({ contactToEdit, onFormSubmit, onClose, theme }) => {
  const dispatch = useDispatch();
  const [contact, setContact] = useState<Contact>({
    id: '',
    name: '',
    phone: '',
    email: '',
    status: 'inactive',
  });

  useEffect(() => {
    if (contactToEdit) {
      setContact(contactToEdit);
    } else {
      setContact({
        id: Date.now().toString(), 
        name: '',
        phone: '',
        email: '',
        status: 'inactive',
      });
    }
  }, [contactToEdit]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContact(prev => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (status: 'active' | 'inactive') => {
    setContact(prev => ({ ...prev, status }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!contact.name || !contact.phone || !contact.email) {
      alert('All fields are required!');
      return;
    }

    if (contactToEdit) {
      // Ensure the contact ID is preserved for updates
      dispatch(updateContact(contact));
    } else {
      // Generate a unique ID for the new contact
      dispatch(addContact(contact));
    }

    onFormSubmit();
  };

  const formBgColor = theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800';
  const buttonBgColor = theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600';
  const cancelBgColor = theme === 'dark' ? 'bg-gray-600 hover:bg-gray-700' : 'bg-gray-500 hover:bg-gray-600';

  return (
    <div className="flex justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className={`w-full sm:w-[40vw] p-8 ${formBgColor} max-w-4xl`}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">{contactToEdit ? "Edit Contact" : 'Create Contact'}</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-lg font-medium mb-1">Name:</label>
            <input
              type="text"
              name="name"
              value={contact.name}
              onChange={handleInputChange}
              className="border rounded-lg p-3 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-1">Phone:</label>
            <input
              type="text"
              name="phone"
              value={contact.phone}
              onChange={handleInputChange}
              className="border rounded-lg p-3 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="+1234567890"
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-1">Email:</label>
            <input
              type="email"
              name="email"
              value={contact.email}
              onChange={handleInputChange}
              className="border rounded-lg p-3 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="johndoe@example.com"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="block text-lg font-medium mb-1">Status:</label>
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <input
                  id="status-active"
                  name="status"
                  type="radio"
                  checked={contact.status === 'active'}
                  onChange={() => handleStatusChange('active')}
                  className="radio-btn"
                />
                <label htmlFor="status-active" className="ml-2 text-lg">Active</label>
              </div>
              <div className="flex items-center">
                <input
                  id="status-inactive"
                  name="status"
                  type="radio"
                  checked={contact.status === 'inactive'}
                  onChange={() => handleStatusChange('inactive')}
                  className="radio-btn"
                />
                <label htmlFor="status-inactive" className="ml-2 text-lg">Inactive</label>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className={`w-full py-2 px-4 rounded-lg text-white ${buttonBgColor} transition duration-300 ease-in-out`}
            >
              {contactToEdit ? 'Save Changes' : 'Save Contact'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className={`w-full py-2 px-4 rounded-lg text-white ${cancelBgColor} transition duration-300 ease-in-out`}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
