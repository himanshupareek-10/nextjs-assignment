'use client'
import WEB_LINKS from '@/config/constants/calculator.constants';
import Image from 'next/image'
import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    const handleNavigation = (url:any) =>{
        window.location.href = url;
    };

    return (
        <div className='bg-common md:px-[156px] md:py-[78px] flex text-[#FFFFFF] flex-col justify-between px-[20px] py-[50px] gap-2.5'>
            <div className='flex justify-between'>
                <div className='hidden md:block'>
                    <Image src="https://cdni.trulymadly.com/tm-static-assets-production/images/admin/tmlogo.png" width={192} height={67} alt='/' />
                </div>
                <div className='flex md:gap-6 gap-[15px] flex-wrap'>
                    <div className='flex flex-col gap-4 order-first'>
                        <div className='text-xl font-bold'>About</div>
                        <div className='text-[14px] font-[450px] leading-[18.2px] gap-2'>
                            <div onClick={() => handleNavigation(WEB_LINKS.ABOUT_US)} className='footer-link cursor-pointer'>About us</div>
                            <div onClick={() => handleNavigation(WEB_LINKS.ABOUT_US)} className='footer-link cursor-pointer'>Values & Commitment</div>
                            <div onClick={() => handleNavigation(WEB_LINKS.CONTACT_US)} className='footer-link cursor-pointer'>Contact us</div>
                            <div onClick={() => handleNavigation(WEB_LINKS.CAREER)} className='footer-link cursor-pointer'>Careers</div>
                            <div onClick={() => handleNavigation(WEB_LINKS.CAREER)} className='footer-link cursor-pointer'>Sitemap</div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4 order-2 md:order-last'>
                        <div className='text-xl font-bold'>Security</div>
                        <div className='text-[14px] font-[450px] leading-[18.2px] text-[#F5F5F5] gap-2'>
                            <div onClick={() => handleNavigation(WEB_LINKS.TERMS)} className='footer-link cursor-pointer'>Terms of use</div>
                            <div onClick={() => handleNavigation(WEB_LINKS.PRIVACY)} className='footer-link cursor-pointer'>Privacy Policy</div>
                            <div onClick={() => handleNavigation(WEB_LINKS.COOKIE_POLICY)} className='footer-link cursor-pointer'>Cookie Policy</div>
                            <div onClick={() => handleNavigation(WEB_LINKS.SAFETY)} className='footer-link cursor-pointer'>Safety Guidelines</div>
                            <div onClick={() => handleNavigation(WEB_LINKS.TRUST)} className='footer-link cursor-pointer'>Trust & Security</div>
                            <div onClick={() => handleNavigation(WEB_LINKS.REPORT_VAL)} className='footer-link cursor-pointer'>Report Vulnerability</div>
                            <div onClick={() => handleNavigation(WEB_LINKS.PUBLIC_NOTICE)} className='text-[#F8111B] footer-link'>Hiring scam Public Notice</div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <div className='text-xl font-bold'>Community</div>
                        <div className='text-[14px] font-[450px] leading-[18.2px] text-[#F5F5F5] gap-2'>
                            <div>Web App</div>
                            <div onClick={() => handleNavigation(WEB_LINKS.BLOG)} className='footer-link cursor-pointer'>Blog</div>
                            <div onClick={() => handleNavigation(WEB_LINKS.NEWS)} className='footer-link cursor-pointer'>Trulymadly in News</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex-col md:flex justify-between md:justify-center items-center md:gap-6 text-center'>
                <div className='text-[#CED2D6] text-[15px] leading-[19.45px] font-normal flex-nowrap'>©  2021 Crescere Technologies Pvt. Ltd. All rights reserved</div>
                <div className='h-0.5 w-full bg-[#616F80]'></div>
                <div className='p-2 flex gap-2.5 justify-center'>
                    <div onClick={() => handleNavigation(WEB_LINKS.FACEBOOK)} className='cursor-pointer'><FaFacebook /></div>
                    <div onClick={() => handleNavigation(WEB_LINKS.INSTAGRAM)} className='cursor-pointer'><FaInstagram /></div>
                    <div onClick={() => handleNavigation(WEB_LINKS.TWITTER)} className='cursor-pointer'><FaTwitter /></div>
                    <div onClick={() => handleNavigation(WEB_LINKS.LINKEDIN)} className='cursor-pointer'><FaLinkedin /></div>
                    <div onClick={() => handleNavigation(WEB_LINKS.YOUTUBE)} className='cursor-pointer'><FaYoutube /></div>
                </div>
            </div>
        </div>
    )
}

export default Footer