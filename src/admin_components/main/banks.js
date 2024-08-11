import React from 'react'
import { CiBank } from 'react-icons/ci'
import download from '../../asset/download.png'
import sterling from '../../asset/sterling.jpg'
import moniepoint from '../../asset/moniepoint.png'
import {TbCurrencyNaira} from 'react-icons/tb';

export  function FirstBank() {
  return (
    <>
       <div className='flex justify-between mt-2'>
        <div className='font-mono ml-1 flex flex-row '>Acoount Details <p className='-mt-1 ml-2 text-3xl text-white font-extrabold '>{<CiBank/>}</p></div>
          <div className='text-5xl mr-2'>
          <img src={download} width={60} height={60} />
          </div>
        </div>
        <div className='flex flex-col'>
          <div className='flex flex-row'><div className='text-lg text-white'>Account Number:</div><div className='font-extrabold ml-2 text-xl'>0906662990</div></div>
          <div className='flex flex-row'><div className='text-lg text-white'>Account Name:</div><div className='font-extrabold ml-2 text-xl'> Bashar Ladan</div></div>
          <div className='flex flex-row'><div className='text-lg text-white'>Bank Name:</div><div className='font-extrabold ml-2 text-xl'> Gt Bank</div></div>
  
        </div>
      </>
  )
}
export  function SecondBank() {
  return (
    <>
    <div className='flex justify-between mt-2'>
      <div className='font-mono ml-1 flex flex-row '>Acoount Details <p className='-mt-1 ml-2 text-3xl text-white font-extrabold '>{<CiBank/>}</p></div>
        <div className='text-5xl mr-2'>
        <img src={moniepoint} width={60} height={60}  className='rounded'/>
        </div>
      </div>
      <div className='flex flex-col'>
        <div className='flex flex-row'><div className='text-lg text-white'>Account Number:</div><div className='font-extrabold ml-2 text-xl'>0906662990</div></div>
        <div className='flex flex-row'><div className='text-lg text-white'>Account Name:</div><div className='font-extrabold ml-2 text-xl'> Bashar Ladan</div></div>
        <div className='flex flex-row'><div className='text-lg text-white'>Bank Name:</div><div className='font-extrabold ml-2 text-xl'> Gt Bank</div></div>

      </div>
      </>
  )
}

export  function ThirdBank() {
    return (
      <>
      <div className='flex justify-between mt-2'>
        <div className='font-mono ml-1 flex flex-row '>Acoount Details <p className='-mt-1 ml-2 text-3xl text-white font-extrabold '>{<CiBank/>}</p></div>
          <div className='text-5xl mr-2'>
          <img src={sterling} width={80} height={60}  className='rounded'/>
          </div>
        </div>
        <div className='flex flex-col'>
          <div className='flex flex-row'><div className='text-lg text-white'>Account Number:</div><div className='font-extrabold ml-2 text-xl'>0906662990</div></div>
          <div className='flex flex-row'><div className='text-lg text-white'>Account Name:</div><div className='font-extrabold ml-2 text-xl'> Bashar Ladan</div></div>
          <div className='flex flex-row'><div className='text-lg text-white'>Bank Name:</div><div className='font-extrabold ml-2 text-xl'> Gt Bank</div></div>
  
        </div>
        </>
    )
  }
  