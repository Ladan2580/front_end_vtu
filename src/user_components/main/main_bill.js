import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Main_data({ toggleValidator, handleDetails   }) {


  const [dataName, setDataName] = useState([]);
  const [sender, setSender] = useState(null);
  const [formData, setFormData] = useState({ biller_name: '', amount: '', meter_type: '', meter_number: '', pin: '' });

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


  
  const showAlert = (status, message, icon) => {
    Swal.fire({
      title: status,
      text: message,
      icon: icon,
      confirmButtonText: 'OK'
    });
  }



  useEffect(() => {
    // Fetch form data from MongoDB
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/billSetting`, { withCredentials: true })
      .then(response => setDataName(response.data))
      .catch(error => console.error(error));
  }, []);


  const handleDataNameChange = (field, value) => {

    setFormData({ ...formData, [field]: value })

    const mySender = dataName.find(item => item.biller_name === value);
    setSender(mySender);



  }
  const handleDataNameChange2 = (field, value) => {

    setFormData({ ...formData, [field]: value })



  }

  const handleSubmit = () => {

    handleToggler()
    let fullData = Object.assign({}, sender, formData);
    //toggleValidator(true)
    console.log(fullData)
    
    axios.get(`https://a2zdataplug.com/api/bill/bill-validation?meter_number=${fullData.meter_number}&disco=${fullData.api_id}&meter_type=${fullData.meter_type}`)
      .then(result => {
        const data = result.data
       // console.log(data)
        fullData = Object.assign({}, sender, formData, data);
           handleDetails(fullData);
          toggleValidator(true);
          setToggler(false)
        

      })
      .catch(err =>{
        const data=err.response.data
        showAlert("Error Occured!", data.message, "error")
        setToggler(false)

      })

  }


  return (

    <section className='flex flex-1 justify-center  shadow-3xl  items-center rounded-2xl mb-8 '>

      <div className='bg-white shadow-2xl w-10/12 md:w-2/6 flex justify-center rounded-xl text-black mt-10 '>

        <form className=' flex justify-center w-full flex-col'>
          <div className='text-center bg-green-400 h-10 rounded text-white font-mono text-lg'>Bill Transaction</div>
          <div className='mt-8 w-full flex  justify-center '>
            <select onChange={(e) => { handleDataNameChange('biller_name', e.target.value) }} className='bg-white text-center  w-3/4 h-16 rounded-2xl border border-gray-900 placeholder:text-center outline-none font-mono text-md font-semibold '>
              <option selected>Select Biller</option>
              {dataName.map((item) => {
                return (
                  <option disabled={item.enable} value={item.biller_name}>{item.biller_name}</option>
                )
              })}
            </select>
          </div>
          <div className='mt-8 w-full flex  justify-center '>
            <select onChange={(e) => { handleDataNameChange2('meter_type', e.target.value) }} className='bg-white text-center  w-3/4 h-16 rounded-2xl border border-gray-900 placeholder:text-center outline-none font-mono text-md font-semibold '>
              <option selected>Select Meter_Type</option>
              <option value='prepaid'>pre_paid</option>
              <option value='postpaid'>Post_paid</option>
            </select>
          </div>
          <div className='mt-5 w-full flex justify-center '>
            <input onChange={(e) => { handleDataNameChange2('amount', e.target.value) }} placeholder='Enter an amount' className='text-center shadow-2xl  border border-gray-800 w-3/4 h-16 rounded-2xl placeholder:text-center appearance-none outline-none font-mono text-lg font-semibold ' type='text' />
          </div>
          <div className='mt-5 w-full flex justify-center '>
            <input onChange={(e) => { handleDataNameChange2('meter_number', e.target.value) }} placeholder='Meter Number' className='text-center shadow-2xl  border border-gray-800 w-3/4 h-16 rounded-2xl placeholder:text-center appearance-none outline-none font-mono text-lg font-semibold ' type='text' />
          </div>
          <div className='mt-5 w-full flex justify-center '>
            <input onChange={(e) => { handleDataNameChange2('pin', e.target.value) }} placeholder='Transaction Pin' className='text-center  border border-gray-800 w-3/4 h-16 rounded-2xl placeholder:text-center appearance-none outline-none font-mono text-lg font-semibold ' type='password' />
          </div>
          <div className='mt-5 w-full flex justify-center  mb-8'>
            <button disabled={toggler} type='button' onClick={handleSubmit} className='text-center bg-green-700 rounded-2xl h-14 w-3/5 hover:0 text-white'>{toggler ? "Please Wait..." : "Validate Meter"}</button>
          </div>

        </form>

      </div>
    </section>
  )
}
