import React, { Component } from 'react';
import { GalleryItem, Image } from './galleryItem.styled';
import PropTypes from 'prop-types';

export default class ImageGalleryItem extends Component {
  onImageClick = (event, imageURL) => {
    this.props.onImageClick(imageURL);
  };

  render() {
    const { image } = this.props;
    return (
      <GalleryItem>
        <Image
          alt={image.tags}
          src={image.webformatURL}
          onClick={event => this.onImageClick(event, image.largeImageURL)}
          loading="lazy"
        />
      </GalleryItem>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
  }).isRequired,
  onImageClick: PropTypes.func.isRequired,
};
