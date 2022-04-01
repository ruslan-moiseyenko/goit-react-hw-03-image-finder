import React from 'react';
import { ImageGalleryWrap } from './imagegallery.styled';
import ImageGalleryItem from './imageGalleryItem/ImageGalleryItem';



export default function ImageGallery({ images }) {
  return (
    <ImageGalleryWrap>
      {images.length > 0 &&
        <ImageGalleryItem images={images} />}
    </ImageGalleryWrap>
  );
}
