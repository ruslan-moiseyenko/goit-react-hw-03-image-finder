import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './searchbar.sytled';

class SearchBar extends Component {
  state = {
    query: '',
  };

  baseURL =
    'https://pixabay.com/api/?key=25600695-4ceee91aa58c1079792de0ba1&image_type=photo&';

  searchHandler = e => {
    e.preventDefault();
    const { query } = this.state;
    let normalizedQuery = query
      .trim()
      .toLowerCase()
      .split(' ')
      .join('+');
    this.props.onSubmit(normalizedQuery);
  };

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <header className="searchbar">
        <SearchForm className="form" onSubmit={this.searchHandler}>
          <SearchFormButton type="submit" className="button">
            <span className="button-label">Search</span>
          </SearchFormButton>

          <SearchFormInput
            className="input"
            name="query"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </SearchForm>
      </header>
    );
  }
}

export default SearchBar;

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
