import {React,useState,useEffect} from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import {v4 as uuidv4} from 'uuid'
import { useNavigate } from 'react-router-dom'

export default function Main_sms() {

  const showAlert=()=>{
    Swal.fire({
      title: 'success',
      text: 'Changes have been saved successfully',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }


  const [formData, setFormData] = useState([]);

  const navigator = useNavigate();
  //check if there is session

  useEffect(() => {

    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/admin_session`, { withCredentials: true })
      .then(response => {
        const mydata = response.data
        if (!mydata.session) {
          navigator("/")
        }

      })

  }, [])


  useEffect(() => {
    // Fetch form data from MongoDB
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/smsSetting`)
      .then(response => {
        if(response.data.length===0){
          setFormData([{charge: '', api:'', enable:true }])
        }else{
        setFormData(response.data)
        }
        
      }
        )
      .catch(error => console.error(error));
  }, []);

  

  const handleInputChange = (index,field, value) => {
    if(field==='enable'){
    const updatedFormData = [...formData];
    updatedFormData[index][field] = !value;
    setFormData(updatedFormData);

    }else{
      const updatedFormData = [...formData];
      updatedFormData[index][field] = value;
      setFormData(updatedFormData);
    }
    
  };

  
  const handleSaveFormData = (e) => {
    e.preventDefault();

    axios.post(`${process.env.REACT_APP_SERVER_URL}/api/smsSetting`, formData)
      .then(response => console.log(response))
      .then(showAlert())
      .catch(error => console.error(error));

  };

  
  return (

    <section className='flex-1 bg-white grid grid-cols-1 gap-0 '>
      <div className='mt-6 mb-4 text-xl p-6  text-center text-green-600 font-mono font-extrabold shadow-2xl mx-auto'>Bulk SMS Setting</div>

         {formData.map((item, index)=>{
          return (
            <div className='mb-6 font-mono md:mx-20 mx-4 md:p-16 p-10 rounded-3xl shadow-3xl flex flex-col justify-center items-center md:grid md:grid-cols-2 bg-slate-100 md: gap-x-8 '>
          
          <div className='mb-4 grid grid-cols-3'>
            <label>Charge</label>
            <input value={item.charge} onChange={(e)=>handleInputChange(index,'charge',e.target.value)} placeholder='Charge per sms' type='text' className=' md:-ml-6 placeholder:text-center col-span-2 outline-none rounded-xl h-14 appearance-none border border-gray-500' />
          </div>
          <div className='mb-4 grid grid-cols-3'>
              <label>Choose API</label>
              <select onChange={(e) => handleInputChange(index, 'api', e.target.value)} className='col-span-2 text-center w-full  h-14 rounded-xl bg-white border border-slate-400'>
                <option>Choose API</option>
                <option selected={item.api == 'api1' && true} value='api1'>API1</option>
                <option selected={item.api == 'api2' && true} value='api2'>API2</option>
                <option selected={item.api == 'api3' && true} value='api3'>API3</option>
              </select>
            </div>
          
          <div className='mb-4 grid grid-cols-3'>
          <input checked={item.enable} onChange={(e)=>handleInputChange(index,'enable', item.enable)} placeholder='Actual Price' type='checkbox' className='w-1/4 h-4 outline-none ml-2 rounded-xl  border border-gray-500' />
            <label className='col-span-2  md:-ml-6'>Disenable this Service</label>
            
          </div>
          <div className='mb-4 md:mb-0 col-span-2 flex justify-center mt-4'>
            <button onClick={handleSaveFormData}  className='bg-blue-800 text-white h-12 rounded-xl w-28 hover:bg-blue-500 p-2'>Submit</button>
          </div>
  
        </div>

          )
         })}      
                
      
    </section>
  )
}
