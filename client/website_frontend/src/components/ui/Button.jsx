import React from 'react';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

function ReusableButton({
  text,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  fullWidth = false,
  onClick,
}) {
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      fullWidth={fullWidth}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}

ReusableButton.propTypes = {
  text: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['text', 'outlined', 'contained']),
  color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary', 'success', 'error', 'info', 'warning']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func,
};

export default ReusableButton;
