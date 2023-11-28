// contacts.js

const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

function listContacts() {
  return fs.readFile(contactsPath, 'utf-8')
    .then(data => JSON.parse(data))
    .catch(error => []);
}

function getContactById(contactId) {
  return listContacts()
    .then(contacts => contacts.find(contact => contact.id === contactId) || null);
}

function removeContact(contactId) {
  return listContacts()
    .then(contacts => {
      const updatedContacts = contacts.filter(contact => contact.id !== contactId);
      return fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2))
        .then(() => contacts.find(contact => contact.id === contactId) || null);
    });
}

function addContact(name, email, phone) {
  return listContacts()
    .then(contacts => {
      const newContact = { id: Date.now(), name, email, phone };
      const updatedContacts = [...contacts, newContact];
      return fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2))
        .then(() => newContact);
    });
}

module.exports = { listContacts, getContactById, removeContact, addContact };
