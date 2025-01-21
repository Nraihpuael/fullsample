import React from 'react';
import '../../styles/components/ui/textarea.css';

const Textarea = React.forwardRef(
    (
      {
        label,
        name,
        isError = false,
        errorMessage,
        className = '',
        required = false,
        rows = 4,
        ...props
      },
      ref
    ) => {
      return (
        <div className={`textareaWithLabel ${className}`}>
          <label htmlFor={name} className='textareaLabel'>
            {label} {required && <span className='requiredIndicator'>*</span>}
          </label>
          <div className='textareaContainer'>
            <textarea
              ref={ref}
              name={name}
              rows={rows}
              className={`textarea ${isError ? 'textareaError' : ''}`}
              {...props}
            ></textarea>
          </div>
          {isError && <span className='errorMessage'>*{errorMessage}</span>}
        </div>
      );
    }
  );
  
  Textarea.displayName = 'Textarea';
  
  export default Textarea;
  