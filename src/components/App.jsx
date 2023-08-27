import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm';
import { Filter } from './Filter';
import { Contacts } from './Contacts';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  formSubmitHandler = e => {
    const id = nanoid();
    const name = e.name;
    const number = e.number;
    const contacts = [...this.state.contacts];

    if (contacts.findIndex(contact => name === contact.name) !== -1) {
      alert(`${name} is already in contacts.`);
    } else {
      contacts.push({ name, id, number });
    }
    this.setState({ contacts: contacts });
  };

  handleChange = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  handleDelete = e => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(({ id }) => id !== e),
    }));
  };

  filterContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler} />
        <h2>Contacts</h2>
        <Filter filter={this.state.filter} handleChange={this.handleChange} />
        <Contacts
          contacts={this.filterContacts()}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}
