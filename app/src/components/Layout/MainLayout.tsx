import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/assets/img/VADEE_Logo.png';
import { useUser } from '@/lib/auth';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: user } = useUser({});
  return (
    <>
      <nav className="w-full flex flex-wrap items-center justify-between py-2 navbar-expand-lg bg-white">
        <div className="container mx-auto flex flex-wrap items-center justify-between px-4">
          <div className="w-full relative flex justify-between gap-4 lg:static pt-4">
            <Link
              className="text-stone-500 text-xs leading-relaxed inline-block whitespace-nowrap text-center"
              to="/"
            >
              <img src={Logo} alt="RCL Logo" className="max-h-6 mb-2" />
              <span>Let there be art</span>
            </Link>
            <div className="flex items-start flex-1 ">

            <label htmlFor="search" className="relative text-gray-400 focus-within:text-gray-600 block border flex-1">
              <MagnifyingGlassIcon className="pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 right-3" />
              <input type="text" name="search" id="search" className="px-3 py-1 w-full focus:outline-1" />
            </label>
              {!user ? (
                <>
                <Link
                  className="bg-stone-500 text-white active:bg-stone-600 px-3 py-1 shadow hover:shadow-md outline-none focus:outline-none lg:mb-0 ml-2 ease-linear transition-all duration-150"
                  to="/auth/login"
                >
                  Log In
                </Link>
                <Link
                  className="bg-black text-white active:bg-slate-950 px-3 py-1 shadow hover:shadow-md outline-none focus:outline-none lg:mb-0 ml-2 ease-linear transition-all duration-150"
                  to="/auth/register"
                >
                  Sign Up
                </Link>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </>
  );
};
