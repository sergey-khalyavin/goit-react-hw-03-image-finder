import React from "react";
import PropTypes from "prop-types";

import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";

import s from "./ImageGallery.module.css";

const ImageGallery = ({ images, onImageClick }) => (
  <ul className={s.imageGallery}>
    {images.map(({ id, ...prop }) => (
      <ImageGalleryItem key={id} {...prop} onClickLargeImg={onImageClick} />
    ))}
  </ul>
);

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGallery;
