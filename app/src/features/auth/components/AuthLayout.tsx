import * as React from 'react';

import logo from '@/assets/img/VADEE_Logo.png';

type LayoutProps = {
  children: React.ReactNode;
};

export const AuthLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <div className="flex min-h-screen flex-col justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
            <div className="mb-2 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="relative flex justify-center">
                <img className="h-9 w-auto" src={logo} alt="Workflow" />
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};
