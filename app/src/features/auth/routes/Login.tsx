import * as z from 'zod';

import { Form, InputField } from '@/components/Form';
import { AuthLayout } from '../components/AuthLayout';
import { useLogin } from '@/lib/auth';
import { Button } from '@/components/Elements';
import { Link, useNavigate } from 'react-router-dom';

const schema = z.object({
  email: z.string().min(1).max(255).email(),
  password: z.string().min(8).max(255),
});

type LoginValues = {
  email: string;
  password: string;
};

export const Login = () => {
  const navigate = useNavigate();
  const { mutateAsync: login, isLoading } = useLogin({
    onSuccess: () => {
      navigate('/');
    },
  });

  const onSubmit = async (values: LoginValues) => {
    await login(values);
  };

  return (
    <AuthLayout>
      <h3 className="mb-6 text-center font-semibold text-gray-400">Login</h3>
      <Form<LoginValues, typeof schema> onSubmit={onSubmit} schema={schema}>
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
            <Button type="submit" variant="primary" className="mt-8 w-full" isLoading={isLoading}>
              Login
            </Button>
          </>
        )}
      </Form>
      <div className="mt-4 text-sm text-gray-500">
        Don't have an account?{' '}
        <Link to="/auth/register" className="text-teal-500">
          Sign up
        </Link>
      </div>
    </AuthLayout>
  );
};
