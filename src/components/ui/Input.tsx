import React, { forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = '', ...props }, ref) => {
    const inputWrapperStyles = 'relative';
    
    const inputStyles = `
      block w-full rounded-md border px-4 py-3 text-sm transition duration-150
      shadow-sm focus:shadow-input-focus outline-none
      ${error 
        ? 'border-error-400 focus:border-error-500 focus:ring-error-500' 
        : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500'}
      ${icon ? 'pl-11' : 'pl-4'}
      ${className}
    `;
    
    const iconStyles = 'absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400';
    
    return (
      <div className="mb-4">
        {label && (
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            {label}
          </label>
        )}
        
        <div className={inputWrapperStyles}>
          {icon && <div className={iconStyles}>{icon}</div>}
          <input
            ref={ref}
            className={inputStyles}
            {...props}
          />
        </div>
        
        {error && (
          <p className="mt-1 text-sm text-error-500 animate-fade-in">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;