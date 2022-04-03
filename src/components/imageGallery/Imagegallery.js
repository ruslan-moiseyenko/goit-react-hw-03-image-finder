import React from 'react';
import { ImageGalleryWrap } from './imagegallery.styled';
import ImageGalleryItem from './imageGalleryItem/ImageGalleryItem';



export default function ImageGallery({ images, onImageClick }) {
  return (
    <ImageGalleryWrap>
      {images.length > 0 &&
        <ImageGalleryItem images={images} onImageClick={onImageClick} />}
    </ImageGalleryWrap>
  );
}
