import { React, useState } from 'react'
import { FaBars } from 'react-icons/fa';
import { IoSettingsSharp } from 'react-icons/io5';
import { RxExit } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2';

export default function Header({ props }) {

  const navigate = useNavigate();

  const handleNavigate = (arg) => {
    navigate(arg);
  }

  const [toggle, setToggle] = useState(false);
  const handleClick = () => {
    setToggle(!toggle);
  }
  props(toggle);

  const handleSignOut = () => {

    Swal.fire({
      title: 'Dear Admin',
      text: 'You are about to logout will you like to proceed?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log me out!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/session_destroy`, { withCredentials: true })
          .then(response => {
            handleNavigate('/')
          })
          .catch(error => console.error(error));
      }
    });

  }

  return (
    <header className=' w-full h-14 bg-whitw shadow-2xl opacity-4  text-black text-center'>
      <div className='flex justify-between items-center mt-2'>
        <div className='ml-2 text-3xl cursor-pointer' onClick={handleClick}>{<FaBars />}</div>
        <div className='text-2xl font-extrabold font-mono cursor-pointer' onClick={() => handleNavigate('/auth/dashbord')}>Dashboard</div>
        <div className='mr-4 flex justify-between w-20'>
          <div className=' text-3xl cursor-pointer'>{<IoSettingsSharp />}</div>
          <div className='text-3xl cursor-pointer' onClick={handleSignOut}>{<RxExit />}</div>
        </div>
      </div>

    </header>

  )
}

