import clsx from 'clsx';
import * as React from 'react';
import Spinner from 'react-spinners/PulseLoader';

const variants = {
  primary: 'bg-black text-white',
  inverse: 'bg-white text-gray-500 border border-gray',
  danger: 'bg-red-500 text-white',
  secondary: 'bg-gray-500 text-white',
  success: 'bg-emerald-500 text-white',
  warning: 'bg-amber-500 text-white',
  stone: 'bg-stone-500 text-white',
};

const sizes = {
  xs: 'py-1 px-3 text-xs',
  sm: 'py-1 px-4 text-sm',
  md: 'py-1 px-6 text-md',
  lg: 'py-2 px-8 text-lg',
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  isLoading?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = 'button',
      className = '',
      variant = 'primary',
      size = 'md',
      isLoading = false,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={clsx(
          'flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed shadow-sm font-medium focus:outline-none hover:opacity-80',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Spinner color="white" className={size === 'lg' ? 'py-2' : 'py-1'} size={12} />
        ) : (
          <span>{props.children}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
