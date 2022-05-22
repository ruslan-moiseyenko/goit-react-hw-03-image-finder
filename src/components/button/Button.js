import React from 'react';
import PropTypes from 'prop-types';
import { MoreImagesButton, ButtonWrapper } from './button.sytled';

export default function ButtonAddImages({ onClick }) {
  return (
    <ButtonWrapper>
      <MoreImagesButton type="button" onClick={onClick}>
        More Images
      </MoreImagesButton>
    </ButtonWrapper>
  );
}

ButtonAddImages.propTypes = {
  onClick: PropTypes.func.isRequired,
};
