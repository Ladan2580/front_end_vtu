import { React, useState, useEffect } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'

export default function Main_bill() {

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
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/billSetting`)
      .then(response => setFormData(response.data))
      .catch(error => console.error(error));
  }, []);

  
  const handleInputChange = (index, field, value) => {
    if (field === 'enable') {
      const updatedFormData = [...formData];
      updatedFormData[index][field] = !value;
      setFormData(updatedFormData);

    } else {
      const updatedFormData = [...formData];
      updatedFormData[index][field] = value;
      setFormData(updatedFormData);
    }

  };

  const handleAddField = () => {
    setFormData([...formData, { rest_id: '', api_id: '', biller_name: '', charge: '', api: '', enable: true }]);
  };

  const handleSaveFormData = (e) => {
    e.preventDefault();

    axios.post(`${process.env.REACT_APP_SERVER_URL}/api/billSetting`, formData)
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
      <div className='mt-6 text-xl p-6 rounded-2xl text-center text-green-600 font-mono font-extrabold mb-4 shadow-2xl'>Electricity Bill Settings</div>
      <form onSubmit={(e) => handleSaveFormData(e)}>
        {formData.map((data, index) => (
          <div key={index} className='mb-4 font-mono md:mx-20 mx-4 md:p-16 p-10 rounded-3xl shadow-3xl flex flex-col justify-center items-center md:grid md:grid-cols-2 bg-slate-100 md: gap-x-8 '>
            <div className='mb-4 grid grid-cols-3'>
              <label>rest id</label>
              <input value={data.rest_id} onChange={(e) => handleInputChange(index, 'rest_id', e.target.value)} name='rest_id' placeholder='rest id' type='text' className='placeholder:text-center text-center col-span-2 outline-none bg-gray-50 ml-2 rounded-xl h-14 appearance-none border border-gray-500' />
            </div>
            <div className='mb-4 grid grid-cols-3'>
              <label>API id</label>
              <input value={data.api_id} onChange={(e) => handleInputChange(index, 'api_id', e.target.value)} name='api_id' placeholder='API id' type='text' className='placeholder:text-center text-center col-span-2 outline-none ml-2 rounded-xl h-14 appearance-none border border-gray-500' />
            </div>
            <div className='mb-4 grid grid-cols-3'>
              <label>Biller Name</label>
              <input value={data.biller_name} onChange={(e) => handleInputChange(index, 'biller_name', e.target.value)} name='exam_name' placeholder='Biller Name' type='text' className='placeholder:text-center text-center col-span-2 outline-none ml-2 rounded-xl h-14 appearance-none border border-gray-500' />
            </div>
            <div className='mb-4 grid grid-cols-3'>
              <label>Charges</label>
              <input value={data.charge} onChange={(e) => handleInputChange(index, 'charge', e.target.value)} name='price' placeholder='charges per transaction' type='text' className='placeholder:text-center text-center col-span-2 outline-none ml-2 rounded-xl h-14 appearance-none border border-gray-500' />
            </div>
            <div className='mb-4 grid grid-cols-3'>
              <label>Choose API</label>
              <select onChange={(e) => handleInputChange(index, 'api', e.target.value)} className='col-span-2 text-center w-full  h-14 rounded-xl bg-white border border-slate-400'>
                <option>Choose API</option>
                <option selected={data.api == 'api1' && true} value='api1'>API1</option>
                <option selected={data.api == 'api2' && true} value='api2'>API2</option>
                <option selected={data.api == 'api3' && true} value='api3'>API3</option>
              </select>
            </div>
            <div className='mb-4 grid grid-cols-3'>
              <input checked={data.enable} onChange={(e) => handleInputChange(index, 'enable', data.enable)} name='enable' placeholder='Actual Price' type='checkbox' className=' w-1/4 h-4 outline-none ml-2 rounded-xl  border border-gray-500' />
              <label className='col-span-2'>Disnable this plan</label>

            </div>

            <div className='mb-4 md:mb-0 col-span-2 flex justify-center'>
              <button type='button' onClick={() => handleRemoveField(index)} className='bg-red-700 text-white h-10 rounded-xl w-28 hover:bg-red-500'>remove</button>
            </div>

          </div>
        ))}
        <div className='h-32 flex justify-around items-center mb-6'>
          <button type='button' onClick={handleAddField} className='bg-blue-900 text-white h-14 p-4 rounded-2xl hover:bg-blue-600'>Add_Biller</button>
          <button type='submit' className='bg-green-900 text-white h-14 p-4 rounded-2xl w-36 hover:bg-green-600'>Submit</button>
        </div>
      </form>

    </section>
  )
}
