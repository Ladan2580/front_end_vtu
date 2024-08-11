import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Main_manage_users = () => {

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
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getrequest/user`)
      .then(response => {
        setItems(response.data)

      })
      .catch(error => console.error(error))
  }, [])

  const sweetAlert=(message,subject,icon)=>{
    Swal.fire({
      title: subject,
      text: message,
      icon: icon,
      confirmButtonText: 'OK'
    });
  }

  const handleFundingSubmit=(e)=>{
    e.preventDefault();
  
    if(e.target.action.value===""){
      sweetAlert("All form fields must be filled","there is an error","error")
      return;
    }
    const data={
      action:e.target.action.value,
      amount:parseInt(e.target.amount.value),
      username:e.target.username.value,
    }
    
    if(e.target.action.value==="credit"){
      axios.post(`${process.env.REACT_APP_SERVER_URL}/api/credituser`,data,{ withCredentials: true })
      .then(sweetAlert("user has been credited successfully","Success","success"))
      .catch(error => console.error(error))
    }else if(e.target.action.value==="debit"){
      axios.post(`${process.env.REACT_APP_SERVER_URL}/api/debituser`,data,{ withCredentials: true })
      .then(sweetAlert("user has been debited successfully","Success","success"))
      .catch(error => console.error(error))
    }

    
  }


  const deleteUser = (username) => {

    Swal.fire({
      title: 'Dear Admin',
      text: 'will you want to permanently delete this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, proceed!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/delete_user`,{username}, { withCredentials: true })
          .then(sweetAlert("user has been deleted successfully","Success","success"))
          .catch(error => console.error(error));
      }
    });

  }


  
  const handleEmailSubmit=(e)=>{
    e.preventDefault();
    let email;
    if(e.target.action.value===""){
      sweetAlert("All form fields must be filled","there is an error","error")
      return
    }
    else if(e.target.action.value==="one"){
      email=e.target.email.value
    }else if(e.target.action.value==="all"){
       email= items.map((item)=>item.email)
      
    }

    const data={
      action:e.target.action.value,
      username:e.target.username.value,
      email,
      subject:e.target.subject.value,
      body:e.target.body.value,
    }
    axios.post(`${process.env.REACT_APP_SERVER_URL}/api/emailuser`,data,{ withCredentials: true })
    .then(sweetAlert("Email notifications have been sent successfully","Success","success"))
    .catch(error => console.error(error))
  }

  const handleUpgradeSubmit=(e)=>{
    e.preventDefault();
    if(e.target.action.value===""){
      sweetAlert("All form fields must be filled","there is an error","error")
      return;
    }

    const data={
      action:e.target.action.value,
      username:e.target.username.value,
      
    }
    axios.post(`${process.env.REACT_APP_SERVER_URL}/api/upgradeuser`,data,{ withCredentials: true })
    .then(sweetAlert("All changes have been saved successfully","Success","success"))
    .catch(error => console.error(error))
   // console.log(data)
  }


  const [items, setItems] = useState([
    { id: 1, username: 'mango', category: 'A', email: 'ladanbashargwandu@gmail.com' },


  ]);

  const [filter, setFilter] = useState('');

  const filteredItems = items.filter(item =>
    item.username.toLowerCase().includes(filter.toLowerCase())
  );

  //console.log(filteredItems)

  const handleFilterChange = (event) => {
    setFilter(event.target.value);

  };

  const [info, setInfo] = useState({ username: '', email: '' })

  const showAlert = (val, obj) => {

    if (val === 'fund') {
      setManager({ first: true, second: false, third: false })
    }
    if (val === 'email') {
      setManager({ first: false, second: true, third: false })
    }
    if (val === 'upgrade') {
      setManager({ first: false, second: false, third: true })
    }
    setInfo(obj)
  }

  const cancel = () => {


    setManager({ first: false, second: false, third: false })


  }

  const [manager, setManager] = useState({ first: false, second: false, third: false });


  const Funding = ({ obj }) => {

    return (
      <form onSubmit={(e)=>handleFundingSubmit(e)}>
      <div className=' my-8 flex gap-4 flex-col  shadow-2xl md:flex-row md:items-center border border-green-600 p-6 rounded-2xl'>
       
        <select name='action' className='bg-white h-14 text-center rounded-2xl border border-slate-800'>
          <option value=''>Choose Action</option>
          <option value='credit'>Credit</option>
          <option value='debit'>Debit</option>
        </select>
        <input name='username' readOnly type='text' value={obj.username}  className='text-center rounded-xl h-14 p-5 shadow-2xl  w-full  appearance-none outline-none border border-slate-800' />
        <input name='amount' placeholder='Enter an amount' type='text' className='text-center rounded-xl h-14 p-5 shadow-2xl  w-full  appearance-none outline-none border border-slate-800' />
        <button type='submit' className='bg-green-800 text-center hover:bg-green-600  text-white h-12 w-full p-2 rounded-xl flex items-center justify-center'>Credit/Debit</button>
        <button onClick={cancel} className='bg-red-800 hover:bg-red-600 text-white h-10 w-full p-2 rounded-xl '>remove</button>

      </div>
      </form>
    )
  }


  const Email = ({ obj }) => {

    return (
    <form onSubmit={(e)=>handleEmailSubmit(e)}>
      <div className='my-8 mt-4 flex gap-4 flex-col  shadow-2xl md:flex-row md:items-center border border-green-600 p-6 px-12 rounded-2xl '>
        <select name='action' className='bg-white text-center h-16 rounded-2xl border border-slate-800'>
          <option Value="">Choose an action</option>
          <option value="one">Email only this user</option>
          <option value="all">Email All Users</option>
        </select>
        <input name='email' value={obj.email} type='hidden'/>
        <input name='username' type='text' readOnly value={obj.username} className=' text-center rounded-xl  h-14 p-5 shadow-2xl  w-full  appearance-none outline-none border border-slate-800' />
        <input name='subject' type='text' placeholder='Email Subject' className='text-center rounded-xl h-14 p-5 shadow-2xl  w-full  appearance-none outline-none border border-slate-800' />
        <textarea name='body' placeholder='Type your Message here' type='textarea' className=' text-justify rounded-xl h-60 p-5 shadow-2xl  w-full  appearance-none outline-none border border-slate-800' />
        <button type='submit' className='bg-green-800 hover:bg-green-600 text-center  text-white h-12 w-full p-3 rounded-xl flex items-center justify-center'>Send Email</button>
        <button onClick={cancel} className='bg-red-800 hover:bg-red-600 text-white h-10 w-full p-2 rounded-xl '>remove</button>
      </div>
      </form>
    )
  }
  const Upgrade = ({ obj }) => {

    return (
      <form onSubmit={(e)=>handleUpgradeSubmit(e)}>
      <div className='my-8 mt-4 flex gap-4 flex-col  shadow-2xl md:flex-row md:items-center border border-green-600 p-6 px-12 rounded-2xl justify-center'>
        <select name='action' className=' bg-white text-center h-16 p-2 rounded-2xl border border-slate-800'>
          <option value=''>Choose reseller type</option>
          <option value='api'>API</option>
          <option value='diamond'>Diamond</option>
          <option value='gold'>Gold</option>
          <option value='silver'>Silver</option>
        </select>
        <input name='username' type='text' readOnly value={obj.username} className=' text-center rounded-xl h-14 p-5 shadow-2xl  w-full  appearance-none outline-none border border-slate-800' />
        <button type='submit' className='bg-green-800 text-center hover:bg-green-600  text-white h-14 w-full p-3 rounded-xl flex items-center justify-center'>Upgrade User</button>
        <button onClick={cancel} className='bg-red-800 hover:bg-red-600 text-white h-14 w-full p-2 rounded-xl '>remove</button>
      </div>
      </form>
    )
  }

  return (
    <div className='flex flex-col items-center mb-48'>
      <div className='text-2xl'>Users Management</div>
      <div className='mt-5 w-full md:w-2/5 flex justify-center '>
        <input onChange={(e) => handleFilterChange(e)} placeholder='search by username' className='text-center shadow-2xl  border border-gray-800 w-3/4 h-16 rounded-2xl placeholder:text-center appearance-none outline-none font-mono text-lg font-semibold ' type='text' />
      </div>
      <div>{manager.first ? <Funding obj={info} /> : manager.second ? <Email obj={info} /> : manager.third && <Upgrade obj={info} />}</div>
      <div className='container mt-5 w-fullflex justify-center overflow-x-auto'>
        <table className="table-auto w-full border-collapse border border-gray-800">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-gray-800 text-gray-300">Username</th>
              <th className="px-4 py-2 bg-gray-800 text-gray-300">Email</th>
              <th className="px-4 py-2 bg-gray-800 text-gray-300">Phone</th>
              <th className="px-4 py-2 bg-gray-800 text-gray-300">walletBalance</th>
              <th className="px-4 py-2 bg-gray-800 text-gray-300">resellerType</th>
              <th className="px-4 py-2 bg-gray-800 text-gray-300">sendEmail</th>
              <th className="px-4 py-2 bg-gray-800 text-gray-300">Credit/Debit</th>
              <th className="px-4 py-2 bg-gray-800 text-gray-300">Upgrade</th>
              <th className="px-4 py-2 bg-gray-800 text-gray-300">Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => {
              return (
                <tr>
                  <td className="border px-4 py-2">{item.username}</td>
                  <td className="border px-4 py-2">{item.email}</td>
                  <td className="border px-4 py-2">{item.phone}</td>
                  <td className="border px-4 py-2 font-mono font-bold text-md">{item.wallet}</td>
                  <td className="border px-4 py-2 font-mono font-bold text-md">{item.reseller}</td>
                  <td className="border px-4 py-2 text-center"><button className='bg-green-700 hover:bg-green-400 h-10 w-28 text-white rounded-2xl hover:0 ' onClick={() => showAlert('email', item)}>sendEmail</button></td>
                  <td className="border px-4 py-2 text-center"><button className='bg-blue-700 hover:bg-blue-400 h-10 w-28 text-white rounded-2xl hover:0' onClick={() => showAlert('fund', item)}>Credit/Debit</button></td>
                  <td className="border px-4 py-2 text-center"><button className='bg-yellow-700 hover:bg-yellow-400 h-14 w-36 text-white rounded-2xl hover:0' onClick={() => showAlert('upgrade', item)}>Upgrade/Downgrade</button></td>
                  <td className="border px-4 py-2 text-center"><button className='bg-red-700  h-10 w-24 text-white rounded-2xl hover:bg-red-500' onClick={() => deleteUser(item.username)}>Delete</button></td>

                </tr>

              )
            })}
          </tbody>
        </table>

      </div>

    </div>



  );

};

export default Main_manage_users;
