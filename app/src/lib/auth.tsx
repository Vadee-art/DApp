import {
  MutationFunction,
  QueryFunction,
  QueryKey,
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from 'react-query';
import { AuthUser, LoginCredentials, login } from '@/features/auth';
import React from 'react';
import storage from '@/utils/storage';

async function handleUserResponse(data: AuthUser) {
  storage.setUser(data);
  return data;
}

async function userFn() {
  if (storage.getUser()) {
    return storage.getUser();
  }
  return null;
}

async function loginFn(data: LoginCredentials) {
  const response = await login(data);
  return await handleUserResponse(response);
}

async function logoutFn() {
  storage.clearUser();
  window.location.assign(window.location.origin as unknown as string);
}

export interface ReactQueryAuthConfig<User, LoginCredentials, RegisterCredentials> {
  userFn: QueryFunction<User, QueryKey>;
  loginFn: MutationFunction<User, LoginCredentials>;
  registerFn: MutationFunction<User, RegisterCredentials>;
  logoutFn: MutationFunction<unknown, unknown>;
  userKey?: QueryKey;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

const userKey = ['authenticated-user'];

const useUser = (
  options?: Omit<UseQueryOptions<unknown, Error, AuthUser, QueryKey>, 'queryKey' | 'queryFn'>
) => useQuery(userKey, userFn, options);

const useLogin = (
  options?: Omit<UseMutationOptions<AuthUser, Error, LoginCredentials>, 'mutationFn'>
) => {
  const queryClient = useQueryClient();

  const setUser = React.useCallback(
    (data: AuthUser) => queryClient.setQueryData(userKey, data),
    [queryClient]
  );

  return useMutation({
    mutationFn: loginFn,
    ...options,
    onSuccess: (user, ...rest) => {
      setUser(user);
      options?.onSuccess?.(user, ...rest);
    },
  });
};

const useLogout = (options?: UseMutationOptions<unknown, Error, unknown>) => {
  const queryClient = useQueryClient();

  const setUser = React.useCallback(
    (data: AuthUser | null) => queryClient.setQueryData(userKey, data),
    [queryClient]
  );

  return useMutation({
    mutationFn: logoutFn,
    ...options,
    onSuccess: (...args) => {
      setUser(null);
      options?.onSuccess?.(...args);
    },
  });
};

function AuthLoader({
  children,
  renderLoading,
  renderUnauthenticated,
}: {
  children: React.ReactNode;
  renderLoading: () => JSX.Element;
  renderUnauthenticated?: () => JSX.Element;
}) {
  const { isSuccess, isFetched, status, data } = useUser();

  if (isSuccess) {
    if (renderUnauthenticated && !data) {
      return renderUnauthenticated();
    }
    return <>{children}</>;
  }

  if (!isFetched) {
    return renderLoading();
  }

  return <div>Unhandled status: {status}</div>;
}

export { useUser, useLogin, useLogout, AuthLoader };
