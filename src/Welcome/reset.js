import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

function Reset() {

  const navigate = useNavigate();
  const handleNavigate = (value) => {
    navigate(value)
  }

  const [toggler, setToggler] = useState(false)

  const handleToggler = () => {
    setToggler(!toggler)

  }


  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const validator = params.get("validator");
  

  const [state, setState] = useState(false);

  const handleChangeState = () => {
    setState(!state);

  }

  const handleSubmit=(e)=>{
    handleToggler()
    e.preventDefault()
    const pwd = e.target.pwd.value
    const r_pwd = e.target.r_pwd.value
    const data = { pwd,r_pwd,validator}

    axios.post(`${process.env.REACT_APP_SERVER_URL}/api/reset`, data)
      .then(response=>{
        setToggler(false)
        showAlert(response.data)}
        
        )
      .catch(error => console.error(error))

  }
  const showAlert=(data)=>{
    Swal.fire({
      title: data.subject,
      text: data.message,
      icon: data.success,
      confirmButtonText: 'OK'
    })
  }

  

  return (
    <section className='flex h-screen cursor-pointer'>
      <section className='w-1/4 bg-green-600 h-screen hidden md:block'>
        <div className='  mt-60 ml-6  text-white font-mono font-bold text-2xl italic'>Welcome!, we are here to serve you better</div>
      </section>
      <section className='flex-1 bg-gray-200 flex justify-center '>
        <div className='flex justify-center items-center w-10/12 md:w-3/5' >
          <div className='bg-white w-full flex justify-center rounded-3xl text-black '>
            <form className=' flex justify-center w-full flex-col' onSubmit={(e) => handleSubmit(e)}>
              <div className='text-center h-12 rounded mt-4 font-mono font-bold text-3xl'>Password Reset</div>

              <div className='mt-5 w-full flex justify-center '>
                <input name='pwd' placeholder='New Password' className=' w-10/12 h-16 text-center rounded-2xl placeholder:text-center  appearance-none border border-green-950 outline-none font-mono text-md font-semibold ml-6' type={state?'password':'text'} /><div className='mt-3 text-xl' onClick={handleChangeState}>{state ? <FaEye /> : <FaEyeSlash />}</div>
              </div>
              <div className='mt-5 w-full flex justify-center '>
                <input name='r_pwd' placeholder='Repeat Password' className=' w-10/12 h-16 text-center rounded-2xl placeholder:text-center  appearance-none border border-green-950 outline-none font-mono text-md font-semibold ml-6' type={state?'password':'text'} /><div className='mt-3 text-xl' onClick={handleChangeState}>{state ? <FaEye /> : <FaEyeSlash />}</div>
              </div>

              <div className='mt-5 w-full flex justify-center  mb-8'>
                <button type='submit' className='bg-green-800 rounded-xl h-14 w-3/5 hover:0 text-white' disabled={toggler}>{toggler ? "Please Wait..." : "Submit"}</button>
              </div>
              <div className='text-center h-12 rounded mt-2 font-serif font-bold text-sm mb-4' onClick={() => handleNavigate("/")}>have reset your Password?<p className='text-green-700 italic text-md'>proceed to login</p></div>
            </form>

          </div>
        </div>
      </section>
    </section>
  )
}

export default Reset