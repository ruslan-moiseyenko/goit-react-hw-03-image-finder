import React, { Component } from 'react';
import { GalleryItem, Image } from './galleryItem.styled';


export default class ImageGalleryItem extends Component {

  onImageClick = (event, imageURL) => {
    this.props.onImageClick(imageURL);

  }


  render() {
    const { images } = this.props;
    return (

      images.map(image => (
        <GalleryItem key={image.id}>
          <Image alt={image.tags} src={image.webformatURL} onClick={(event) => this.onImageClick(event, image.largeImageURL)} loading="lazy" />
        </GalleryItem>
      ))

    );
  }
}
