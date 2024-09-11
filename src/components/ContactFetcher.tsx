import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setContacts } from '../features/contacts/contactSlice';
import { Contact } from '../features/contacts/contactSlice';

const fetchContacts = async (): Promise<Contact[]> => {
  const response = await fetch('/api/contacts');
  if (!response.ok) {
    throw new Error('Failed to fetch contacts');
  }
  return response.json();
};

const ContactFetcher: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contacts = await fetchContacts();
        console.log('Fetched Contacts:', contacts);
        dispatch(setContacts(contacts));
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    getContacts();
  }, [dispatch]);

  return null; 
};

export default ContactFetcher;
