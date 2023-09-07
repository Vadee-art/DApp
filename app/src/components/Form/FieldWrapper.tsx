import clsx from 'clsx';
import * as React from 'react';
import { FieldError } from 'react-hook-form';

type FieldWrapperProps = {
  label?: string;
  className?: string;
  children: React.ReactNode;
  error?: FieldError | undefined;
  description?: string;
  hidden?: boolean;
};

export type FieldWrapperPassThroughProps = Omit<FieldWrapperProps, 'className' | 'children'>;

export const FieldWrapper = (props: FieldWrapperProps) => {
  const { label, className, error, children, hidden } = props;
  return (
    <div className={clsx('mb-5 flex-1', hidden ? 'hidden' : '')}>
      {label ? (
        <label className={clsx('block text-sm font-medium text-gray-700', className)}>
          {label}
          <div className={label && 'mt-1'}>{children}</div>
        </label>
      ) : (
        <div className={label && 'mt-1'}>{children}</div>
      )}
      {error?.message && (
        <div role="alert" aria-label={error.message} className="mt-1 text-xs text-red-500">
          {error.message}
        </div>
      )}
    </div>
  );
};
