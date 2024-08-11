import {React,useState,useEffect} from 'react'
import Swal from 'sweetalert2';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
//import {v4 as uuidv4} from 'uuid'

export default function Main_data() {
  
  const showAlert=()=>{

    Swal.fire({
      title: 'success',
      text: 'Changes have been saved successfully',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  
  }
  const[reseller,setReseller]=useState([{package:'', airtime_name:'',percentage:''}])
  
  const [params,setParams]=useState({package:'', airtime_name:'',percentage:''})

  const handleResellerChange=(field,value)=>{
     setParams({...params,[field]:value})
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
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/airtimeNameSetting`)
      .then(response => setFormData(response.data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
   
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/airtimePlanSetting`,{params})
      .then(response => //setReseller(response.data)
        {
          if(response.data.length===0){
          
            setReseller([{package:'', airtime_name:'',percentage:''}])
          }else{
            setReseller(response.data)
          }
               
        }
      
      )
      .catch(error => console.error(error))
  }, [params]);



  const handleInputChange = (index, field, value) => {
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

  const handleAddField = () => {
    setFormData([...formData, { rest_id: '', api_id: '', airtime_name: '', api:'', enable:true }]);
  };

  const handleSaveFormData = (e) => {
    e.preventDefault();
    //console.log({reseller,formData});

    axios.post(`${process.env.REACT_APP_SERVER_URL}/api/airtimeNameSetting`, formData)
      .then(response => console.log(response))
      .then(showAlert())
      .catch(error => console.error(error));

  };
  const handleSaveFormData2 = (e) => {
    e.preventDefault();
    //console.log({reseller,formData});

    axios.post(`${process.env.REACT_APP_SERVER_URL}/api/airtimePlanSetting`, params)
      .then(response => console.log(response))
      .then(showAlert())
      .catch(error => console.error(error));

  };

  const handleRemoveField = (index) => {
    const updatedFormData = [...formData];
    updatedFormData.splice(index, 1);
    setFormData(updatedFormData);

  };

  return (

    <section className='flex-1 bg-white grid grid-cols-1 gap-0 '>
      <div className='mt-6 mb-4 font-extrabold text-xl p-6 mx-auto shadow-2xl text-center text-green-600 font-mono rounded-3xl'>Airtime Settings</div>
      {formData.map((data,index)=>(
          <div key={index} className='mb-6 font-mono md:mx-20 mx-4 md:p-16 p-10 rounded-3xl shadow-3xl flex flex-col justify-center items-center md:grid md:grid-cols-2 bg-slate-100 md: gap-x-8 '>
          <div className='mb-4 grid grid-cols-3'>
            <label>rest id</label>
            <input value={data.rest_id} onChange={(e)=>handleInputChange(index,'rest_id',e.target.value)} placeholder='rest id' type='text' className='placeholder:text-center text-center text-lg  col-span-2 outline-none bg-gray-50 ml-2 rounded-xl h-14 appearance-none border border-gray-500' />
          </div>
          <div className='mb-4 grid grid-cols-3'>
            <label>Api id</label>
            <input value={data.api_id} onChange={(e)=>handleInputChange(index,'api_id',e.target.value)} placeholder='Api id' type='text' className='placeholder:text-center text-center text-lg col-span-2 outline-none ml-2 rounded-xl h-14 appearance-none border border-gray-500' />
          </div>
          <div className='mb-4 grid grid-cols-3'>
            <label>Airtime Name</label>
            <input value={data.airtime_name} onChange={(e)=>handleInputChange(index,'airtime_name',e.target.value)} placeholder='Airtime Name' type='text' className='placeholder:text-center text-center text-lg col-span-2 outline-none ml-2 rounded-xl h-14 appearance-none border border-gray-500' />
          </div>
          
          <div className='mb-4 grid grid-cols-3'>
            <label>Choose API</label>
          <select onChange={(e) =>handleInputChange(index, 'api', e.target.value)} className='col-span-2 text-center w-full  h-14 rounded-xl bg-white border border-slate-400'>
          <option>Choose API</option>
          <option selected={data.api=='api1'&&true} value='api1'>API1</option>
          <option selected={data.api=='api2'&&true} value='api2'>API2</option>
          <option selected={data.api=='api3'&&true} value='api3'>API3</option>
        </select>
          </div>
          <div className='mb-4 grid grid-cols-3'>
          <input checked={data.enable} onChange={(e)=>handleInputChange(index,'enable', data.enable)} placeholder='Actual Price' type='checkbox' className='w-1/4 h-4 outline-none ml-2 rounded-xl  border border-gray-500' />
            <label className='col-span-2'>Disenable this Service</label>
            
          </div>
          <div className='mb-4 md:mb-0 col-span-2 flex justify-center'>
            <button onClick={()=>handleRemoveField(index)} className='bg-red-700 text-white h-14 rounded-xl w-28 hover:bg-red-500'>remove</button>
          </div>
  
        </div>
        ))}
        <div className='h-32 flex justify-around items-center mb-6 bg-slate-100 mx-4 rounded-xl'>
        <button onClick={handleAddField} className='flex items-center justify-center bg-blue-900 text-white h-12 p-4 rounded-2xl hover:bg-blue-600'>Add_airtime_name</button>
        <button onClick={handleSaveFormData} className='bg-green-900 flex items-center justify-center text-white h-12 p-4 rounded-2xl w-36 hover:bg-green-600'>Submit</button>
      </div>

      <div className='flex flex-col md:flex-row md:justify-around rounded-2xl mt-14 mb-2 bg-slate-100 md:mx-10 md:px-40 mx-12 px-12 py-2'>
        <select onChange={(e) =>handleResellerChange('package',e.target.value)} className=' text-center ml-2 mt-4 mb-4  h-14 rounded-xl bg-white border border-slate-400'>
        <option>Choose Reseller</option>
          <option value='api'>API</option>
          <option value='diamond'>Diamond</option>
          <option value='gold'>Gold</option>
          <option value='silver'>Silver</option>
        </select>
        <select onChange={(e) =>handleResellerChange('airtime_name',e.target.value)} className='text-center ml-2 mt-4 mb-4  h-14 rounded-xl bg-white border border-slate-400'>
        <option selected>Choose Airtime type</option>
          {formData.map((item)=>{
            return (
              <option>{item.airtime_name}</option>
            )
          }
          )}
        </select>
       
        {reseller.map((item)=>{
            return (
              <input defaultValue={item.percentage}  onChange={(e) =>handleResellerChange('percentage',e.target.value)} placeholder='discount(%)' type='text' className=' text-center placeholder:text-center text-lg appearance-none outline-none mt-4 mb-4 h-14 rounded-xl bg-white border border-slate-400'/>

            )
          }
          )}

      
        
      </div>
    
        
      <div className='h-32 flex justify-center items-center mb-6'>
        <button onClick={handleSaveFormData2} className='flex items-center justify-center bg-blue-900 text-white h-12 p-4 rounded-2xl hover:bg-blue-600 w-3/6 '>Submit</button>
       
      </div>
    


    </section>
  )
}
