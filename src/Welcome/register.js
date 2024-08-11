import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useState } from 'react';



function Register() {

  const navigate = useNavigate();
  const handleNavigate = (value) => {
    navigate(value)
  }

  const [toggler, setToggler] = useState(false)

  const handleToggler = () => {
    setToggler(!toggler)

  }

  const showAlert=(data)=>{
    Swal.fire({
      title: data.subject,
      text: data.message,
      icon: data.success,
      confirmButtonText: 'OK'
    })
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    handleToggler()
    const data={
      full_name:e.target.full_name.value,
      username:e.target.username.value,
      phone:e.target.phone.value,
      email:e.target.email.value,
      pwd:e.target.pwd.value,
      r_pwd:e.target.r_pwd.value,
      pin:e.target.pin.value
    }

    axios.post(`${process.env.REACT_APP_SERVER_URL}/api/register`, data)
      .then(Response=>{
        setToggler(false)
       showAlert(Response.data)
      }
      )

      .catch(error => console.error(error))

  }

  return (
    <section className='flexcursor-pointer'>
        <section className=' flex-1  flex justify-center'>
        <div className='flex justify-center items-center w-full md:w-4/5 ' >
        <div className='bg-white w-full flex justify-center rounded-3xl text-black '>
                
      <form className=' justify-center w-4/5 grid grid-cols-6 gap-4 mb-8' onSubmit={(e)=>handleSubmit(e)}>
      <div className='col-span-6 flex justify-center mt-2 text-3xl font-mono font-bold'>Register for Free Now!</div>
      
        <div className='mt-2 col-span-6 md:col-span-3 '>
        <input name='full_name' placeholder='Full Name' className='w-full h-16 rounded-2xl shadow-lg placeholder:text-center  border border-green-600 appearance-none outline-none text-center font-mono text-lg font-semibold ' type='text'/>
        </div>
        <div className='mt-2  col-span-6 md:col-span-3 '>
        <input name='username' placeholder='Username' className='w-full h-16 rounded-2xl shadow-lg placeholder:text-center   border border-green-600 appearance-none outline-none text-center font-mono text-lg font-semibold ' type='text'/>
        </div>
        <div className='mt-2  col-span-6 md:col-span-4 '>
        <input name='email' placeholder='Email Address' className='w-full h-16 rounded-2xl shadow-lg placeholder:text-center   border border-green-600 appearance-none outline-none text-center font-mono text-lg font-semibold ' type='text'/>
        </div>
        <div className='mt-2  col-span-6  md:col-span-2 '>
        <input name='phone' placeholder='Phone Number' className='w-full h-16 rounded-2xl shadow-lg placeholder:text-center   border border-green-600 appearance-none outline-none text-center font-mono text-lg font-semibold ' type='number'/>
        </div>
        <div className='mt-2  col-span-6  md:col-span-3 '>
        <input name='pwd' placeholder='Password' className='w-full h-16 rounded-2xl shadow-lg placeholder:text-center   border border-green-600 appearance-none outline-none text-center font-mono text-lg font-semibold ' type='password'/>
        </div>
        <div className='mt-2  col-span-6  md:col-span-3 '>
        <input name='r_pwd' placeholder='Repeat Password' className='w-full h-16 rounded-2xl shadow-lg placeholder:text-center   border border-green-600 appearance-none outline-none text-center font-mono text-lg font-semibold ' type='password'/>
        </div>
        <div className=' col-span-6 md:col-span-2 '>
        <input name='pin' placeholder='4 digit pin' className='w-full h-16 rounded-2xl shadow-lg placeholder:text-center   border border-green-600 appearance-none outline-none text-center font-mono text-lg font-semibold ' type='text'/>
        </div>
        <div className='mt-2 md:col-span-4 col-span-6 flex items-center'>
         <button type='submit' className='bg-green-800 rounded-2xl shadow-lg h-14 w-full hover:0 text-white text-lg font-bold italic' disabled={toggler}>{toggler ? "Please Wait..." : "Submit"}</button>
        </div>
        <div className='col-span-6 flex justify-center mt-1 text-md font-bold cursor-pointer' onClick={()=>handleNavigate("/")}>already register?<p className='ml-2 text-green-700 italic'>Sign In now</p></div>
          
      </form>

    </div>
  </div>
        </section>
    </section>
  )
}

export default Register