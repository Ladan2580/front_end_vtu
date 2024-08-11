import {React, useState, useEffect} from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import {v4 as uuidv4} from 'uuid'
import { useNavigate } from 'react-router-dom';

export default function Main_data() {

  const showAlert=()=>{
    Swal.fire({
      title: 'success',
      text: 'Changes have been saved successfully',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }

  const [formData, setFormData] = useState([]);
  //const [newField, setNewField] = useState({ rest_id: '', api_id: '', exam_name: '', price: '', enable: '' });

  const[reseller, setReseller]=useState({package:'', data_name:''})
  
  const handleResellerChange=(field,value)=>{
    setReseller({...reseller,[field]:value})

  } 

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
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/dataNameSetting`)
      .then(response => setFormData(response.data))
      .catch(error => console.error(error));
  }, []);

  


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
    setFormData([...formData, {api:'', rest_id: '', api_id: '', data_name: '', enable:true }]);
  };

  const handleSaveFormData = (e) => {
    e.preventDefault();

    axios.post(`${process.env.REACT_APP_SERVER_URL}/api/dataNameSetting`, formData)
      .then(response => console.log(response))
      .then(showAlert())
      .catch(error => console.error(error));

  };

  const handleRemoveField = (index) => {
    const updatedFormData = [...formData];
    updatedFormData.splice(index, 1);
    setFormData(updatedFormData);

  };

  // second form data

  const [formData2, setFormData2] = useState([]);
  //const [newField, setNewField] = useState({ rest_id: '', api_id: '', exam_name: '', price: '', enable: '' });

  useEffect(() => {
    const params={package:reseller.package,data_name:reseller.data_name}
    // Fetch form data from MongoDB
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/dataPlanSetting`,{params})
      .then(response => {
        setFormData2(response.data)
        //console.log(response.data)
      })
      .catch(error => console.error(error));
  },[reseller]);

  

  const handleInputChange2 = (index, field, value) => {
    if(field==='enable'){
    const updatedFormData = [...formData2];
    updatedFormData[index][field] = !value;
    setFormData2(updatedFormData);

    }else{
      const updatedFormData = [...formData2];
      updatedFormData[index][field] = value;
      setFormData2(updatedFormData);
    }
    
  };

  const handleAddField2 = () => {
    setFormData2([...formData2, { rest_id: '', api_id: '', price_label:'', price:'', data_volume:'', profit:'', enable:true }]);
  };

  const handleSaveFormData2 = (e) => {
    e.preventDefault();
   
    axios.post(`${process.env.REACT_APP_SERVER_URL}/api/dataPlanSetting`, {data_name:reseller.data_name,package:reseller.package,formData2})
      .then(response => console.log(response))
      .then(showAlert())
      .catch(error => console.error(error));
    console.log(formData2);

  };

  const handleRemoveField2 = (index) => {
    const updatedFormData = [...formData2];
    updatedFormData.splice(index, 1);
    setFormData2(updatedFormData);

  };

  return (

    <section className='flex-1 bg-white grid grid-cols-1 gap-0 '>
      <div className='mt-6 mb-3 text-xl p-6 mx-auto text-center text-green-600 rounded-2xl shadow-2xl font-semibold bg-gray-100 font-mono'> Data Name Integration</div>
      
      {formData.map((data,index)=>(
          <div key={index} className='mb-6 font-mono md:mx-20 mx-4 md:p-16 p-8 rounded-3xl shadow-3xl flex flex-col justify-center items-center md:grid md:grid-cols-2 bg-slate-100 md: gap-x-8 '>
          <div className='mb-4 grid grid-cols-3'>
            <label>rest id</label>
            <input value={data.rest_id} onChange={(e) => handleInputChange(index, 'rest_id', e.target.value)} placeholder='rest id' type='text' className='placeholder:text-center col-span-2 outline-none text-center bg-gray-50 ml-2 rounded-xl h-14 appearance-none border border-gray-500' />
          </div>
          <div className='mb-4 grid grid-cols-3'>
            <label>Api id</label>
            <input value={data.api_id} onChange={(e) => handleInputChange(index, 'api_id', e.target.value)} placeholder='Api id' type='text' className='placeholder:text-center col-span-2 outline-none text-center ml-2 rounded-xl h-14 appearance-none border border-gray-500' />
          </div>
          <div className='mb-4 grid grid-cols-3'>
            <label>Data name</label>
            <input value={data.data_name} onChange={(e) => handleInputChange(index, 'data_name', e.target.value)} placeholder='Enter data name' type='text' className='placeholder:text-center col-span-2 outline-none text-center ml-2 rounded-xl h-14 appearance-none border border-gray-500' />
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
          <input checked={data.enable} onChange={(e) => handleInputChange(index, 'enable', data.enable)} placeholder='Actual Price' type='checkbox' className='w-1/4 h-4 outline-none text-center ml-2 rounded-xl  border border-gray-500' />
            <label className='col-span-2'>Disenable this Network</label>
            
          </div>
          <div className='mb-4 md:mb-0 col-span-2 flex justify-center'>
            <button onClick={()=>handleRemoveField(index)} className='bg-red-700 text-white h-10 rounded-xl w-28 hover:bg-red-500'>remove</button>
          </div>
  
        </div>
        ))}
        <div className='h-32 flex justify-around items-center mb-6 bg-slate-100 mx-4 rounded-xl'>
        <button onClick={handleAddField} className='flex items-center justify-center bg-blue-900 text-white h-12 p-4 rounded-2xl hover:bg-blue-600'>Add_data_name</button>
        <button onClick={handleSaveFormData} className='bg-green-900 flex items-center justify-center text-white h-12 p-4 rounded-2xl w-36 hover:bg-green-600'>Submit</button>
      </div>

      <div className='mt-6 mb-1 text-xl p-6 mx-auto text-center text-green-600 font-semibold shadow-2xl bg-gray-100 font-mono'>Data Plan Integration</div>
    
      <div className='grid grid-cols-1 rounded-2xl mt-16 mb-10 bg-slate-100 md:mx-40 md:px-40 mx-12 px-12 py-2'>
        <select onChange={(e) =>handleResellerChange('package',e.target.value)} className='text-center mt-4 mb-4  h-14 rounded-xl bg-white border border-slate-400'>
          <option>Choose Reseller</option>
          <option value='api'>API</option>
          <option value='diamond'>Diamond</option>
          <option value='gold'>Gold</option>
          <option value='silver'>Silver</option>
        </select>
        <select onChange={(e) =>handleResellerChange('data_name',e.target.value)} className='text-center mt-4 mb-4 h-14 rounded-xl bg-white border border-slate-400'>
          <option selected>Choose data type</option>
          {formData.map((item)=>{
            return (
              <option>{item.data_name}</option>
            )
          }
          )}
          </select>
        
      </div>
    
        {formData2.map((data,index)=>(
          <div key={index} className='mb-6 font-mono md:mx-20 mx-4 md:p-16 p-8 rounded-3xl shadow-3xl flex flex-col justify-center items-center md:grid md:grid-cols-2 bg-slate-100 md: gap-x-8 '>
          <div className='mb-4 grid grid-cols-3'>
            <label>User id</label>
            <input  value={data.rest_id} onChange={(e) => handleInputChange2(index, 'rest_id', e.target.value)} placeholder='user id' type='text' className='placeholder:text-center col-span-2 outline-none text-center bg-gray-50 ml-2 rounded-xl h-14 appearance-none border border-gray-500' />
          </div>
          <div className='mb-4 grid grid-cols-3'>
            <label>API id</label>
            <input  value={data.api_id} onChange={(e) => handleInputChange2(index, 'api_id', e.target.value)} placeholder='API id' type='text' className='placeholder:text-center col-span-2 outline-none text-center ml-2 rounded-xl h-14 appearance-none border border-gray-500' />
          </div>
          <div className='mb-4 grid grid-cols-3'>
            <label>Price Label</label>
            <input  value={data.price_label} onChange={(e) => handleInputChange2(index, 'price_label', e.target.value)} placeholder='Price label' type='text' className='placeholder:text-center col-span-2 outline-none text-center ml-2 rounded-xl h-14 appearance-none border border-gray-500' />
          </div>
          <div className='mb-4 grid grid-cols-3'>
            <label>Actual Price</label>
            <input  value={data.price} onChange={(e) => handleInputChange2(index, 'price', e.target.value)} placeholder='Actual Price' type='text' className='placeholder:text-center col-span-2 outline-none text-center ml-2 rounded-xl h-14 appearance-none border border-gray-500' />
          </div>
          <div className='mb-4 grid grid-cols-3'>
            <label>Data volume</label>
            <input  value={data.data_volume} onChange={(e) => handleInputChange2(index, 'data_volume', e.target.value)} placeholder='Data Volume' type='text' className='placeholder:text-center  col-span-2 outline-none text-center ml-2 rounded-xl h-14 appearance-none border border-gray-500' />
          </div>
          <div className='mb-4 grid grid-cols-3'>
            <label>My Profit</label>
            <input  value={data.profit} onChange={(e) => handleInputChange2(index, 'profit', e.target.value)} placeholder='My Profit' type='text' className='placeholder:text-center col-span-2 outline-none text-center ml-2 rounded-xl h-14 appearance-none border border-gray-500' />
          </div>
          <div className='mb-4 md:mb-0 col-span-2 flex justify-center'>
            <button onClick={()=>handleRemoveField2(index)} className='bg-red-700 text-white h-10 rounded-xl w-28 hover:bg-red-500'>remove</button>
          </div>
  
        </div>
        ))}
      <div className='h-32 flex justify-around items-center mb-6'>
        <button onClick={handleAddField2} className='bg-blue-900 text-white h-14 p-4 rounded-2xl hover:bg-blue-600'>Add_data_plan</button>
        <button onClick={handleSaveFormData2} className='bg-green-900 text-white h-14 p-4 rounded-2xl w-36 hover:bg-green-600'>Submit</button>
      </div>
    


    </section>
  )
}
