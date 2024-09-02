'use client'
import { Calculator, } from '@/types/types'
import { API_ENDPOINTS, getFunction, } from '@/utils/api';
import Image from 'next/image'
import React, { FC, useState, } from 'react';
import CalculatorResult from './CalculatorResult';


const CalcInput: FC<Calculator> = ({ name, title }) => {
  const [yourInput, setYourInput] = useState('');
  const [yourGender, setYourGender] = useState<'Male' | 'Female'>('Male');
  const [partnerInput, setPartnerInput] = useState('');
  const [partnerGender, setPartnerGender] = useState<'Male' | 'Female'>('Female');
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleYourGender = (gender: 'Male' | 'Female') => {
    setYourGender(gender);
  }

  const handlePartnerGender = (gender: 'Male' | 'Female') => {
    setPartnerGender(gender);
  }

  const buildApiUrl = () => {
    const baseUrl = API_ENDPOINTS.getCalculatorResult;
    const queryParams = `?name=${encodeURIComponent(yourInput)}&gender=${yourGender.toLowerCase()}&partner_name=${encodeURIComponent(partnerInput)}&partner_gender=${partnerGender.toLowerCase()}`;
    return `${baseUrl}${name}${queryParams}`;
  }

  const calculateCompatibility = async () => {
    if (!yourInput || !partnerInput) {
      alert('Please fill in both names.');
      return;
    }
    setLoading(true);
    try {
      const apiUrl = buildApiUrl();
      const data = await getFunction(apiUrl);
      setResult(data.payload.percentage);
    } catch (error) {
      console.error(error);
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  const resetResult = () => {
    setResult(null);
  }

  return (
    <>
      {result === null ?
        <div className='w-full border-4 rounded-[20px] md:p-5 flex flex-col gap-4 p-3'>
          <div className='font-bold text-2xl text-center leading-7'>{title}</div>
          <p className='text-center text-common'>Enter your details on the Love calculator and Find your compatibility within seconds.</p>
          <div className='flex w-full gap-4 flex-col md:flex-row'>
            <div className='md:w-1/2 flex flex-col gap-2.5 w-full'>
              <h5>Your Details</h5>
              <input
                type="text"
                required
                placeholder='Your Name'
                value={yourInput}
                onChange={(e) => setYourInput(e.target.value)}
                className='w-full bg-[#F5F5F5] caret-[#616F80] border-none rounded-lg px-4 py-3.5 h-12'
              />
              <div className='flex w-full p-0 gap-4'>
                <div
                  className={`flex cursor-pointer w-1/2 h-12 border-solid border-1 ${yourGender === 'Male' ? 'border-[#0E8EFF] bg-[#DBEEFF] text-[#0E8EFF]' : 'bg-[#F5F5F5] text-[#616F80]'} items-center justify-center rounded-lg`}
                  onClick={() => handleYourGender('Male')}
                >
                  Male
                </div>
                <div
                  className={`flex cursor-pointer w-1/2 h-12 border-solid border-1 ${yourGender === 'Female' ? 'border-[#0E8EFF] bg-[#DBEEFF] text-[#0E8EFF]' : 'bg-[#F5F5F5] text-[#616F80]'} items-center justify-center rounded-lg`}
                  onClick={() => handleYourGender('Female')}
                >
                  Female
                </div>
              </div>
            </div>
            <div className='flex items-center md:flex-col gap-[1.5px] justify-center'>
              <div className='md:h-11 md:w-px bg-[#FFDEEB] w-11 h-px'></div>
              <div><Image src="https://cdni.trulymadly.com/tm-static-assets-production/images/admin/fi_15761308%20(1).png" alt='heart-icon' width={48} height={48} unoptimized /></div>
              <div className='md:h-11 md:w-px bg-[#FFDEEB] w-11 h-px'></div>
            </div>
            <div className='md:w-1/2 flex flex-col gap-2.5 w-full'>
              <h5>Partner Details</h5>
              <input
                type="text"
                required
                placeholder='Partner Name'
                value={partnerInput}
                onChange={(e) => setPartnerInput(e.target.value)}
                className='w-full bg-[#F5F5F5] caret-[#616F80] border-none rounded-lg px-4 py-3.5 h-12'
              />
              <div className='flex w-full p-0 gap-4'>
                <div
                  className={`flex cursor-pointer w-1/2 h-12 border-solid border-1 ${partnerGender === 'Male' ? 'border-[#0E8EFF] bg-[#DBEEFF] text-[#0E8EFF]' : 'bg-[#F5F5F5] text-[#616F80]'} items-center justify-center rounded-lg`}
                  onClick={() => handlePartnerGender('Male')}
                >
                  Male
                </div>
                <div
                  className={`flex cursor-pointer w-1/2 h-12 border-solid border-1 ${partnerGender === 'Female' ? 'border-[#0E8EFF] bg-[#DBEEFF] text-[#0E8EFF]' : 'bg-[#F5F5F5] text-[#616F80]'} items-center justify-center rounded-lg`}
                  onClick={() => handlePartnerGender('Female')}
                >
                  Female
                </div>
              </div>
            </div>
          </div>
          <div
            className='flex items-center justify-center leading-5 bg-[#616F80] text-[#FFFFFF] text-base font-medium h-12 self-center w-[240px] rounded-lg cursor-pointer'
            onClick={calculateCompatibility}
          >
            {loading ? 'Calculating...' : 'Calculate'}
          </div>
        </div>
        :
        <div>
          {result !== null && (
            <CalculatorResult result={result} resetResult = {resetResult}/>
          )}
        </div>
      }
    </>
  )
}

export default CalcInput;