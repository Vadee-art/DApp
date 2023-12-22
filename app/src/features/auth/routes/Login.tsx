import * as z from 'zod';

import { Form, InputField } from '@/components/Form';
import { AuthLayout } from '../components/AuthLayout';
import { useLogin, useLoginWeb3 } from '@/lib/auth';
import { Button } from '@/components/Elements';
import { Link, useNavigate } from 'react-router-dom';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount, useSignMessage } from 'wagmi';
import { useEffect } from 'react';

const schema = z.object({
  email: z.string().min(1).max(255).email(),
  password: z.string().min(8).max(255),
});

type LoginValues = {
  email: string;
  password: string;
};

const MESSAGE = 'Sign in With Ethereum.';

export const Login = () => {
  const navigate = useNavigate();
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();
  
  const { mutateAsync: login, isLoading } = useLogin({
    onSuccess: () => {
      navigate('/');
    },
  });
  const { mutateAsync: loginWeb3, isLoading: loginWeb3Loading } = useLoginWeb3({
    onSuccess: () => {
      navigate('/');
    },
  });

  const { signMessage, isLoading: signMessageLoading } = useSignMessage({
    message: MESSAGE,
    onSuccess: async (signature) => {
      await loginWeb3({ msg: MESSAGE, sig: signature });
    },
  });

  useEffect(() => {
    if (isConnected) {
      signMessage();
    }
  }, [isConnected]);

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
            <Button variant="secondary" className="mt-2 w-full" isLoading={signMessageLoading || loginWeb3Loading} onClick={() => {
              open();
            }}>
              Connect Wallet
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
