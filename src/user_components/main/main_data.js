import React from 'react'
import { useState, useEffect,useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function Main_data({toggleValidator, handleDetails}) {
  const [dataName,setDataName]=useState([]);
  const [dataPlan,setDataPlan]=useState([]);
  const [sender,setSender]=useState(null);
  const [formData,setFormData]=useState({data_name:'',net_id:'', phone:'',pin:''});
   const[reseller,SetReseller]=useState({reseller:"api"})
  const bundle=useRef(null);


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
    // Fetch form data from MongoDB
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/dataNameSetting`, {withCredentials:true})
      .then(response => setDataName(response.data)
      )
      .catch(error => console.error(error))
  }, []);

  useEffect(() => {
    const params={package:reseller.reseller,data_name:formData.data_name}
    // Fetch form data from MongoDB
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getrequestuser/reseller`, {withCredentials:true})
    .then(response=>SetReseller(response.data))
    .then(
      axios.get(`${process.env.REACT_APP_SERVER_URL}/api/dataPlanSetting`, {params}, {withCredentials:true},)
      .then(response => {
        setDataPlan(response.data)
      })
      .catch(error => console.error(error))
    )
    .catch(error => console.error(error))
    
  },[formData])


  const handleDataNameChange= (field,value)=>{
    if(value===""){
      return
    }
    
    if(field==='data_name'){
      const mySender= dataName.find(item=>item.data_name===value)
      setFormData({...formData,[field]:value,net_id:mySender.api_id,api:mySender.api})

    }else{
      setFormData({...formData,[field]:value})

    }
        

  }
  const handleDataNameChange2= (data)=>{
    

  const mySender= dataPlan.find(item=>item.api_id===parseInt(data));
   setSender(mySender);
    
   
  }
  const handleSubmit=()=>{
    const fullData= Object.assign({},sender,formData);
     handleDetails(fullData);
    toggleValidator(true);

    
    //console.log(fullData);

  }


  return (

    <section className='flex flex-1 justify-center  shadow-3xl mb-8 items-center rounded-2xl '>

      <div className='bg-white shadow-2xl w-4/5 md:w-2/6 flex justify-center rounded-xl text-black mt-10 ' onSubmit={(e) => e.preventDefault()}>

        <form className=' flex justify-center w-full flex-col'>
          <div className='text-center bg-green-400 h-10 rounded text-white font-mono text-lg'>Data Transaction</div>
          <div className='mt-8 w-full flex  justify-center '>
            <select onChange={(e)=>{handleDataNameChange('data_name',e.target.value)}} className='bg-white text-center  w-3/4 h-16 rounded-2xl border border-gray-900 placeholder:text-center outline-none font-mono text-md font-semibold '>
              <option defaultValue="">Select Network</option>
              {dataName.map((item)=>{
                return (
                  <option disabled={item.enable} key={item.data_name} value={item.data_name}>{item.data_name}</option>
                )
              })}
            </select>
          </div>
          <div className='mt-8 w-full flex justify-center '>
          <select ref={bundle} onChange={(e)=>{handleDataNameChange2(e.target.value)}} className='bg-white text-center  w-3/4 h-16 rounded-2xl border border-gray-900 placeholder:text-center outline-none font-mono text-md font-semibold '>
              <option defaultValue="">Select Bundle</option>
              {dataPlan.map((item)=>{
                return (
                  <option key={item.api_id} value={item.api_id}>{item.price_label}</option>
                )
              })}
            </select>
          </div>
          <div className='mt-5 w-full flex justify-center '>
            <input onChange={(e)=>{handleDataNameChange('phone',e.target.value)}} placeholder='Phone Number' className='text-center shadow-2xl  border border-gray-800 w-3/4 h-16 rounded-2xl placeholder:text-center appearance-none outline-none font-mono text-lg font-semibold ' type='text' />
          </div>
          <div className='mt-5 w-full flex justify-center '>
            <input onChange={(e)=>{handleDataNameChange('pin',e.target.value)}} placeholder='Transaction Pin' className='text-center  border border-gray-800 w-3/4 h-16 rounded-2xl placeholder:text-center appearance-none outline-none font-mono text-lg font-semibold ' type='password' />
          </div>
          <div className='mt-5 w-full flex justify-center  mb-8'>
            <button onClick={handleSubmit} className='text-center bg-green-700 rounded-2xl h-14 w-3/5 hover:0 text-white'>Submit</button>
          </div>

        </form>

      </div>
    </section>
  )
}
