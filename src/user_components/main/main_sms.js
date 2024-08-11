import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

export default function Main_data() {
  //const [dataName, setDataName] = useState([]);
  const showAlert = (status, message, icon) => {
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


  const [formData, setFormData] = useState({ subject: '', body: '', numbers: '', pin: '' });


  const handleDataNameChange = (field, value) => {
    setFormData({ ...formData, [field]: value })


  }
  const handleSubmit = () => {

    handleToggler()
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/smsSetting`, { withCredentials: true })
      .then(response => {
        const data = response.data
        const dataObj = data[0]
        const fullData = Object.assign({}, dataObj, formData)
        console.log(fullData)
        return fullData
      })
      .then(fullData => {
        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/sms`, fullData, { withCredentials: true })
          .then(result => {
            const data = result.data
            if (data.status === "success" || data.status === "process") {
              showAlert(data.status, data.message, "success")
            } else {
              showAlert(data.status, data.message, "error")
            }
            setToggler(false)
          })
          .catch(err => console.error(err.message))

      })
      .catch(err => console.log(err))

    // console.log(formData);
  }


  return (

    <section className='flex flex-1 justify-center  shadow-2xl mb-10  items-center rounded-2xl '>

      <div className='bg-white shadow-2xl w-4/5 md:w-3/6  flex justify-center rounded-xl text-black mt-10 '>

        <form className=' flex justify-center w-full flex-col'>
          <div className='text-center bg-green-400 h-10 rounded text-white font-mono text-lg'>Bulk SMS</div>
          <div className='mt-5 w-full flex justify-center '>
            <input onChange={(e) => { handleDataNameChange('subject', e.target.value) }} placeholder='Subject' className='text-center shadow-2xl  border border-gray-800 w-3/4 h-16 rounded-2xl placeholder:text-center appearance-none outline-none font-mono text-lg font-semibold ' type='text' />
          </div>
          <div className='mt-5 w-full flex justify-center '>
            <textarea onChange={(e) => { handleDataNameChange('body', e.target.value) }} placeholder='Message Body' className='text-center shadow-2xl  border border-gray-800 w-3/4 h-44 rounded-2xl   outline-none font-mono text-md font-semibold' type='textarea' />
          </div>
          <div className='mt-5 w-full flex justify-center '>
            <textarea onChange={(e) => { handleDataNameChange('numbers', e.target.value) }} placeholder='Phone Numbers separated by comma(,)' className='text-center shadow-2xl  border border-gray-800 w-3/4 h-44 rounded-2xl  outline-none font-mono text-md font-semibold ' type='textarea' />
          </div>
          <div className='mt-5 w-full flex justify-center '>
            <input onChange={(e) => { handleDataNameChange('pin', e.target.value) }} placeholder='4digit Pin' className='text-center shadow-2xl  border border-gray-800 w-3/4 h-16 rounded-2xl placeholder:text-center appearance-none outline-none font-mono text-lg font-semibold ' type='password' />
          </div>
          <div className='mt-5 w-full flex justify-center  mb-8'>
            <button disabled={toggler} type='button' onClick={handleSubmit} className='text-center bg-green-700 rounded-2xl h-14 w-3/5 hover:0 text-white italic '>{toggler ? "Please Wait..." : "Submit"}</button>
          </div>

        </form>

      </div>
    </section>
  )
}
