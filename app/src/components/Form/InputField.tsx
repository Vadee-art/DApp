import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';

type InputFieldProps = FieldWrapperPassThroughProps & {
  type?: 'text' | 'email' | 'password' | 'number' | 'textarea';
  placeholder?: string;
  maxLength?: number;
  className?: string;
  autoFocus?: boolean;
  hidden?: boolean;
  registration: Partial<UseFormRegisterReturn>;
};

export const InputField = (props: InputFieldProps) => {
  const {
    type = 'text',
    label,
    placeholder,
    className,
    registration,
    error,
    maxLength,
    autoFocus = false,
    hidden = false,
  } = props;
  if (type === 'textarea') {
    return (
      <FieldWrapper label={label} error={error} hidden={hidden}>
        <textarea
          autoFocus={autoFocus}
          placeholder={placeholder}
          maxLength={maxLength}
          className={clsx(
            `border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150 w-full ${
              error && 'ring-red-300'
            }`,
            className
          )}
          {...registration}
        />
      </FieldWrapper>
    );
  }
  return (
    <FieldWrapper label={label} error={error} hidden={hidden}>
      <input
        autoFocus={autoFocus}
        placeholder={placeholder}
        type={type}
        maxLength={maxLength}
        className={clsx(
          `border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150 w-full ${
            error && 'ring-red-300'
          }`,
          className
        )}
        {...registration}
      />
    </FieldWrapper>
  );
};
