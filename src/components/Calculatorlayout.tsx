import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { CalculatorData, CalculatorPageProps, } from '@/types/types';
import CalInput from './CalcInput';

const CalculatorLayout: React.FC<Omit<CalculatorData, 'id' | 'subtitle'>> = ({ title, name, description, list, }) => {
  const filteredList = list.filter(calculator => calculator.name !== name);
  return(
  <>
    <div className='md:px-[156px] md:py-[72px] flex flex-col gap-6'>
      <div className='p-2.5'>
        <div className='md:flex flex-col gap-4 hidden'>
          <h1 className='text-2xl font-medium leading-base'>{title}</h1>
          <p className='text-sm font-[450px] leading-5'>{description}</p>
        </div>
        <CalInput name = {name} title = {title}/>
        <div className='flex flex-col gap-4 mt-6'>
          <div className='text-2xl font-medium leading-base'>{title}</div>
          <p className='text-sm font-[450px] leading-5'> Calculate Love with TrulyMadly India’s free love calculator to check compatibility based on names. This Indian love meter finds love percentages between two people based on their first names.</p>
        </div>
        <div className='relative w-full flex flex-col gap-4'>
          <div className='font-medium text-2xl'>You can know the level of bonding between you two in 3 ways using our App:</div>
          <div className='flex md:gap-7 md:w-full md:flex-row flex-col justify-center items-center'>
            <div className='md:w-1/2'>
              <Image src="https://cdni.trulymadly.com/tm-static-assets-production/images/admin/Frame%20590%201.png" alt='seo-wall'
                width={335}
                height={335} className='flex justify-center items-center' />
            </div>
            <div className='flex flex-col gap-5 md:w-full'>
              <div className='flex flex-col justify-center items-center gap-2.5 md:flex-row'>
                <div className='md:w-1/3'><Image src="https://cdni.trulymadly.com/tm-static-assets-production/images/admin/fi_10174599.png" height={100} width={100} alt='/' /></div>
                <div>
                  <div className='text-2xl font-medium leading-base text-center sm:text-right'>Search by Name & Check Compatibility</div>
                  <div className='text-sm font-[450px]'>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehende in voluptate velit esse cillum dolore eu fugiat nulla pariat.</div>
                </div>
              </div>
              <div className='flex flex-col justify-center items-center gap-2.5 md:flex-row'>
                <div className='w-1/3'><Image src="https://cdni.trulymadly.com/tm-static-assets-production/images/admin/fi_10174599.png" height={100} width={100} alt='/' /></div>
                <div>
                  <div className='text-2xl font-medium leading-base text-center sm:text-right'>Search by Name & Check Compatibility</div>
                  <div className='text-sm font-[450px]'>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehende in voluptate velit esse cillum dolore eu fugiat nulla pariat.</div>
                </div>
              </div>
              <div className='flex flex-col justify-center items-center gap-2.5 md:flex-row'>
                <div className='w-1/3'><Image src="https://cdni.trulymadly.com/tm-static-assets-production/images/admin/fi_10174599.png" height={100} width={100} alt='/' /></div>
                <div>
                  <div className='text-2xl font-medium leading-base text-center sm:text-right'>Search by Name & Check Compatibility</div>
                  <div className='text-sm font-[450px]'>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehende in voluptate velit esse cillum dolore eu fugiat nulla pariat.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-[#E7F4FF] p-4 flex flex-col gap-3'>
        <div className='flex flex-col gap-1 '>
          <div className='text-common text-center text-2xl leading-[30.3px]'>Lorem ipsum dolor sit amet</div>
          <div className='text-center'>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
        </div>
        <div className='flex gap-3 md:flex-row flex-col'>
          <div className='rounded-[20px] flex justify-center items-center bg-[#FFFFFF]'>
            <div className='flex justify-center items-center flex-col p-4 gap-2.5'>
              <Image src="https://cdni.trulymadly.com/tm-static-assets-production/images/admin/fi_10174599.png" alt='profile-img' width={100} height={100} />
              <div className='text-sm text-common leading-[18px]'>Lorem Ipsum dolor sit amrt</div>
              <div className='text-common text-xs text-center font-[450px] leading-[18px]'>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</div>
              <div className='bg-common px-6 py-2 text-[#FFFFFF] rounded-[10px]'>know more</div>
            </div>
          </div>
          <div className='rounded-[20px] flex justify-center items-center bg-[#FFFFFF]'>
            <div className='flex justify-center items-center flex-col p-4 gap-2.5'>
              <Image src="https://cdni.trulymadly.com/tm-static-assets-production/images/admin/fi_10174599.png" alt='profile-img' width={100} height={100} />
              <div className='text-sm text-common leading-[18px]'>Lorem Ipsum dolor sit amrt</div>
              <div className='text-common text-xs text-center font-[450px] leading-[18px]'>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</div>
              <div className='bg-common px-6 py-2 text-[#FFFFFF] rounded-[10px]'>know more</div>
            </div>
          </div>
          <div className='rounded-[20px] flex justify-center items-center bg-[#FFFFFF]'>
            <div className='flex justify-center items-center flex-col p-4 gap-2.5'>
              <Image src="https://cdni.trulymadly.com/tm-static-assets-production/images/admin/fi_10174599.png" alt='profile-img' width={100} height={100} />
              <div className='text-sm text-common leading-[18px]'>Lorem Ipsum dolor sit amrt</div>
              <div className='text-common text-xs text-center font-[450px] leading-[18px]'>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</div>
              <div className='bg-common px-6 py-2 text-[#FFFFFF] rounded-[10px]'>know more</div>
            </div>
          </div>
          <div className='rounded-[20px] flex justify-center items-center bg-[#FFFFFF]'>
            <div className='flex justify-center items-center flex-col p-4 gap-2.5'>
              <Image src="https://cdni.trulymadly.com/tm-static-assets-production/images/admin/fi_10174599.png" alt='profile-img' width={100} height={100} />
              <div className='text-sm text-common leading-[18px]'>Lorem Ipsum dolor sit amrt</div>
              <div className='text-common text-xs text-center font-[450px] leading-[18px]'>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</div>
              <div className='bg-common px-6 py-2 text-[#FFFFFF] rounded-[10px]'>know more</div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-4 mt-6 p-2.5'>
        <div className='text-2xl font-medium leading-base'>{name}</div>
        <p className='text-sm font-[450px] leading-5'>{description}</p>
      </div>
    </div>
    <div className='bg-[#F5A623] w-full h-auto md:py-[78px] md:px-[156px]'>
      <div className='flex-wrap md:flex-row flex gap-6 justify-center items-center px-[20px] py-[30px]'>
      {filteredList.map((calculator) => (
          <Link key={calculator.id} href={`/calculator/${calculator.name}`} className='no-underline'>
            <div className='flex justify-between w-[264px] bg-[#FFFFFF] rounded-xl p-[15px] items-center text-common'>
              <span className='leading-5 text-[15px]'>{calculator.title}</span>
              <span>&gt;</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </>
  )
};

export default CalculatorLayout;
