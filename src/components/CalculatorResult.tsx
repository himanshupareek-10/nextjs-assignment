'use client'
import React from 'react'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useLogin } from './LoginContext';


interface CalculatorResultProps {
    result: number;
    resetResult: () => void;
}

const CalculatorResult: React.FC<CalculatorResultProps> = ({ result, resetResult, }) => {
    const { ToggleLogin, } = useLogin();
  return (
    <div className='bg-result-gradient rounded-[20px] flex flex-col p-[15px] gap-2.5'>
        <div className='flex flex-col gap-[5px]'>
            <h5 className='font-medium text-2xl leading-base text-center m-0'>Lorem ipsum dolor sit</h5>
            <span className='font-[450px] text-base text-center'>sunt in culpa qui officia deserunt mollit anim id est laborum.</span>
        </div>
        <div className='flex flex-col gap-1.5'>
            <div style={{ width: 140, height: 140, margin: '0 auto' }}>
                <CircularProgressbar value={Number(result)} text={`${result}%`} />
            </div>
            <p className='text-common leading-5 font-[450] text-[15px] text-center m-0'>Donec a dui et dui fringilla consectetur id nec massa. Duis nunc eros, mattis at dui ac. Voluptate velit esse cillum dolore eu fugiat nulla pariat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        <div className='flex flex-col gap-1.5'>
            <button className='bg-bgblue w-full text-center py-3.5 rounded-lg text-[#FFFFFF]' onClick={ToggleLogin}>Login to see Profiles</button>
            <button className='text-bgblue leading-5 font-medium text-base' onClick={resetResult}>Calculate Again</button>
        </div>
    </div>
  )
}

export default CalculatorResult