import React from 'react'
import { CiBank } from 'react-icons/ci'
import download from '../../asset/download.png'
import sterling from '../../asset/safehaven.jpeg'
import moniepoint from '../../asset/paga.png'
import { useState, useEffect } from 'react'
import axios from 'axios'

export function ThirdBank() {

  const [bank, setBank] = useState({})

  useEffect(() => {

    // Fetch form data from MongoDB
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getrequestuser/providus`, {withCredentials:true})
      .then(response => {
        setBank(response.data)
  //      console.log(response.data)
      })
      .catch(error => console.error(error))
  }, [])

  return (
    <>
      <div className='flex justify-between mt-2 p-2 font-mono'>
        <div className='font-mono ml-1 flex flex-row p-2'>Acoount Details <p className='-mt-1 ml-2 text-3xl text-white font-extrabold '>{<CiBank />}</p></div>
        <div className='text-5xl mr-2'>
          <img src={sterling} width={60} height={60} />
        </div>
      </div>
      <div className='flex flex-col ml-2 p-2'>
        <div className='flex flex-row'><div className='text-lg text-white'>accountNumber:</div><div className='font-extrabold ml-2 text-xl font-sans'>{bank.accountNumber}</div></div>
        <div className='flex flex-row'><div className='text-lg text-white'>accountName:</div><div className='font-extrabold ml-2 text-xl'> {bank.accountName}</div></div>
        <div className='flex flex-row'><div className='text-lg text-white'>bankName:</div><div className='font-extrabold ml-2 text-xl'>{bank.bankName}</div></div>

      </div>
    </>
  )
}
export function SecondBank() {
  const [bank, setBank] = useState({})

  useEffect(() => {

    // Fetch form data from MongoDB
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getrequestuser/paga`, {withCredentials:true})
      .then(response => {
        setBank(response.data)
//        console.log(response.data)
      })
      .catch(error => console.error(error))
  }, [])

  return (
    <>
      <div className='flex justify-between mt-2 p-2'>
        <div className='font-mono ml-1 flex flex-row '>Acoount Details <p className='-mt-1 ml-2 text-3xl text-white font-extrabold '>{<CiBank />}</p></div>
        <div className='text-5xl mr-2'>
          <img src={moniepoint} width={60} height={60} className=' bg-green-700 rounded' />
        </div>
      </div>
      <div className='flex flex-col ml-2 p-2'>
        <div className='flex flex-row'><div className='text-lg text-white'>accountNumber:</div><div className='font-extrabold ml-2 text-xl font-sans'>{bank.accountNumber}</div></div>
        <div className='flex flex-row'><div className='text-lg text-white'>accountName:</div><div className='font-extrabold ml-2 text-xl'> {bank.accountName}</div></div>
        <div className='flex flex-row'><div className='text-lg text-white'>bankName:</div><div className='font-extrabold ml-2 text-xl'>{bank.bankName}</div></div>

      </div>
    </>
  )
}

export function FirstBank() {

  const [bank, setBank] = useState({})

  useEffect(() => {

    // Fetch form data from MongoDB
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getrequestuser/safehaven`,{withCredentials:true})
      .then(response => {
        setBank(response.data)
       // console.log(response.data)
      })
      .catch(error => console.error(error))
  }, [])

  return (
    <>
      <div className='flex justify-between p-2 '>
        <div className='font-mono ml-1 flex flex-row p-2'>Acoount Details <p className='-mt-1 ml-2 text-3xl text-white font-extrabold '>{<CiBank />}</p></div>
        <div className='text-5xl mr-2'>
          <img src={moniepoint} width={80} height={60} className='rounded' />
        </div>
      </div>
      <div className='flex flex-col ml-2 p-2'>
        <div className='flex flex-row'><div className='text-lg text-white'>accountNumber:</div><div className='font-extrabold ml-2 text-xl font-sans'>{bank.accountNumber}</div></div>
        <div className='flex flex-row'><div className='text-lg text-white'>accountName:</div><div className='font-extrabold ml-2 text-xl'> {bank.accountName}</div></div>
        <div className='flex flex-row'><div className='text-lg text-white'>bankName:</div><div className='font-extrabold ml-2 text-xl'>PAGA</div></div>

      </div>
    </>
  )
}
