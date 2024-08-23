'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import Login from './Login'
import { useLogin } from './LoginContext'

const Header = () => {
  const { showLogin, ToggleLogin, } = useLogin();

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {!showLogin && 
      <div className='h-[68px] relative flex justify-between items-center  py-[8px] px-[20px] border-b-[1px] shadow-[0_0_4px_0_rgba( 0 , 0 , 0 , 0.251 )]'>
        <button
        id="header-hamburg"
        className="navbar-toggler border-0 px-0"
        type="button"
        aria-controls="navbarToggler"
        aria-expanded={isOpen}
        aria-label="Toggle navigation"
        onClick={toggleMenu}
      >
        <span className={`${isOpen ? "hidden" : "block"}`}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 8H20"
              stroke="#1F314A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M4 16H20"
              stroke="#1F314A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </span>
        <span className={`${isOpen ? "block" : "hidden"}`}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 7L7 17"
              stroke="#1F314A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M7 7L17 17"
              stroke="#1F314A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </span>
      </button>

      <div
        className={`absolute bg-white w-[400px] top-[50px] left-0 p-[10px] transition-all duration-300 ease-in-out ${
          isOpen ? "block" : "hidden"
        } sm:w-full sm:max-h-[60vh] sm:overflow-y-auto md:w-[400px]`}
      >
        <ul className="list-none p-0">
          <li className="nav-item py-2 px-4">
            <a className=" text-[#616F80] hover:bg-[#F5F5F5] hover:text-[#1F314A] no-underline py-4 px-2 text-base font-semibold" href="https://www.trulymadly.com">
              Home
            </a>
          </li>
          <li className="py-2 px-4">
            <a className=" text-[#616F80] hover:bg-[#F5F5F5] hover:text-[#1F314A] no-underline py-4 px-2 font-semibold" href="https://www.trulymadly.com/about">
              About Us
            </a>
          </li>
          <li className="py-2 px-4">
            <a className=" text-[#616F80] hover:bg-[#F5F5F5] hover:text-[#1F314A] no-underline py-4 px-2 font-semibold" href="https://www.trulymadly.com/career">
              Careers
            </a>
          </li>
          <li className="py-2 px-4">
            <a className="text-[#616F80] hover:bg-[#F5F5F5] hover:text-[#1F314A] no-underline py-4 px-2 font-semibold" href="https://www.trulymadly.com/contact">
              Contact
            </a>
          </li>
        </ul>
      </div>
        <div>
          <Image src="https://cdni.trulymadly.com/tm-static-assets-production/web/logo.webp" alt='header-img' style={{ objectFit: 'contain', height: '30px', width: '120px' }} width={500} height={500} />
        </div>
        <div className='bg-[#C3E3FF] text-[#0B72CC] rounded-[12px] py-[4px] px-[16px] font-bold' onClick={ToggleLogin}>
          Login
        </div>
      </div>
      }
      {showLogin && <Login/>}
    </div>
  )
}

export default Header