import * as React from 'react';

import logo from '@/assets/img/VADEE_Logo.png';

type LayoutProps = {
  children: React.ReactNode;
};

export const AuthLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="sm:mx-auto sm:w-full sm:max-w-md mb-2">
              <div className="flex justify-center relative">
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
