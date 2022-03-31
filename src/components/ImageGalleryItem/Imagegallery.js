import React from 'react';
import ImageGalleryWrap from './imagegallery.styled';


export default function ImageGallery() {
  const children = this.props.children;
  return (
    <ImageGalleryWrap>
      {children}
    </ImageGalleryWrap>
  );
}
