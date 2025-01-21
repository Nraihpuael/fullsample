import React from 'react';
import { SearchIcon } from '../../assets/icons';
import '../../styles/components/ui/input.css';

const InputColor = React.forwardRef(
  (
    {
      label,
      name,
      icon,
      type = 'text',
      isError = false,
      errorMessage,
      className = '',
      required = false,
      ...props
    },
    ref
  ) => {
    return (
      <div className={`inputWithLabel ${className}`}>
        <label htmlFor={name} className='inputLabel'>
          {label} {required && <span className='requiredIndicator'>*</span>}
        </label>
        <div className='inputContainer'>
          {icon && (
            <span className='inputIcon'>
              <SearchIcon />
            </span>
          )}

          <input
            ref={ref}
            type={type}
            name={name}
            className={`input-color ${icon ? 'inputIconPosition' : ''}`}
            {...props}
          />
        </div>
        {isError && <span className='errorMessage'>*{errorMessage}</span>}
      </div>
    );
  }
);
InputColor.displayName = 'InputColor';

export default InputColor;
