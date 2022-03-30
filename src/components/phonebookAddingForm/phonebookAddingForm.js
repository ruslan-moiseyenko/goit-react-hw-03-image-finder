import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { FormPhoneBook, FormInput } from './FormPhoneBook.styled';

class PhonebookAddingForm extends Component {
  state = {
    id: '',
    name: '',
    number: ''
  };

  handleChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    let currentState = this.state;
    currentState.id = nanoid();
    this.props.onSubmit(currentState);
    this.reset();
  };

  reset = () => {
    this.setState({
      id: '',
      name: '',
      number: '',
    });
  };

  render() {
    return (
      <FormPhoneBook onSubmit={this.handleSubmit}>
        <label>
          Name
          <FormInput
            type="text"
            name="name"
            value={this.state.name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.handleChange}
          />
          <br />
          <label>
            Phone
            <FormInput
              type="tel"
              name="number"
              value={this.state.number}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              onChange={this.handleChange}
            />
          </label>
          <br />
          <button
            type="submit"
            name="button Add"
          // onClick={e => console.log(nanoid())}
          >
            Add contact
          </button>
        </label>
      </FormPhoneBook>
    );
  }
}

export default PhonebookAddingForm;
