import React, { Component } from 'react';
import FadeLoader from 'react-spinners/FadeLoader';
import SearchBar from './searchbar/Searchbar.js';
import ImageGallery from './imageGallery/Imagegallery.js';
import Modal from './modal/Modal.js';
import MoreImagesButton from './button/Button.js';
import { ModalImage } from './imageGallery/imageGalleryItem/galleryItem.styled';
class App extends Component {
  state = {
    idle: true,
    pending: false,
    rejected: false,
    resolved: false,
    error: null,

    images: [],
    showBtnMore: false,
    url: '',
    page: 1,
    showModal: false,
    modalContent: '',
  };
  baseURL =
    'https://pixabay.com/api/?key=25600695-4ceee91aa58c1079792de0ba1&image_type=photo&';

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.url !== this.state.url
    ) {
      setTimeout(() => {
        this.fetchImages(this.state.url + `&page=${this.state.page}`);
      });
    }
  }

  onSearchSubmit = searhQuery => {
    this.setState({
      url: this.baseURL + 'q=' + searhQuery,
      images: [],
    });
  };

  async fetchImages(url) {
    this.setState({
      idle: false,
      pending: true,
      rejected: false,
    });
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        if (data.hits.length === 0) {
          this.setState({
            pending: false,
            rejected: true,
            resolved: false,
            showBtnMore: false,
            error: 'No images were found',
          });
        } else {
          if (data.hits.length < 20) {
            this.setState({
              showBtnMore: false,
            });
          } else {
            this.setState({
              showBtnMore: true,
            });
          }
          this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
            pending: false,
            resolved: true,
            error: '',
          }));
        }
      } else {
        this.setState({
          error: 'Something went wrong',
          pending: false,
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
  };

  onImageClick = imageURL => {
    this.setState({
      showModal: true,
      modalContent: imageURL,
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const {
      idle,
      pending,
      rejected,
      error,
      images,
      showModal,
      modalContent,
      showBtnMore,
    } = this.state;

    return (
      <>
        <SearchBar onSubmit={this.onSearchSubmit} />
        {idle && <h3>Enter what you want to find</h3>}
        {images ? (
          <ImageGallery
            images={this.state.images}
            showModal={this.toggleModal}
            onImageClick={this.onImageClick}
          />
        ) : null}
        {pending && (
          <Modal>
            <FadeLoader />
          </Modal>
        )}
        {showBtnMore ? <MoreImagesButton onClick={this.onButtonClick} /> : null}
        {rejected && <h3>{error}</h3>}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <ModalImage src={modalContent} alt="bigImage" />
          </Modal>
        )}
      </>
    );
  }
}
export default App;
