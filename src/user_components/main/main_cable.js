import React from 'react'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Main_data({ toggleValidator, handleDetails }) {
  const [dataName, setDataName] = useState([]);
  const [dataPlan, setDataPlan] = useState([]);

  const [sender, setSender] = useState(null);
  const [formData, setFormData] = useState({ cable_name: '', cable_id: '', iuc: '', pin: '', api: '' });
  const [reseller, SetReseller] = useState({ reseller: "api" })

  const bundle = useRef(null);

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
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/cableNameSetting`)
      .then(response => setDataName(response.data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    const params = { package: reseller.reseller, cable_name: formData.cable_name }
    // Fetch form data from MongoDB
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getrequestuser/reseller`, { withCredentials: true })
      .then(response => SetReseller(response.data))
      .then(
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/cablePlanSetting`, { params }, { withCredentials: true })
          .then(response => {
            setDataPlan(response.data)
          })
          .catch(error => console.error(error))
      )
      .catch(error => console.error(error))
  }, [formData]);


  const handleDataNameChange = (field, value) => {
    if (value === "") {
      return
    }

    if (field === 'cable_name') {
      const mySender = dataName.find(item => item.cable_name === value)
      setFormData({ ...formData, [field]: value, cable_id: mySender.api_id, api: mySender.api })

    } else {
      setFormData({ ...formData, [field]: value })

    }


  }
  const handleDataNameChange2 = (data) => {
    // const selected= bundle.current[bundle.current.selectedIndex].text;
    // setFormData({...formData,[field]:value,bundle:selected})


    const mySender = dataPlan.find(item => item.api_id === parseInt(data));
    setSender(mySender);

  }
  const handleSubmit = () => {

    let fullData = Object.assign({}, sender, formData);
    handleToggler();

    axios.post(`${process.env.REACT_APP_SERVER_URL}/api/cable_validator`, fullData, { withCredentials: true })
      .then(result => {
        const data = result.data
        if (data.status === "fail") {
          showAlert("Error Occured!", data.message, "error")

        } else {

           fullData = Object.assign({}, sender, formData, data);
          handleDetails(fullData);
          // console.log(data)
          // alert("api endpoint successfully accessed")
          toggleValidator(true);

        }
        setToggler(false)

        

      })
      .catch(err => console.log(err))


    //console.log(fullData);

  }


  return (

    <section className='flex flex-1 justify-center  shadow-3xl mb-10 items-center rounded-2xl '>

      <div className='bg-white shadow-2xl w-10/12 md:w-2/6 flex justify-center rounded-xl text-black mt-10 ' onSubmit={(e) => e.preventDefault()}>

        <form className=' flex justify-center w-full flex-col'>
          <div className='text-center bg-green-400 h-10 rounded text-white font-mono text-lg'>CableTV Transaction</div>
          <div className='mt-8 w-full flex  justify-center '>
            <select onChange={(e) => { handleDataNameChange('cable_name', e.target.value) }} className='bg-white text-center  w-3/4 h-16 rounded-2xl border border-gray-900 placeholder:text-center outline-none font-mono text-md font-semibold '>
              <option value="" selected>Select Cable Name</option>
              {dataName.map((item) => {
                return (
                  <option disabled={item.enable} value={item.cable_name}>{item.cable_name}</option>
                )
              })}
            </select>
          </div>
          <div className='mt-8 w-full flex justify-center '>
            <select ref={bundle} onChange={(e) => { handleDataNameChange2(e.target.value) }} className='bg-white text-center  w-3/4 h-16 rounded-2xl border border-gray-900 placeholder:text-center outline-none font-mono text-md font-semibold '>
              <option selected>Select Bundle</option>
              {dataPlan.map((item) => {
                return (
                  <option value={item.api_id}>{item.price_label}</option>
                )
              })}
            </select>
          </div>
          <div className='mt-5 w-full flex justify-center '>
            <input onChange={(e) => { handleDataNameChange('iuc', e.target.value) }} placeholder='IUC Number' className='text-center shadow-2xl  border border-gray-800 w-3/4 h-16 rounded-2xl placeholder:text-center appearance-none outline-none font-mono text-lg font-semibold ' type='text' />
          </div>
          <div className='mt-5 w-full flex justify-center '>
            <input onChange={(e) => { handleDataNameChange('pin', e.target.value) }} placeholder='Transaction Pin' className='text-center  border border-gray-800 w-3/4 h-16 rounded-2xl placeholder:text-center appearance-none outline-none font-mono text-lg font-semibold ' type='password' />
          </div>
          <div className='mt-5 w-full flex justify-center  mb-8'>
            <button disabled={toggler} onClick={handleSubmit} className='text-center bg-green-700 rounded-2xl h-12 w-3/5 hover:0 text-white italic '>{toggler ? "Please Wait..." : "Verify Iuc"}</button>
          </div>

        </form>

      </div>
    </section>
  )
}
