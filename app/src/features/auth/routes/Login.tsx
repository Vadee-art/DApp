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
      <h3 className="text-center text-gray-400 font-semibold mb-6">Login</h3>
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
            <Button type="submit" variant="primary" className="w-full mt-8" isLoading={isLoading}>
              Login
            </Button>
          </>
        )}
      </Form>
      <div className="text-sm text-gray-500 mt-4">
        Don't have an account?{' '}
        <Link to="/auth/register" className="text-teal-500">
          Sign up
        </Link>
      </div>
    </AuthLayout>
  );
};
