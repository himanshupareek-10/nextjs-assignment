'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faAngleDown, } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { API_ENDPOINTS, postFunction, setCookieData } from '@/utils/api';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';

interface OtpState {
    otp1: string;
    otp2: string;
    otp3: string;
    otp4: string;
}

const LoginComponent = () => {
    const router = useRouter();
    const [mobileOtp, setMobileOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState<OtpState>({ otp1: '', otp2: '', otp3: '', otp4: '' });
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [countDown, setCountDown] = useState(30);
    const [resendDisabled, setResendDisabled] = useState(true);
    const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [emailLogin, setEmailLogin] = useState(false);
    const [emailUser , setEmailUser] = useState('');
    const [invalidOtp,setInvalidOtp] = useState([]);

    const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.trulymadly.android.app&hl=en_IN';
    const appStoreUrl = 'https://apps.apple.com/in/app/trulymadly/id964395424';

    const isAndroid = navigator.userAgent.toLowerCase().includes('android');
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    const {data: session, status} = useSession();

    if(status === 'loading'){
        <div>Loading...</div>
    }

    useEffect(() => {
        const verifyAuth = async () => {
          if (status === 'authenticated') {
            console.log('authenticated');
            try {
              if (session) {
                const token = session.idToken;
                const form = {
                    'id_token': token,
                }
                const response = await postFunction(API_ENDPOINTS.verifyGoogleAuth, form);
                if (response) {
                  setCookieData(response, router);
                }
              }
            } catch (error) {
              console.error(error);
            }
          }
        };
        verifyAuth();
    }, [status, session, router]);

    const handleClick = () => {
        if (isAndroid) {
            window.location.href = playStoreUrl;
        } else if (isIOS) {
            window.location.href = appStoreUrl;
        } else {
            window.location.href = playStoreUrl;
        }
    };

    const otpData = useCallback( async () => {
        try {
            const body = {
                'country_code': '91', 'locale': 'IN',
                'mobile': mobileOtp
            };
            const sendOtp = await postFunction(API_ENDPOINTS.sendOtpMobile, body);
            return sendOtp;
        } catch (error) {
            console.error(error);
        }
    },[mobileOtp]);

    const emailOtpData = async () => {
        try{
            const body = {
                'email': emailUser
            };
            const sendEmailOtp = await postFunction(API_ENDPOINTS.sendOtpEmail,body);
            setOtpSent(true);
            return sendEmailOtp;
        } catch(error){
            console.error(error);
        }
    };

    const handleSubmit = async () => {
        const otpCode = Object.values(otp).join('');
        try {
            const body = emailLogin ? {'email':emailUser , 'otp': otpCode}:{ 'country_code': '91', 'mobile': mobileOtp, 'otp': otpCode };
            const verifyOtp = await postFunction(emailLogin ? API_ENDPOINTS.verifyOtpEmail : API_ENDPOINTS.verifyOtpMobile, body);
            if (verifyOtp) {
                setCookieData(verifyOtp, router);
            }
            console.log('check');
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
            setInvalidOtp(error.response.data.message);
          } else {
            setInvalidOtp(error.message || 'An error occurred');
          }
        }
    };

    const startCountdown = () => {
        setCountDown(30);
        setResendDisabled(true);
    
        const timer = setInterval(() => {
          setCountDown((prevCountdown) => {
            if (prevCountdown <= 1) {
              clearInterval(timer);
              setResendDisabled(false);
              return 0;
            }
            return prevCountdown - 1;
          });
        }, 1000);
    
        return () => clearInterval(timer);
    };

    useEffect(() => {
        if (mobileOtp.length === 10) {
            const sendOtp = async () => {
                setLoading(true);
                try {
                    await otpData();
                    setOtpSent(true);
                    setCountDown(30);
                    setResendDisabled(true);
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            };
            sendOtp();
        }
    }, [mobileOtp, otpData]);

    useEffect(() => {
        if (otpSent) {
          startCountdown();
        }
    }, [otpSent]);

    
    const handleResend = async () => {
        setLoading(true);
        try {
            await (emailLogin ? emailOtpData() : otpData());
            startCountdown();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    const handleOtpClick = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMobileOtp(e.currentTarget.value);
    };
    const handleEmailOtpClick = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setEmailUser(e.currentTarget.value)
    }

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = e.target;
        if (value.match(/^[0-9]{0,1}$/)) {
            const newOtp = { ...otp, [`otp${index + 1}`]: value };
            setOtp(newOtp);

            if (value && index < 3) {
                otpInputRefs.current[index + 1]?.focus();
            }

            if (Object.values(newOtp).every(val => val !== '')) {
                setIsSubmitDisabled(false);
            } else {
                setIsSubmitDisabled(true);
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        const otpKey = `otp${index + 1}` as keyof OtpState;
        if (e.key === 'Backspace' && otp[otpKey] === '') {
            if (index > 0) {
                const newOtp = { ...otp, [`otp${index}`]: '' };
                setOtp(newOtp);
                otpInputRefs.current[index - 1]?.focus();
            }
        }
    };

    return (
        <div className="max-[766px]:bg-white p-2.5 font-circular">
            <div className='flex flex-col gap-3'>
                <div className='hidden md:flex flex-col justify-center items-center'>
                    <div className='font-bold text-[32px]'>Welcome to TrulyMadly</div>
                    <div className='text-[#616f80]'>Find your Forever</div>
                </div>
                <div className='font-circular'>{!otpSent ? (
                    emailLogin ? 'Email' : 'Mobile'
                ) : (
                    <div className='flex justify-between'>
                        <span>OTP</span>
                        <span className='text-[#0e8eff] cursor-pointer' onClick={() => setOtpSent(!otpSent)}>{emailLogin? '' : 'Change Number' }</span>
                    </div>)
                }</div>
                {!otpSent ?
                    <div className='w-full flex gap-2 h-12'>
                        <div className={`bg-[#F5F5F5] rounded-lg p-3 flex gap-2 justify-center items-center font-bold ${emailLogin ? 'hidden' : 'block'}`}>+91 <div><FontAwesomeIcon icon={faAngleDown as IconProp} /></div></div>
                        <input onChange={emailLogin? handleEmailOtpClick : handleOtpClick} type={`${emailLogin ? 'email' : 'number'}`} className='bg-[#F5F5F5] rounded-lg min-w-[245px] w-full border-none outline-none px-3.5 py-4' />
                    </div>
                    :
                    <div>
                        <div className='flex gap-4'>
                            {['otp1', 'otp2', 'otp3', 'otp4'].map((name, index) => (
                                <input
                                    key={index}
                                    className='w-[30%] bg-zinc-100 border-zinc-100 rounded-lg flex-auto h-12 px-2 py-3.5'
                                    type="text"
                                    name={name}
                                    maxLength={1}
                                    size={1}
                                    autoComplete="off"
                                    inputMode="numeric"
                                    onChange={(e) => handleOtpChange(e, index)}
                                    value={otp[name as keyof OtpState]}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    ref={(el: any) => (otpInputRefs.current[index] = el)}
                                />
                            ))}
                        </div>
                        <div className='text-[#616f80] leading-4 text-xs mt-2'>
                            We have Sent an OTP to {emailLogin ? emailUser : mobileOtp}
                        </div>
                        <div>
                        <div className='text-xs text-red-800'>{invalidOtp}</div>
                        </div>
                        <div>
                            {resendDisabled ? (
                                <button className='text-[#0e8eff] cursor-pointer text-sm'>
                                    Resend in <span className='text-sm text-red-600'>{countDown} sec</span>
                                </button>
                            ) : (
                                <button className='text-[#0e8eff] cursor-pointer text-sm mt-2' onClick={handleResend}>
                                    Resend
                                </button>
                            )}
                        </div>
                        <div>
                            <button className={`w-full rounded-2xl px-3 py-2.5 ${isSubmitDisabled ? 'bg-[#aeb5bd]' : 'bg-[#0E8EFF]'} h-12 flex justify-center items-center font-bold text-base leading-4 text-white`} disabled={isSubmitDisabled} onClick={handleSubmit}>
                                Continue
                            </button>
                        </div>
                    </div>
                }
                {!otpSent &&
                    <div className={`${emailLogin ? 'flex justify-between items-center': 'block'}`}>
                        {
                        emailLogin && 
                        <div onClick={() => setEmailLogin(false)} className='text-[#0e8eff] text-lg'>
                            Cancel
                        </div>
                        }
                        <div>
                            <button className={`${emailLogin ? 'w-[100%]' : 'w-full'} rounded-2xl px-3 py-2.5 ${loading ? 'bg-[rgb(174, 181, 189)]' : 'bg-[#0E8EFF]'} h-12 flex justify-center items-center font-bold text-base leading-4 text-white`} onClick={emailLogin ? emailOtpData : otpData}>{loading ? <span className='spinner-border'></span> : 'Continue'}</button>
                        </div>
                    </div>
                }
                {!otpSent &&
                    <div className='flex items-center justify-center text-xs underline text-atag' onClick={()=> signIn('google')}>
                        <a>Continue with Google</a>
                    </div>
                }
                <div className='hidden md:flex text-xs items-center justify-center text-[#616f80] leading-4'> If you had previously registered using email id, please&nbsp;<a href="#" onClick={() => setEmailLogin(true)}>login</a>&nbsp;here</div>
                <div className="flex items-center justify-center md:hidden" onClick={handleClick} style={{ cursor: 'pointer' }}>
                    {isAndroid ? (
                        <Image src="https://trulymadly.com/images/ps-login-popup.webp" alt="download-icon" width={145} height={56} loading="lazy" />
                    ) : (
                        <Image src="https://cdni.trulymadly.com/tm-static-assets-production/images/admin/Frame%208%20(1).png" alt="download-icon" width={145} height={56} loading="lazy" />
                    )}
                </div>
                <div className='text-xs flex items-center justify-center text-[#616f80] leading-4'>By Continue you agree to our &nbsp;<a href="https://trulymadly.com/terms">terms</a>&nbsp;&&nbsp;<a href="https://trulymadly.com/privacy">privacy</a></div>
            </div>
        </div>
    );
};

export default LoginComponent;
