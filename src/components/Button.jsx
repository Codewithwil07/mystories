import React from 'react';
import { Button as MUIButton } from '@mui/material';
import PropTypes from 'prop-types';

const Button = ({
  label,
  onClick,
  variant,
  color,
  startIcon,
  endIcon,
  fullWidth,
}) => {
  return (
    <MUIButton
      variant={variant}
      color={color}
      startIcon={startIcon}
      endIcon={endIcon}
      fullWidth={fullWidth}
      onClick={onClick}
        sx={{marginTop: '20px'}}
    >
      {label}
    </MUIButton>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['text', 'outlined', 'contained']),
  color: PropTypes.oneOf([
    'default',
    'primary',
    'secondary',
    'error',
    'info',
    'success',
    'warning',
  ]),
  startIcon: PropTypes.element,
  endIcon: PropTypes.element,
  fullWidth: PropTypes.bool,
};

Button.defaultProps = {
  variant: 'contained',
  color: 'primary',
  onClick: () => {},
  startIcon: null,
  endIcon: null,
  fullWidth: false,
};

export default Button;
