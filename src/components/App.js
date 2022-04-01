import React, { Component } from 'react';
import SearchBar from './searchbar/Searchbar.js';
import ImageGallery from './imageGallery/Imagegallery.js';

class App extends Component {
  state = {
    images: [],
    isLoading: false,
    url: '',
    page: 1,

  };

  onSearchSubmit = (newURL) => {
    this.setState({ url: (newURL + `&page=${this.state.page}`) });
    setTimeout(() => this.fetchImages(this.state.url));
  }

  async fetchImages(url) {
    this.setState({ isLoading: true });
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      images: data.hits,
      isLoading: false,
      page: this.state.page + 1,
    });
  }


  render() {
    return (
      <>
        <SearchBar onSubmit={this.onSearchSubmit} />
        <ImageGallery images={this.state.images} />
      </>
    );
  }
}

export default App;
