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
    <div className={clsx('container mx-auto px-6 py-4 border-0 rounded relative mb-4', variants[variant], className)}>
      {icon && <span className="text-xl inline-block mr-5 align-middle">{icon}</span>}
      <span className="inline-block align-middle ml-8">{props.children}</span>
      {dissmissible && (
        <button
          className="absolute bg-transparent text-2xl font-semibold leading-none left-0 top-0 mt-4 ml-6 outline-none focus:outline-none"
          onClick={() => close()}
        >
          <span>×</span>
        </button>
      )}
    </div>
  );
};

Alert.displayName = 'Alert';
