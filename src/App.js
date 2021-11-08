import { Component } from 'react';
import shortid from 'shortid';
import CssModule from './IndexModule.css';

import ContactForm from './Componnent/ContactForm';
import ContactList from './Componnent/ListContact';
import Filter from './Componnent/Filtr';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.contacts);
    if (this.state.contacts !== prevState.contacts) {
      localStorage.getItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = task => {
    const taskNameNormalized = task.name.toLowerCase();
    const searchSameName = this.state.contacts.find(
      contact => contact.name.toLowerCase() === taskNameNormalized,
    );

    if (searchSameName) {
      alert(`${task.name} is already in contacts`);
    } else if (task.name.length === 0) {
      alert('Fields must be filled!');
    } else {
      const contact = {
        ...task,
        id: shortid(),
      };

      this.setState(prevState => ({
        contacts: [...prevState.contacts, contact],
      }));
    }
  };
  changeFilter = filter => {
    this.setState({ filter });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(contacts =>
      contacts.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  removeContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      };
    });
  };

  render() {
    const { filter } = this.state;
    const { addContact, changeFilter, removeContact } = this;

    const visibleContacts = this.getVisibleContacts();

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={addContact} />

        <h2>Contacts</h2>
        <Filter value={filter} onChangeFilter={changeFilter} />
        {visibleContacts && (
          <ContactList
            contacts={visibleContacts}
            onRemoveContact={removeContact}
          />
        )}
      </div>
    );
  }
}

export default App;
