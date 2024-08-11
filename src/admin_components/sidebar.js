import React, { useState } from 'react'
import { FaHome,FaWifi,FaGraduationCap,FaSms,FaSatelliteDish,FaGreaterThan } from 'react-icons/fa'
import { TbPhoneCall } from 'react-icons/tb'
import { IoBulb,IoAnalyticsOutline } from 'react-icons/io5'
import { FaCode } from 'react-icons/fa'
import {MdExpandMore, MdExpandLess, MdManageAccounts} from 'react-icons/md'
import { useNavigate } from 'react-router-dom'


export default function Sidebar() {
  //navigator

  const navigate=useNavigate();

  const handleNavigate=(arg)=>{
    navigate(arg);
  }

  const[expand,setExpand]=useState(true)
  const handleExpand=()=> setExpand(!expand);
  const tran_data=[
                //  {label:"Funding History",link:"/auth/funding_history"},
                 {label:"walletHistory",link:"/auth/wallet_history"},
                 {label:"dataHistory",link:"/auth/data_history"},
                 {label:"airtimeHistory",link:"/auth/airtime_history"},
                 {label:"cableHistory",link:"/auth/cable_history"},
                 {label:"billHistory",link:"/auth/bill_history"},
                 {label:"smsHistory",link:"/auth/sms_history"},
                 {label:"examPinHistory",link:"/auth/edu_history"}
                
                 ]

  const Transactions= ()=>{
    return (
      <div className='grid grid-cols-1 px-4'>
    {tran_data.map((item)=>{
      return (
        <li className=' ml-2 mt-1 px-2 italic'onClick={()=>handleNavigate(item.link)}> {item.label}</li>
      )
    })}
      </div>

    )
  }
  return (
    <aside className='h-screen px-5 w-4/6 md:w-1/4  col-span-1 rounded-lg text-white shadow-5xl cursor-pointer overflow-y-auto bg-slate-900'>
        <section>
          <div className='flex justify-start' onClick={()=>handleNavigate('/auth/dashbord')}>
            <div className='text-3xl'>{<FaHome/>}</div><div className='mt-1 ml-1'>Dashbord</div>
          </div>
          <div className='flex justify-start mt-2'onClick={()=>handleNavigate('/auth/manage_users')}>
            <div className='text-3xl'>{<MdManageAccounts/>}</div><div className='mt-1 ml-1'>Manage Users</div>
          </div>
          <div className='flex justify-start mt-2'onClick={()=>handleNavigate('/auth/data_setting')}>
            <div className='text-3xl'>{<FaWifi/>}</div><div className='mt-1 ml-1'>Data Settings</div>
          </div>
          <div className='flex justify-start mt-2'onClick={()=>handleNavigate('/auth/airtime_setting')}>
            <div className='text-3xl'>{<TbPhoneCall/>}</div><div className='mt-1 ml-1'>Airtime Settings</div>
          </div>
          <div className='flex justify-start mt-2'onClick={()=>handleNavigate('/auth/bill_setting')}>
            <div className='text-3xl'>{<IoBulb/>}</div><div className='mt-1 ml-1'>Bill Settings</div>
          </div>
          <div className='flex justify-start mt-2'onClick={()=>handleNavigate('/auth/education_setting')}>
            <div className='text-3xl'>{<FaGraduationCap/>}</div><div className='mt-1 ml-1'>Education Settings</div>
          </div>
          <div className='flex justify-start mt-2' onClick={()=>handleNavigate('/auth/sms_setting')}>
            <div className='text-3xl'>{<FaSms/>}</div><div className='mt-1 ml-1'>Bulk Sms Settings</div>
          </div>
          <div className='flex justify-start mt-2'onClick={()=>handleNavigate('/auth/cable_setting')}>
            <div className='text-3xl'>{<FaSatelliteDish/>}</div><div className='mt-1 ml-1'>CableTv Settings</div>
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
