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

  formSubmitHandler = ({ name, number }) => {
    const isDuplicate = this.state.contacts.some(
      contact => name.toLowerCase() === contact.name.toLowerCase()
    );
    if (isDuplicate) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const id = nanoid();

    this.setState(prevState => {
      return { contacts: [...prevState.contacts, { name, id, number }] };
    });
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
