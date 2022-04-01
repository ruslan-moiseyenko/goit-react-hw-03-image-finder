import React from 'react';
import { GalleryItem, Image } from './galleryItem.styled';


export default function ImageGalleryItem({ images }) {
  return (
    images.map(({ id, webformatURL, largeImageURL, tags }) => (
      <GalleryItem key={id} className="gallery-item">
        <Image src={webformatURL} alt={tags} loading="lazy" />
      </GalleryItem>
    ))
  );
}
