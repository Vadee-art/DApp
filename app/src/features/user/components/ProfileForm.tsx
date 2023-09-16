import * as z from 'zod';

import { Form, InputField } from '@/components/Form';
import { Button } from '@/components/Elements';
import { User } from '../types';

const schema = z.object({
  address: z.string().min(1).max(255),
  country: z.string().min(1).max(255),
  province: z.string().min(1).max(255),
  city: z.string().min(1).max(255),
  postalCode: z.string().min(1).max(255),
  phoneNumber: z.string().min(1).max(255),
  email: z.string().min(1).max(255).email(),
});

type ProfileValues = {
  address: string;
  country: string;
  province: string;
  city: string;
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
        {({ register, formState }) => (
          <>
            <InputField
              autoFocus
              type="text"
              label="Address Line"
              error={formState.errors['address']}
              registration={register('address')}
            />
            <div className='flex gap-4'>
              <InputField
                type="text"
                label="Country"
                error={formState.errors['country']}
                registration={register('country')}
              />
              <InputField
                type="text"
                label="State"
                error={formState.errors['province']}
                registration={register('province')}
              />
            </div>
            <div className='flex gap-4'>
              <InputField
                type="text"
                label="City"
                error={formState.errors['city']}
                registration={register('city')}
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
        )}
      </Form>
    </div>
  );
};

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