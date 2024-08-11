import React from 'react'
import { useState, useEffect} from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function Main_data({toggleValidator,details}) {

  const showAlert=(status,message,icon)=>{
    Swal.fire({
      title: status,
      text: message,
      icon: icon,
      confirmButtonText: 'OK'
    });
  }

  const navigator = useNavigate();
  //check if there is session

  useEffect(() => {

    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getrequestuser/user_session`, { withCredentials: true })
      .then(response => {
        const mydata = response.data
        if (!mydata.session) {
          navigator("/")
        }

      })

  }, [])

  const [toggler, setToggler] = useState(false)

  const handleToggler = () => {
    setToggler(!toggler)

  }
  
    const handleEdit=()=>{
        toggleValidator(false);

    }

    const handleSubmit=()=>{
      handleToggler()
      axios.post(`${process.env.REACT_APP_SERVER_URL}/api/data`, details , {withCredentials:true})
      .then(result => {
        const data = result.data
        if (data.status === "success" || data.status === "process") {
          
          showAlert(data.status, data.message, "success")
        } else {
          showAlert(data.status, data.message, "error")
          
        }
        setToggler(false)
        
      })
      .catch(err=>console.error(err))
        
    }
  
  return (

    <section className='flex flex-1 justify-center  shadow-2xl h-screen items-center rounded-2xl '>

      <div className='bg-white shadow-2xl w-4/5 md:w-2/6 flex justify-center flex-col rounded-xl text-black mt-10 '>
      <div className='text-center bg-green-400 h-12 rounded text-white font-mono text-lg'>Details Confirmation!</div>
        <div className='mt-5 w-full flex justify-center'>
            <div className='text-md font-bold font-mono italic'>Data Type: {details.data_name}</div>
        </div>
        <div className='mt-2 w-full flex justify-center'>
            <div className='text-md font-bold font-mono italic'>Bundle: {details.price_label}</div>
        </div>
        <div className='mt-2 w-full flex justify-center'>
            <div className='text-lg font-bold font-mono italic'>Phone: {details.phone}</div>
        </div>
        <div className='mt-3 w-full flex justify-center'>
            <button onClick={handleEdit} type='button' className='text-center bg-red-700 rounded-2xl h-12 w-3/5 hover:bg-red-500 text-white text-lg'>Edit</button>
        </div>        

        <div className='mt-5 w-full flex justify-center  mb-8'>
            <button disabled={toggler} onClick={handleSubmit} type='button' className='italic text-center bg-green-700 rounded-2xl h-12 w-3/5 hover:0 text-white text-lg'>{toggler ? "Please Wait..." : "Submit"}</button>
        </div>        

      </div>
    </section>
  )


  
}
