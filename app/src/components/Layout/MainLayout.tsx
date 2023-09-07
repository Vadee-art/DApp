import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '@/assets/img/VADEE_Logo.png';
import Icon from '@/assets/img/VADEE_Icon.png';
import { ReactComponent as LogoSvg } from '@/assets/img/VADEE_Logo.svg';
import AmericanFlag from '@/assets/img/American_Flag .png';
import PaypalLogo from '@/assets/img/Paypal_Logo.png';
import MasterCardLogo from '@/assets/img/Mastercard_logo.png';
import USDTIcon from '@/assets/img/USDT_icon.png';
import { FaLinkedinIn, FaInstagram, FaFacebookF } from 'react-icons/fa';

import { useUser } from '@/lib/auth';
import {
  BellIcon,
  EnvelopeIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { Button } from '../Elements';
import { useGetCart } from '@/features/cart/api/getCart';

type MainLayouProps = {
  children: React.ReactNode;
  showNav?: boolean;
};
export const MainLayout = ({ children, showNav = true }: MainLayouProps) => {
  const { data: user } = useUser({});
  const { data: cart } = useGetCart({
    enabled: !!user,
  });

  return (
    <>
      <nav className="navbar-expand-lg flex w-full flex-wrap items-center justify-between bg-white py-2">
        <div className="container mx-auto flex flex-wrap items-center justify-between px-4">
          <div className="relative flex w-full justify-between gap-4 pt-4 lg:static">
            <Link
              className="inline-block whitespace-nowrap text-center text-xs leading-relaxed text-stone-500"
              to="/"
            >
              <img src={Logo} alt="RCL Logo" className="mb-2 max-h-6" />
              <span>Let there be art</span>
            </Link>
            <div className="flex flex-1 items-start ">
              <label
                htmlFor="search"
                className="relative block flex-1 border border-stone-400 text-gray-400 focus-within:text-gray-600"
              >
                <MagnifyingGlassIcon className="pointer-events-none absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2 transform" />
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="w-full px-3 py-1 focus:outline-1"
                />
              </label>
              {user ? (
                <>
                  <Link
                    className="relative ml-2 border border-stone-400 px-1 py-1 text-stone-400 outline-none transition-all duration-150 ease-linear focus:outline-none active:bg-stone-600 lg:mb-0"
                    to="/cart/shipping"
                  >
                    <ShoppingCartIcon className="h-6 w-6" />
                    {cart ? (
                      <span className="absolute right-0 top-0 inline-flex h-4 w-4 -translate-y-1/2 translate-x-1/2 transform items-center justify-center rounded-full bg-red-500 p-1 text-xs font-bold leading-none text-red-100">
                        {cart?.artworks.length}
                      </span>
                    ) : null}
                  </Link>
                  <Link
                    className="ml-2 border border-stone-400 px-1 py-1 text-stone-400 outline-none transition-all duration-150 ease-linear focus:outline-none active:bg-stone-600 lg:mb-0"
                    to="/"
                  >
                    <BellIcon className="h-6 w-6" />
                  </Link>
                  <Link
                    className="ml-2 border border-stone-400 px-1 py-1 text-stone-400 outline-none transition-all duration-150 ease-linear focus:outline-none active:bg-slate-950 lg:mb-0"
                    to="/"
                  >
                    <EnvelopeIcon className="h-6 w-6" />
                  </Link>
                  <Link
                    className="ml-2 border border-stone-400 px-1 py-1 text-stone-400 outline-none transition-all duration-150 ease-linear focus:outline-none active:bg-slate-950 lg:mb-0"
                    to="/"
                  >
                    <UserIcon className="h-6 w-6" />
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    className="ml-2 bg-stone-500 px-3 py-1 text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-stone-600 lg:mb-0"
                    to="/auth/login"
                  >
                    Log In
                  </Link>
                  <Link
                    className="ml-2 bg-black px-3 py-1 text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-slate-950 lg:mb-0"
                    to="/auth/register"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      {showNav && (
        <nav className="mb-4">
          <div className="container mx-auto flex flex-wrap items-center justify-between px-4">
            <div className="flex flex-1 items-start gap-4 font-extralight">
              <NavLink
                className={({ isActive }) =>
                  `${isActive ? 'text-teal-500 underline underline-offset-4' : ''}`
                }
                to="/"
              >
                Home
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `${isActive ? 'text-teal-500 underline underline-offset-4' : ''}`
                }
                to="/artists"
              >
                Photographers
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `${isActive ? 'text-teal-500 underline underline-offset-4' : ''}`
                }
                to="/artworks"
              >
                Artworks
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `${isActive ? 'text-teal-500 underline underline-offset-4' : ''}`
                }
                to="/regions"
              >
                Regions
              </NavLink>
            </div>
          </div>
        </nav>
      )}
      <main>{children}</main>
      <footer className="mt-12 w-full bg-black pb-8 pt-12">
        <div className="container mx-auto px-4 text-xs font-extralight text-white">
          <div className="mb-12 flex flex-row flex-wrap items-stretch justify-between gap-8">
            <img src={Icon} alt="VADEE Icon" className="object-contain" />
            <p className="max-w-[180px] leading-6">
              VADEE is an online marketplace to find photos & photographers from Middle East
            </p>
            <div className="flex flex-col gap-2">
              <a href="#">About us</a>
              <a href="#">Contact</a>
              <a href="#">Support</a>
            </div>
            <div className="flex flex-col gap-2">
              <a href="#">Terms & Conditions</a>
              <a href="#">Copyright Policy</a>
              <a href="#">Cookie Policy</a>
            </div>
            <div className="flex flex-col gap-3">
              <a href="#">
                <FaLinkedinIn size={16} />
              </a>
              <a href="#">
                <FaInstagram size={16} />
              </a>
              <a href="#">
                <FaFacebookF size={16} />
              </a>
            </div>
            <div className="flex flex-col justify-between gap-4">
              <h3>Signup to Discover photos from Middle East</h3>
              <div className="flex flex-row">
                <input
                  type="email"
                  placeholder="Enter your Email here"
                  className="flex-1 px-2 text-xs text-black outline-none placeholder:text-stone-500"
                />
                <Button size="xs" variant="stone">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row gap-8 md:gap-16">
              <LogoSvg fill="white" />
              <span>© 2021 VADEE</span>
            </div>

            <div className="flex flex-row gap-8 lg:gap-64">
              <div className="flex gap-1">
                <span>$</span>
                <img src={AmericanFlag} alt="american flag" />
              </div>
              <div className="flex gap-4">
                <img src={USDTIcon} alt="usdt icon" />
                <img src={MasterCardLogo} alt="mastercard logo" />
                <img src={PaypalLogo} alt="paypal logo" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
