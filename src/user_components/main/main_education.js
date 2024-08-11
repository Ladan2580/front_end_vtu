import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

export default function Main_data() {

  const showAlert=(status,message,icon)=>{
    Swal.fire({
      title: status,
      text: message,
      icon: icon,
      confirmButtonText: 'OK'
    });
  }
  
  const [dataName,setDataName]=useState([]);
  const [sender,setSender]=useState(null);
  const [formData,setFormData]=useState({exam_name:'', pin:''});


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


  useEffect(() => {
    // Fetch form data from MongoDB
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/formdata`,{withCredentials:true})
      .then(response => setDataName(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleDataNameChange= (field,value)=>{

    setFormData({...formData,[field]:value})

    const mySender= dataName.find(item=>item.exam_name===value);
       setSender(mySender);



}
  const handleDataNameChange2= (field,value)=>{
    setFormData({...formData,[field]:value})
    

  }
  const handleSubmit=()=>{
    const fullData= Object.assign({},sender,formData);
    handleToggler()
    axios.post(`${process.env.REACT_APP_SERVER_URL}/api/exam`,fullData,{withCredentials:true})
    .then(result => {
      const data = result.data
      if (data.status === "success" || data.status === "process") {

        showAlert(data.status, data.message, "success")
      } else {
        showAlert(data.status, data.message, "error")

      }
      setToggler(false)

    })
      .catch(error => console.error(error));
  }


  return (

    <section className='flex flex-1 justify-center  shadow-2xl  items-center rounded-2xl '>

      <div className='bg-white shadow-2xl w-4/5  md:w-3/6 flex justify-center rounded-xl text-black mt-10 '>

        <form className=' flex justify-center w-full flex-col'>
          <div className='text-center bg-green-400 h-12 rounded text-white font-mono text-lg'>Exam Pin Transaction</div>
          <div className='mt-8 w-full flex  justify-center '>
            <select onChange={(e)=>{handleDataNameChange('exam_name',e.target.value)}} className='bg-white text-center  w-10/12 h-16 rounded-2xl border border-gray-900 placeholder:text-center outline-none font-mono text-md font-semibold '>
              <option selected>Select Exam</option>
              {dataName.map((item,index)=>{
                return (
                  <option disabled={item.enable}  key={index} value={item.exam_name}>{item.exam_name}</option>
                )
              })}
            </select>
          </div>
          
          <div className='mt-5 w-full flex justify-center '>
            <input onChange={(e)=>{handleDataNameChange2('pin',e.target.value)}} placeholder='Transaction Pin' className='text-center  border border-gray-800 w-10/12 h-16 rounded-2xl placeholder:text-center appearance-none outline-none font-mono text-lg font-semibold ' type='password' />
          </div>
          <div className='mt-5 w-full flex justify-center  mb-8'>
            <button disabled={toggler} type='button' onClick={handleSubmit} className=' italic text-center bg-green-700 rounded-2xl h-14 w-3/5 hover:0 text-white text-lg'>{toggler ? "Please Wait..." : "Submit"}</button>
          </div>

        </form>

      </div>
    </section>
  )
}
