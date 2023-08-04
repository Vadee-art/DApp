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
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Button } from '../Elements';

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
      <nav className='mb-4'>
        <div className="container mx-auto flex flex-wrap items-center justify-between px-4">
          <div className="flex items-start flex-1 gap-4 font-extralight">
            <NavLink
              className={({isActive}) => `${isActive ? 'text-teal-500 underline underline-offset-4' : ''}`}
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className={({isActive}) => `${isActive ? 'text-teal-500 underline underline-offset-4' : ''}`}
              to="/photographers">
              Photographers
            </NavLink>
            <NavLink
              className={({isActive}) => `${isActive ? 'text-teal-500 underline underline-offset-4' : ''}`}
              to="/artworks">
              Artworks
            </NavLink>
            <NavLink
              className={({isActive}) => `${isActive ? 'text-teal-500 underline underline-offset-4' : ''}`}
              to="/regions">
              Regions
            </NavLink>
          </div>
        </div>
      </nav>
      <main>{children}</main>
      <footer className="w-full bg-black mt-12 pt-12 pb-8">
        <div className="container px-4 text-white mx-auto text-xs font-extralight">
          <div className='flex flex-row items-stretch justify-between mb-12 flex-wrap gap-8'>
            <img src={Icon} alt="VADEE Icon" className='object-contain'/>
            <p className='max-w-[180px] leading-6'>
              VADEE is an online marketplace to find photos & photographers from Middle East
            </p>
            <div className='flex flex-col gap-2'>
              <a href="#">About us</a>
              <a href="#">Contact</a>
              <a href="#">Support</a>
            </div>
            <div className='flex flex-col gap-2'>
              <a href="#">Terms & Conditions</a>
              <a href="#">Copyright Policy</a>
              <a href="#">Cookie Policy</a>
            </div>
            <div className='flex flex-col gap-3'>
              <a href="#"><FaLinkedinIn size={16} /></a>
              <a href="#"><FaInstagram size={16} /></a>
              <a href="#"><FaFacebookF size={16} /></a>
            </div>
            <div className='flex flex-col justify-between gap-4'>
              <h3>Signup to Discover photos from Middle East</h3>
              <div className='flex flex-row'>
                <input type='email' placeholder='Enter your Email here' className='text-xs px-2 text-black placeholder:text-stone-500 outline-none flex-1'/>
                <Button size='xs' variant='stone'>Subscribe</Button>
              </div>
            </div>
          </div>
          <div className='flex flex-row items-center justify-between'>
            <div className='flex flex-row gap-8 md:gap-16'>
              <LogoSvg fill="white" />
              <span>
                © 2021 VADEE
              </span>
            </div>

            <div className='flex flex-row gap-8 lg:gap-64'>
              <div className='flex gap-1'>
                <span>$</span>
                <img src={AmericanFlag} alt="american flag" />
              </div>
              <div className='flex gap-4'>
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
