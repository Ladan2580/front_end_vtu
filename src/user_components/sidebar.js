import React, { useState } from 'react'
import { FaHome,FaWifi,FaGraduationCap,FaSms,FaSatelliteDish,FaGreaterThan } from 'react-icons/fa'
import { TbPhoneCall } from 'react-icons/tb'
import { IoBulb,IoAnalyticsOutline } from 'react-icons/io5'
import { FaCode } from 'react-icons/fa'
import {MdExpandMore, MdExpandLess} from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

export default function Sidebar() {

  const navigate=useNavigate();

  const handleNavigate=(arg)=>{
    navigate(arg);
  }


  const[expand,setExpand]=useState(true)
  const handleExpand=()=> setExpand(!expand);
  const tran_data=[
                //  {label:"Funding History",link:"/user/funding_history"},
                 {label:"walletHistory",link:"/user/wallet_history"},
                 {label:"dataHistory",link:"/user/data_history"},
                 {label:"airtimeHistory",link:"/user/airtime_history"},
                 {label:"cableHistory",link:"/user/cable_history"},
                 {label:"billHistory",link:"/user/bill_history"},
                 {label:"smsHistory",link:"/user/sms_history"},
                 {label:"examPinHistory",link:"/user/education_history"}
                
                 ]

  const Transactions= ()=>{
    return (
      <div className='grid grid-cols-1 px-4'>
    {tran_data.map((item)=>{
      return (
        <li className='ml-2 mt-1 mb-1 italic'onClick={()=>handleNavigate(item.link)}>{item.label}</li>
      )
    })}
      </div>

    )
  }
  return (
    <aside className='h-screen  w-4/6 md:w-1/4  col-span-1 rounded-lg text-white cursor-pointer overflow-y-auto bg-slate-900 px-4'>
        <section className='p-5'>
          <div className='flex justify-start'onClick={()=>handleNavigate('/user/dashbord')}>
            <div className='text-3xl'>{<FaHome/>}</div><div className='mt-1 ml-1'>Dashbord</div>
          </div>
          <div className='flex justify-start mt-2'onClick={()=>handleNavigate('/user/data')}>
            <div className='text-3xl'>{<FaWifi/>}</div><div className='mt-1 ml-1'>Data</div>
          </div>
          <div className='flex justify-start mt-2' onClick={()=>handleNavigate('/user/airtime')}>
            <div className='text-3xl'>{<TbPhoneCall/>}</div><div className='mt-1 ml-1'>Airtime</div>
          </div>
          <div className='flex justify-start mt-2'onClick={()=>handleNavigate('/user/bill')}>
            <div className='text-3xl'>{<IoBulb/>}</div><div className='mt-1 ml-1'>Bill</div>
          </div>
          <div className='flex justify-start mt-2'onClick={()=>handleNavigate('/user/education')}>
            <div className='text-3xl'>{<FaGraduationCap/>}</div><div className='mt-1 ml-1'>Result Checker</div>
          </div>
          <div className='flex justify-start mt-2' onClick={()=>handleNavigate('/user/sms')}>
            <div className='text-3xl'>{<FaSms/>}</div><div className='mt-1 ml-1'>Bulk Sms</div>
          </div>
          <div className='flex justify-start mt-2' onClick={()=>handleNavigate('/user/cable')}>
            <div className='text-3xl'>{<FaSatelliteDish/>}</div><div className='mt-1 ml-1'>CableTv</div>
          </div>
          <div className='flex justify-start mt-2'>
            <div className='text-3xl'>{<IoAnalyticsOutline/>}</div><div className='mt-1 ml-1 flex' onClick={handleExpand}>Transactions<p className=' ml-1 text-3xl '>{expand?<MdExpandMore/>:<MdExpandLess/>}</p></div>
          </div>
          <div className=''>
            {!expand&&<Transactions/>}
          </div>
          <div className='flex justify-start mt-2'>
            <div className='text-3xl' >{<FaCode/>}</div><div className='mt-1 ml-1'>API</div>
          </div>
        </section>
    </aside>
  )
}
