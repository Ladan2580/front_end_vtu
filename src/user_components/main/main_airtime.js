import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
export default function Main_data({ toggleValidator, handleDetails,handleDetails2 }) {

  const [dataName, setDataName] = useState([]);
  const [airtimePlan, setAirtimePlan] = useState(null)
  const[reseller,SetReseller]=useState({reseller:"api"})
  const [formData, setFormData] = useState({ airtime_name: '', amount: '', phone: '', pin: '' });
  
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


  useEffect(() => {
    // Fetching data names
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/airtimeNameSetting`,{withCredentials:true})
      .then(response => setDataName(response.data))
       .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    const params={package:reseller.reseller,airtime_name:formData.airtime_name}
    // Fetch form data from MongoDB
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getrequestuser/reseller`,{withCredentials:true})
    .then(response=>SetReseller(response.data))
    .then(
      axios.get(`${process.env.REACT_APP_SERVER_URL}/api/airtimePlanSetting`,{params}, {withCredentials:true})
      .then(response => {
        setAirtimePlan(response.data)
       // console.log(response.data)
      })
      .catch(error => console.error(error))
    )
    .catch(error => console.error(error))
  },[formData])


  const handleDataNameChange = (field, value) => {
    if(value===""){
      return
    }
    if(field==='airtime_name'){
    
      const mySender= dataName.find(item=>item.airtime_name===value)
      setFormData({...formData,[field]:value,net_id:mySender.api_id,api:mySender.api})


    }else{
      setFormData({ ...formData, [field]: value })

    }
    


  }
  const handleSubmit = () => {

    //const fullData = Object.assign({}, formData);
    handleDetails(formData);
    handleDetails2(airtimePlan[0]);
     toggleValidator(true);


   //console.log(airtimePlan[0]);

  }


  return (

    <section className='flex flex-1 justify-center  shadow-2xl  mb-8 items-center rounded-2xl '>

      <div className='bg-white shadow-2xl w-10/12 md:w-2/6 flex justify-center rounded-xl text-black mt-10 '>

        <form className=' flex justify-center w-full flex-col'>
          <div className='text-center bg-green-400 h-10 rounded text-white font-mono text-lg'>Airtime Transaction</div>
          <div className='mt-8 w-full flex justify-center '>
           
            <select onChange={(e) => { handleDataNameChange('airtime_name', e.target.value) }} className=' text-center  w-3/4 h-16 rounded-2xl border border-gray-900 placeholder:text-center outline-none font-mono text-md font-semibold bg-white'>
              <option selected >Select a network</option>
              {dataName.map((item) => {
                return (
                  <option disabled={item.enable} key={item.api_id} value={item.airtime_name}>{item.airtime_name}</option>
                )
              })}
            </select>
          </div>
          <div className='mt-5 w-full flex justify-center '>
            <input onChange={(e) => { handleDataNameChange('amount', e.target.value) }} placeholder='Enter an amount' className='text-center shadow-2xl  border border-gray-800 w-3/4 h-16 rounded-2xl placeholder:text-center appearance-none outline-none font-mono text-lg font-semibold ' type='text' />
          </div>
          <div className='mt-5 w-full flex justify-center '>
            <input onChange={(e) => { handleDataNameChange('phone', e.target.value) }} placeholder='Phone Number' className='text-center shadow-2xl  border border-gray-800 w-3/4 h-16 rounded-2xl placeholder:text-center appearance-none outline-none font-mono text-lg font-semibold ' type='text' />
          </div>

          <div className='mt-5 w-full flex justify-center '>
            <input onChange={(e) => { handleDataNameChange('pin', e.target.value) }} placeholder='Transaction Pin' className='text-center  border border-gray-800 w-3/4 h-16 rounded-2xl placeholder:text-center appearance-none outline-none font-mono text-lg font-semibold ' type='password' />
          </div>
          <div className='mt-5 w-full flex justify-center  mb-8'>
            <button type='button' onClick={handleSubmit} className='text-center bg-green-700 rounded-2xl h-14 w-3/5 hover:0 text-white'>Submit</button>
          </div>

        </form>

      </div>
    </section>
  )
}
