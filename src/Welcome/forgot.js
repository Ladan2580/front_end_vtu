import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useState } from 'react';


function Forgot() {


  const [toggler, setToggler] = useState(false)

  const handleToggler = () => {
    setToggler(!toggler)

  }


  const showAlert = (data) => {
    Swal.fire({
      title: data.subject,
      text: data.message,
      icon: data.success,
      confirmButtonText: 'OK'
    })
  }

  const navigate = useNavigate();
  const handleNavigate = (value) => {
    navigate(value)
  }

  const handleSubmit = (e) => {

    e.preventDefault()
    handleToggler();
    const email = e.target.email.value
    const data = { email }
    
    axios.post(`${process.env.REACT_APP_SERVER_URL}/api/forgot`, data)
      .then(response => {
        setToggler(false)
        showAlert(response.data)
      }
      )

      .catch(error => console.error(error))



  }



  return (
    <section className='flex h-screen cursor-pointer'>
      <section className='w-1/4 bg-green-600 h-screen hidden md:block'>
        <div className=' mt-60 ml-6  text-white font-mono font-bold text-xl italic'>Welcome!, we are here to serve you better</div>
      </section>
      <section className='flex-1 bg-gray-200 flex justify-center '>
        <div className='flex justify-center items-center w-10/12 md:w-3/5'>
          <div className='bg-white w-full flex justify-center rounded-3xl text-black '>
            <form className=' flex justify-center w-full flex-col items-center' onSubmit={(e) => handleSubmit(e)}>
              <div className='text-center h-12 rounded mt-4 font-mono font-bold text-2xl'>Forgot Password</div>

              <div className='mt-5 w-full flex justify-center '>
                <input name='email' placeholder='Enter your email address' className=' text-center w-5/6 h-16 rounded-2xl placeholder:text-center  appearance-none border border-green-950 outline-none font-mono text-lg font-semibold ml-6' type='email' />
              </div>

              <div className='mt-5 w-full flex justify-center  mb-8'>
                <button className='bg-green-800 rounded-xl h-14 w-3/4 ml-4 justify-center hover:0 text-white' disabled={toggler}>{toggler ? "Please Wait..." : "Submit"}</button>
              </div>
              <div className='text-center h-12 rounded mt-2 font-serif font-bold text-md mb-4' onClick={() => handleNavigate("/")}>remembered your password?<p className='text-green-700 italic text-md'>proceed to login</p></div>
            </form>

          </div>
        </div>
      </section>
    </section>
  )
}

export default Forgot