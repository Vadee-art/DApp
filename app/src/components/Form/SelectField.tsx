import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';

type SelectOption = {
  value: string | number;
  label: string;
};

type SelectFieldProps = FieldWrapperPassThroughProps & {
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
  hidden?: boolean;
  registration: Partial<UseFormRegisterReturn>;
  isLoading?: boolean;
  disabled?: boolean;
  options: SelectOption[];
};

export const SelectField = (props: SelectFieldProps) => {
  const {
    label,
    className,
    registration,
    error,
    autoFocus = false,
    hidden = false,
    isLoading = false,
    disabled = false,
    options,
  } = props;
  
  if (isLoading) {
    return <FieldWrapper>
      <div className='bg-gray-200 rounded-sm h-12 w-full animate-pulse' />
    </FieldWrapper>
  }

  return (
    <FieldWrapper error={error} hidden={hidden}>
      <div className="relative">
        <CustomSelect
          id={registration.name}
          autoFocus={autoFocus}
          placeholder={label}
          disabled={isLoading || disabled}
          className={clsx(error && 'border-red-300 focus:border-red-300', className)}
          options={options}
          registration={registration}
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

export const CustomSelect = ({
  options,
  registration = {},
  ...props
}: {
  options: SelectOption[];
  registration?: Partial<UseFormRegisterReturn>;
} & React.SelectHTMLAttributes<HTMLSelectElement>) => {
  return (
    <select
      {...props}
      {...registration}
      className={clsx(
        'peer block w-full border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 placeholder-transparent focus:border-blue-600 focus:outline-none focus:ring-0',
        props.className
      )}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};