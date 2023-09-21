import * as z from 'zod';

import { Form, InputField } from '@/components/Form';
import { Button } from '@/components/Elements';
import { User } from '../types';
import { SelectField } from '@/components/Form/SelectField';
import { useGetCountries } from '@/features/geo/api/getCountries';
import { FormState, UseFormRegister } from 'react-hook-form';
import { useGetRegions } from '@/features/geo/api/getRegions';
import { useGetCities } from '@/features/geo/api/getCities';

const schema = z.object({
  address: z.string().min(1).max(255),
  country: z.number().min(1),
  province: z.number().min(1),
  city: z.number().min(1),
  postalCode: z.string().min(1).max(255),
  phoneNumber: z.string().min(1).max(255),
  email: z.string().min(1).max(255).email(),
});

type ProfileValues = {
  address: string;
  country: number;
  province: number;
  city: number;
  postalCode: string;
  phoneNumber: string;
  email: string;
};

type ProfileFormProps = {
  onSubmit: (values: ProfileValues) => Promise<User>;
  isLoading: boolean;
  defaultValues?: ProfileValues;
};

export const ProfileForm = ({ onSubmit, isLoading, defaultValues }: ProfileFormProps) => {
  
  return (
    <div>
      <Form<ProfileValues, typeof schema> onSubmit={onSubmit} schema={schema} options={{defaultValues}}>
        {({ register, formState, watch }) => (
          <MyForm register={register} formState={formState} watch={watch} isLoading={isLoading} />
        )}
      </Form>
    </div>
  );
};

type MyFormProps = {
  register: UseFormRegister<ProfileValues>;
  formState: FormState<ProfileValues>;
  watch: any;
  isLoading: boolean;
};

const MyForm = ({ register, formState, watch, isLoading }: MyFormProps) => {
  const country = watch('country');
  const region = watch('province');
  const { data: countries, isLoading: countriesLoading } = useGetCountries({});
  const { data: regions, isLoading: regionsLoading } = useGetRegions({
    country: country
  }, { enabled: !!country })
  const { data: cities, isLoading: citiesLoading } = useGetCities({
    country: country,
    region: region
  }, { enabled: !!country && !!region })

  return (
          <>
            <InputField
              autoFocus
              type="text"
              label="Address Line"
              error={formState.errors['address']}
              registration={register('address')}
            />
            <div className='flex gap-4'>
              <SelectField
                label="Country"
                error={formState.errors['country']}
                registration={register('country', {valueAsNumber: true})}
                isLoading={countriesLoading}
                options={[{label: 'select', value: 0}].concat(countries?.results.map((c) => ({
                  label: c.name,
                  value: c.id,
                })) || [])}
              />
              <SelectField
                label="State"
                error={formState.errors['province']}
                registration={register('province', {valueAsNumber: true})}
                isLoading={regionsLoading}
                options={[{label: 'select', value: 0}].concat(regions?.results.map((r) => ({
                  label: r.displayName,
                  value: r.id,
                })) || [])}
              />
            </div>
            <div className='flex gap-4'>
              <SelectField
                label="City"
                error={formState.errors['city']}
                registration={register('city', {valueAsNumber: true})}
                isLoading={citiesLoading}
                options={[{label: 'select', value: 0}].concat(cities?.results.map((c) => ({
                  label: c.displayName,
                  value: c.id,
                })) || [])}
              />
              <InputField
                type="text"
                label="Postal code/Zip"
                error={formState.errors['postalCode']}
                registration={register('postalCode')}
              />
            </div>
            <InputField
              type="text"
              label="Phone number"
              error={formState.errors['phoneNumber']}
              registration={register('phoneNumber')}
            />
            <InputField
              type="text"
              label="Change email"
              error={formState.errors['email']}
              registration={register('email')}
            />
            <Button type="submit" variant="primary" className="mt-8 w-full" isLoading={isLoading}>
              Save
            </Button>
          </>

  )
}

export const ProfileFormSkeleton = () => {
  return (
    <div className='w-full animate-pulse'>
      <div className="flex flex-col gap-4">
        <div className='h-12 w-ull bg-gray-200' />
        <div className='flex gap-4'>
          <div className='flex-1 h-12 w-ull bg-gray-200' />
          <div className='flex-1 h-12 w-ull bg-gray-200' />
        </div>
        <div className='flex gap-4'>
            <div className='flex-1 h-12 w-ull bg-gray-200' />
            <div className='flex-1 h-12 w-ull bg-gray-200' />
        </div>
        <div className='h-12 w-ull bg-gray-200' />
        <div className='h-12 w-ull bg-gray-200' />
        <div className='h-8 w-ull bg-gray-200 mt-4' />
      </div>
    </div>
  );
}