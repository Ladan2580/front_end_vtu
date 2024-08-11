import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';


function Login() {

  const navigate = useNavigate();
  const handleNavigate = (value) => {
    navigate(value)
  }

  const [toggleEye, setToggleEye] = useState(true);
  const handleToggleEye = () => {
    setToggleEye(!toggleEye);

  }

  const showAlert=(data)=>{
    Swal.fire({
      title: data.subject,
      text: data.message,
      icon: data.success,
      confirmButtonText: 'OK'
    })
  }

  const [toggler, setToggler] = useState(false)

  const handleToggler = () => {
    setToggler(!toggler)

  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleToggler()
    const username = e.target.username.value
    const password = e.target.password.value
    const data = { username, password }
    //console.log(data)

    axios.post(`${process.env.REACT_APP_SERVER_URL}/api/login`, data,{withCredentials:true})
      .then(Response=>
       { 
        setToggler(false)
      const dataLoad= Response.data
      if(dataLoad.success==="success" && dataLoad.path==="admin"){
        setTimeout(()=>{
          
          navigate("/auth/dashbord")
          showAlert(dataLoad)
        },3000)
      }else if(dataLoad.success==="success" && dataLoad.path==="user"){

        setTimeout(()=>{
          
          navigate("/user/dashbord")
          showAlert(dataLoad)
        },3000)
        
      }
      showAlert(dataLoad)
}
      )

      .catch(error => console.error(error.message))
    //console.log(e.target.username.value)


  }


  return (
    <section className='flex h-screen cursor-pointer'>
      <section className='w-1/4 bg-green-600  hidden md:block'>
        <div className=' mt-60 ml-6  text-white font-mono font-bold text-2xl italic'>Welcome!, we are here to serve you better</div>
      </section>
      <section className='flex-1 bg-gray-200 flex justify-center '>
        <div className='flex justify-center items-center w-10/12 md:w-3/5' >
          <div className='bg-white w-full flex justify-center rounded-3xl text-black '>
            <form className=' flex justify-center w-full flex-col' onSubmit={(e) => handleSubmit(e)}>
              <div className='text-center h-12 rounded mt-4 font-mono font-bold text-3xl'>Login Panel</div>

              <div className='mt-4 w-full flex justify-center '>
                <input name='username' placeholder='Enter your Username' className=' placeholder:text-sm shadow-2xl w-10/12 h-14 text-center rounded-2xl placeholder:text-center  border border-green-800 appearance-none outline-none font-mono text-lg font-semibold ' type='text' />
              </div>
              <div className='mt-5 w-full flex justify-center '>
                <input name='password' placeholder='Enter your Password' className=' placeholder:text-sm shadow-2xl w-10/12 h-14  text-center rounded-2xl placeholder:text-center  appearance-none border border-green-800 outline-none font-mono text-lg font-semibold ml-6' type={toggleEye ? "password" : "text"} /><div className='mt-4 text-lg' onClick={handleToggleEye}>{toggleEye ? <FaEye /> : <FaEyeSlash />}</div>
              </div>
              <div className='flex  justify-around mt-6'>
                <div className='flex text-sm'>
                  <div><input type='checkbox' className='form-checkbox border-2 border-green-500 bg-green-200' /></div>
                  <div className='text-md ml-2 italic '>Remember me</div>
                </div>
                <div className='text-md text-green-700 italic' onClick={() => handleNavigate("/forgot")}> forgot password?</div>
              </div>
              <div className='mt-5 w-full flex justify-center  mb-8'>
                <button disabled={toggler} className='bg-green-800 rounded-2xl h-14 w-3/5 hover:0 text-white text-lg italic'>{toggler ? "Please Wait..." : "Submit"}</button>
              </div>
              <div className='text-center h-12 rounded mt-4 font-serif font-bold text-md mb-4' onClick={() => handleNavigate("/register")}>don't have an account yet?<p className='text-green-700 italic'>Register now</p></div>
            </form>

          </div>
        </div>
      </section>
    </section>
  )
}

export default Login