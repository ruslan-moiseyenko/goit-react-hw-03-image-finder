import React, { Component } from 'react';
import SearchBar from './searchbar/Searchbar.js';
import ImageGallery from './imageGallery/Imagegallery.js';
import Modal from './modal/Modal.js';
import MoreImagesButton from './button/Button.js';
import { ModalImage } from './imageGallery/imageGalleryItem/galleryItem.styled';


class App extends Component {
  state = {
    idle: true,
    panding: false,
    rejected: false,
    resolved: false,
    error: null,

    images: [],
    url: '',
    page: 1,
    showModal: false,
    modalContent: '',

  };

  onSearchSubmit = (newURL) => {
    this.setState({
      url: (newURL),
      images: []
    });
    setTimeout(() => {
      this.fetchImages(this.state.url + `&page=${this.state.page}`);
    });
  }

  async fetchImages(url) {
    this.setState({
      idle: false,
      panding: true,
      rejected: false,
    });
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        if (data.hits.length === 0) {
          this.setState({
            panding: false,
            rejected: true,
            resolved: false,
            error: 'No images were found',
          });
        } else {
          this.setState((prevState) => ({
            images: [...prevState.images, ...data.hits],
            panding: false,
            resolved: true
            // page: this.state.page + 1,
          }));
        }
      } else {
        this.setState({
          error: 'Something went wrong',
          panding: false,
          rejected: true,
        });
      }

    } catch (err) {
      console.log(err.message);
      this.setState({ rejected: true, error: err });
    }
  }

  onButtonClick = () => {
    const newPage = this.state.page + 1;
    this.setState({ page: newPage });
    setTimeout(() => {
      this.fetchImages(this.state.url + `&page=${this.state.page}`);
    });
  }

  onImageClick = (imageURL) => {
    this.setState({
      showModal: true,
      modalContent: imageURL
    });
  }


  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  }


  render() {
    const { idle, panding, rejected, resolved, error, images, showModal, modalContent } = this.state;

    return (
      <>
        <SearchBar onSubmit={this.onSearchSubmit} />
        {idle && <h3>Enter what you want to find</h3>}
        {resolved && <ImageGallery images={this.state.images} showModal={this.toggleModal} onImageClick={this.onImageClick} />}
        {panding && <h3>Loading...</h3>}
        {images.length ? <MoreImagesButton onClick={this.onButtonClick} /> : null}
        {rejected && <h3>{error}</h3>}
        {showModal && <Modal onClose={this.toggleModal}>
          <ModalImage src={modalContent} alt="bigImage" />
        </Modal>}
      </>
    );

    // if (idle) {
    //   return (
    //     <>
    //       <SearchBar onSubmit={this.onSearchSubmit} />
    //       <h3>Enter what you want to find</h3>
    //     </>
    //   );
    // }

    // if (resolved) {
    //   return (
    //     <>
    //       <SearchBar onSubmit={this.onSearchSubmit} />
    //       <ImageGallery images={this.state.images} showModal={this.toggleModal} onImageClick={this.onImageClick} />
    //       {images.length ? <MoreImagesButton onClick={this.onButtonClick} /> : null}
    //     </>
    //   );
    // }


    // if (rejected) {
    //   return (
    //     <>
    //       <SearchBar onSubmit={this.onSearchSubmit} />
    //       <h3>{error}</h3>
    //     </>
    //   );
    // }

    // if (panding) {
    //   return (
    //     <>
    //       <SearchBar onSubmit={this.onSearchSubmit} />
    //       <h3>Loading...</h3>
    //     </>
    //   );
    // }


    // if (showModal) {
    //   console.log('Modal should appear');
    //   return (
    //     <Modal onClose={this.toggleModal}>
    //       <img src={modalContent} alt="bigImage" />
    //     </Modal>
    //   );
    // }
  }
}
export default App;
