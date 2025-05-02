import React, { forwardRef, InputHTMLAttributes } from 'react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className={`flex items-start ${className}`}>
        <div className="flex items-center h-5">
          <input
            ref={ref}
            type="checkbox"
            className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500 transition duration-150 ease-in-out"
            {...props}
          />
        </div>
        <div className="ml-2 text-sm">
          <label className="font-medium text-neutral-700">
            {label}
          </label>
          {error && (
            <p className="mt-1 text-sm text-error-500">
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;