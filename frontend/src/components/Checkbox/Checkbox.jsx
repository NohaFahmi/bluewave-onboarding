import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';

const CustomCheckbox = ({
  label,
  checked,
  onChange,
  variant,
  className,
  style,
  size,
  indeterminate,
  childrenCheckboxes,
}) => {
  const [childChecked, setChildChecked] = useState(childrenCheckboxes.map(() => false));

  const handleParentChange = (event) => {
    const newChecked = event.target.checked;
    setChildChecked(childrenCheckboxes.map(() => newChecked));
    onChange(event);
  };

  const handleChildChange = (index) => (event) => {
    const newChecked = [...childChecked];
    newChecked[index] = event.target.checked;
    setChildChecked(newChecked);
  };

  const isIndeterminate = childChecked.some((child) => child !== childChecked[0]);

  const getCheckboxStyle = () => {
    if (variant === 'primary') {
      return {
        color: 'var(--main-purple)',
        '&.Mui-checked': {
          color: 'var(--main-purple)',
        },
        '&.MuiCheckbox-indeterminate': {
          color: 'var(--main-purple)',
        },
      };
    }
    if (variant === 'secondary') {
      return {
        color: '#808080E5',
        '&.Mui-checked': {
          color: '#808080E5',
        },
        '&.MuiCheckbox-indeterminate': {
          color: '#808080E5',
        },
      };
    }
    return {};
  };

  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            checked={childrenCheckboxes.length > 0 ? childChecked.every(Boolean) : checked}
            onChange={childrenCheckboxes.length > 0 ? handleParentChange : onChange}
            indeterminate={indeterminate || isIndeterminate}
            size={size}
            sx={getCheckboxStyle()}
            className={`checkbox ${className}`}
          />
        }
        label={label}
        style={style}
      />
      {childrenCheckboxes.length > 0 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
          {childrenCheckboxes.map((childLabel, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={childChecked[index]}
                  onChange={handleChildChange(index)}
                  size={size}
                  sx={getCheckboxStyle()}
                />
              }
              label={childLabel}
            />
          ))}
        </Box>
      )}
    </div>
  );
};

CustomCheckbox.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary']),
  className: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  indeterminate: PropTypes.bool,
  childrenCheckboxes: PropTypes.arrayOf(PropTypes.string),
};

CustomCheckbox.defaultProps = {
  variant: 'primary',
  className: '',
  style: {},
  size: 'medium',
  indeterminate: false,
  childrenCheckboxes: [],
};

export default CustomCheckbox;