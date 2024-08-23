'use client'
import React, { useEffect, } from 'react'
import LoginCarousel from './LoginCarousel';
import LoginComponent from './LoginComponent';
import Image from 'next/image';
import { useLogin } from './LoginContext';


const Login = () => {
  const { ToggleLogin, showLogin } = useLogin();

  useEffect(() => {
    if (showLogin) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showLogin]);


  if (!showLogin) return null;
  return (
    <div className="fixed inset-0 z-50 bg-[linear-gradient(90deg,_#ffe6f0,_#e6f1fe_50.88%,_#e4f2ff)] overflow-y-auto animate-fade delay-100">
      <div className='flex justify-between p-[20px]'>
        <Image src="https://cdni.trulymadly.com/tm-static-assets-production/web/logo.webp" alt='header-img' style={{ objectFit: 'contain', height: '30px', width: '120px' }} width={500} height={500} />
        <div className='flex gap-[12px]'>
          <Image src="https://trulymadly.com/images/ps-login-popup.webp" alt="download-icon" width={145} height={56} loading="lazy" className='cursor-pointer md:block hidden' onClick={() => window.location.href = 'https://play.google.com/store/apps/details?id=com.trulymadly.android.app&hl=en_IN'} />
          <Image src="https://cdni.trulymadly.com/tm-static-assets-production/images/admin/Frame%208%20(1).png" alt="download-icon" width={145} height={56} loading="lazy" className='cursor-pointer md:block hidden' onClick={() => window.location.href = 'https://apps.apple.com/in/app/trulymadly/id964395424'} />
          <svg onClick={ToggleLogin} className='w-[13.2px] h-[19.5px] cursor-pointer' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path d="M242.7 256l100.1-100.1c12.3-12.3 12.3-32.2 0-44.5l-22.2-22.2c-12.3-12.3-32.2-12.3-44.5 0L176 189.3 75.9 89.2c-12.3-12.3-32.2-12.3-44.5 0L9.2 111.5c-12.3 12.3-12.3 32.2 0 44.5L109.3 256 9.2 356.1c-12.3 12.3-12.3 32.2 0 44.5l22.2 22.2c12.3 12.3 32.2 12.3 44.5 0L176 322.7l100.1 100.1c12.3 12.3 32.2 12.3 44.5 0l22.2-22.2c12.3-12.3 12.3-32.2 0-44.5L242.7 256z" /></svg>
        </div>
      </div>
      <div className='md:flex md:justify-around md:w-[100%] md:items-center h-5/6'>
        <LoginCarousel />
        <LoginComponent />
      </div>
    </div>
  );
}

export default Login;