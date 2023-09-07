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
              `peer block w-full border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 placeholder-transparent focus:border-blue-600 focus:outline-none focus:ring-0`,
              error && 'border-red-300 focus:border-red-300',
              className
            )}
            {...registration}
          />
          <label
            htmlFor={registration.name}
            className={clsx(
              'absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600',
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
            `peer block w-full border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 placeholder-transparent focus:border-blue-600 focus:outline-none focus:ring-0`,
            error && 'border-red-300 focus:border-red-300',
            className
          )}
          {...registration}
        />
        <label
          htmlFor={registration.name}
          className={clsx(
            'absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600',
            error && 'text-red-300 peer-focus:text-red-600'
          )}
        >
          {label}
        </label>
      </div>
    </FieldWrapper>
  );
};
