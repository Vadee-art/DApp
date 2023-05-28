import * as z from 'zod';

import { Form, InputField } from "@/components/Form";
import { AuthLayout } from "../components/AuthLayout";
import { Button } from '@/components/Elements';
import { useRegister } from '..';
import { Link } from 'react-router-dom';

const schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().min(1, 'Email is required').max(255).email(),
  password: z.string().min(8, 'Password must be at least 8 characters.').max(255)
});

type RegisterValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const Register = () => {
  const {mutateAsync: register, isLoading} = useRegister(() => {console.log('success')});

  const onSubmit = async (values: RegisterValues) => {
    await register({
      ...values,
      userName: values.email,
    });
  };

  return (
    <AuthLayout>
      <h3 className='text-center text-gray-400 font-semibold mb-6'>
        Sign up
      </h3>
      <Form<RegisterValues, typeof schema>
        onSubmit={onSubmit}
        schema={schema}
      >
        {({ register, formState }) => (
          <>
            <InputField
              autoFocus
              type="text"
              label="First name"
              error={formState.errors['firstName']}
              registration={register('firstName')}
            />
            <InputField
              type="text"
              label="Last name"
              error={formState.errors['lastName']}
              registration={register('lastName')}
            />
            <InputField
              type="email"
              label="Email"
              error={formState.errors['email']}
              registration={register('email')}
            />
            <InputField
              type="password"
              label="password"
              error={formState.errors['password']}
              registration={register('password')}
            />
            <Button type='submit' variant='primary' className='w-full mt-8' isLoading={isLoading}>Sign up</Button>
          </>
        )}
      </Form>
      <div className='text-sm text-gray-500 mt-4'>
        Already have an account? <Link to="/auth/login" className='text-teal-500'>Login</Link>
      </div>
    </AuthLayout>
  )
};