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
        <div className="relative">
          <textarea
            id={registration.name}
            autoFocus={autoFocus}
            placeholder={placeholder}
            maxLength={maxLength}
            className={clsx(
              `block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent border border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 placeholder-transparent peer`,
              error && 'border-red-300 focus:border-red-300',
              className
            )}
            {...registration}
          />
          <label
            htmlFor={registration.name}
            className={clsx(
              'absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1',
              error && 'text-red-300 peer-focus:text-red-600'
            )}
          >
            {label}
          </label>
        </div>
      </FieldWrapper>
    );
  }
  return (
    <FieldWrapper error={error} hidden={hidden}>
      <div className="relative">
        <input
          id={registration.name}
          autoFocus={autoFocus}
          placeholder={label}
          type={type}
          maxLength={maxLength}
          className={clsx(
            `block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent border border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 placeholder-transparent peer`,
            error && 'border-red-300 focus:border-red-300',
            className
          )}
          {...registration}
        />
        <label
          htmlFor={registration.name}
          className={clsx(
            'absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1',
            error && 'text-red-300 peer-focus:text-red-600'
          )}
        >
          {label}
        </label>
      </div>
    </FieldWrapper>
  );
};
