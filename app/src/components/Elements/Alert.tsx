import { useDisclosure } from '@/hooks/useDisclosure';
import clsx from 'clsx';
import * as React from 'react';

const variants = {
  danger: 'bg-red-500 text-white',
  secondary: 'bg-gray-500 text-white',
  success: 'bg-emerald-500 text-white',
  primary: 'bg-red-500 text-white',
  warning: 'bg-amber-500 text-white',
};

export type AlertProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  icon?: React.ReactElement;
  dissmissible?: boolean;
};

export const Alert = ({
  className = '',
  variant = 'primary',
  icon,
  dissmissible = true,
  ...props
}: AlertProps) => {
  const { isOpen, close } = useDisclosure(true);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={clsx(
        'container relative mx-auto mb-4 rounded border-0 px-6 py-4',
        variants[variant],
        className
      )}
    >
      {icon && <span className="mr-5 inline-block align-middle text-xl">{icon}</span>}
      <span className="ml-8 inline-block align-middle">{props.children}</span>
      {dissmissible && (
        <button
          className="absolute left-0 top-0 ml-6 mt-4 bg-transparent text-2xl font-semibold leading-none outline-none focus:outline-none"
          onClick={() => close()}
        >
          <span>×</span>
        </button>
      )}
    </div>
  );
};

Alert.displayName = 'Alert';
