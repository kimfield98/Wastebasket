import * as React from 'react';

import { cn } from '@/lib/utils';

interface CustomInputProps {
  errors?: string[];
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    CustomInputProps {
  name: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ name, errors = [], className, type, ...props }, ref) => {
    console.log('Input', name, errors);
    return (
      <div>
        <input
          name={name}
          type={type}
          className={cn(
            'flex h-14 w-80 rounded-md border border-input bg-background my-2 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          {...props}
        />
        {errors && errors.length > 0 && (
          <ul className='text-red-500 text-sm'>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
