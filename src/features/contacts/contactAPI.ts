export interface Contact {
    id: string;
    name: string;
    phone: string;
    email: string;
  }
  
  export const createContact = async (contact: Contact) => {
    const response = await fetch('/api/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    });
    return response.json();
  };
  
  export const fetchContacts = async () => {
    const response = await fetch('/api/contacts');
    return response.json();
  };
  