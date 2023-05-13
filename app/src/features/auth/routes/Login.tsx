import * as z from 'zod';

import { Form, InputField } from "@/components/Form";
import { AuthLayout } from "../components/AuthLayout";
import { useLogin } from '@/lib/auth';
import { Button } from '@/components/Elements';

const schema = z.object({
  email: z.string().min(1).max(255).email(),
  password: z.string().min(8).max(255)
});

type LoginValues = {
  email: string;
  password: string;
};

export const Login = () => {
  const {mutateAsync: login, isLoading} = useLogin();

  const onSubmit = async (values: LoginValues) => {
    await login(values);
    console.log('success');
  };

  return (
    <AuthLayout>
      <h3 className='text-center text-gray-400 font-semibold mb-6'>
        Login
      </h3>
      <Form<LoginValues, typeof schema>
        onSubmit={onSubmit}
        schema={schema}
      >
        {({ register, formState }) => (
          <>
            <InputField
              autoFocus
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
            <Button type='submit' variant='primary' className='w-full mt-8' isLoading={isLoading}>Login</Button>
          </>
        )}
      </Form>
    </AuthLayout>
  )
};