import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryWrap } from './imagegallery.styled';
import ImageGalleryItem from './imageGalleryItem/ImageGalleryItem';

export default function ImageGallery({ images, onImageClick }) {
  return (
    <ImageGalleryWrap>
      {images.length > 0 &&
        images.map(image => (
          <ImageGalleryItem
            key={image.id}
            image={image}
            onImageClick={onImageClick}
          />
        ))}
    </ImageGalleryWrap>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  onImageClick: PropTypes.func.isRequired,
};
