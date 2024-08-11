import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { FirstBank, SecondBank, ThirdBank } from './banks';
import { useState } from 'react';
import { Link} from 'react-router-dom';
import { TbCurrencyNaira } from 'react-icons/tb';
import { FaEye } from 'react-icons/fa';
import { FaGreaterThan } from 'react-icons/fa';
import { IoMdContact } from 'react-icons/io'
import { IoMail } from 'react-icons/io5';
import { FaWallet, FaWhatsapp } from 'react-icons/fa';
import mobile_data from '../../asset/data.jpg'
import airtime from '../../asset/airtime.svg'
import cable from '../../asset/cable.jpg'
import utility from '../../asset/utility.jpg'
import sms from '../../asset/sms.png'
import result from '../../asset/resultchecker.png'
import BarChart from './statistics/barchat'; // Adjust the import path accordingly
import PieChart from './statistics/piechart'; // Adjust the import path accordingly
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Main_dashbord() {

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


  const showAlert = () => {
    Swal.fire({
      title: "Wallet Funding!",
      text: "Make transfer to any of the account numbers below and your wallet will be funded automatically in few seconds",
      icon: "warning",
      confirmButtonText: 'OK'
    });
  }


  //statistics data for barchart
  const [data, setData] = useState(null)
  const [labels, setLabel] = useState(null)
  const [balance, setBalance] = useState({ balance: "***" })
  let myBalance = balance.balance;

  const handleVolumeChange = (val) => {

    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getrequestuser/volume${val}`, { withCredentials: true })
      .then(response => {
        setData(response.data)
        //console.log(response.data)
      })
      .catch(error => console.error(error))


  }
  const handleServiceChange = (val) => {

    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getrequestuser/general_service${val}`, { withCredentials: true })
      .then(response => {
        setData2(response.data)
        //console.log(response.data)
      })
      .catch(error => console.error(error))


  }

  

  useEffect(() => {

    // Fetch form data from MongoDB
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getrequestuser/label`, { withCredentials: true })
      .then(response => {
        setLabel(response.data)
        //console.log(response.data)
      }).catch(error => console.error(error))
      axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getrequestuser/volume1`, { withCredentials: true })
          .then(response => {
            setData(response.data)
            //  console.log(response.data)
          }).catch(error => console.error(error))
      
      axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getrequestuser/general_service1`, { withCredentials: true })
      .then(response => {
        setData2(response.data)
        //console.log(response.data)
      }).catch(error => console.error(error))


      axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getrequestuser/balance`, { withCredentials: true })
          .then(response => {
            setBalance(response.data)
            //console.log(response.data)
          }).catch(error => console.error(error))

      
      
  }, [])
  // const data = [30, 19, 3, 5, 2, 3];
  //const labels = ['Label1', 'Label2', 'Label3', 'Label4', 'Label5', 'Label6'];

  //for piechart
  const [data2, setData2] = useState(null)
  const labels2 = ['Data', 'Airtime', 'Electricity Bill', 'Cable Tv', 'Exam Pin', 'Bulk SMS'];

  const [toggleEye, setToggleEye] = useState(false);

  const handleToggleEye = () => {
    setToggleEye(!toggleEye);
  }
  const [toggleBank, setToggleBank] = useState({ first: true, second: false, third: false })
  const handleToggleBank = (value) => {
    switch (value) {
      case "first": setToggleBank({ first: true, second: false, third: false })
        break;
      case "second": setToggleBank({ first: false, second: true, third: false })
        break;
      case "third": setToggleBank({ first: false, second: false, third: true })
        break;
    }
  }
  // first Bank

  return (
    <section className=' mx-auto flex-1 cursor-pointer  font-serif rounded-lg text-justify container h-screen' >
      {/* Wallet Balance */}
      <section className='grid gap-6 grid-cols-4 justify-center m-6'>
        <div className='h-34 mt-1 md:mt-0 p-4 w-full col-span-4 md:col-span-2  bg-slate-900 shadow-4xl text-white rounded-2xl md:px-0'>
          <div className='flex justify-between'>
            <div className='flex flex-col justify-start'>
              <div className='font-mono ml-1 flex flex-row px-2'>Balance <p className='mt-1 ml-2' onClick={handleToggleEye}>{<FaEye />}</p></div>
              <div className='text-3xl flex flex-row font-bold px-2'>{<TbCurrencyNaira />}<p className='-mt-1 font-sans'>{toggleEye ? '****' : myBalance.toLocaleString()}</p> </div>
            </div>
            <div className='text-4xl mr-2' >{<FaWallet />}</div>

          </div>

          <div className='mt-4 flex justify-between'>
            <div className='font-mono ml-1 flex flex-row text-md px-2'>
            <Link to='/user/wallet_history'> Transactions</Link><p className='mt-1 ml-1 '>
                <Link to='/user/wallet_history'>
                {<FaGreaterThan />}
                </Link>
                </p></div>
            <div><button className='w-18 p-1 h-8 mr-2  bg-blue-500 hover:bg-blue-800 hover:scale-110 rounded-xl font-mono italic' onClick={showAlert}>Fund..</button></div>
          </div>
        </div>
        {/* Contact infomation */}

        <div className='h-34 mt-1 md:mt-0 p-4 w-full  text-black col-span-4 md:col-span-2 bg-gray-400 shadow-4xl  rounded-2xl'>
          <div className='flex justify-between'>
            <div className='font-mono  font-extrabold'>Contact info</div>
            <div className='text-5xl mr-2 '>{<IoMdContact />}</div>
          </div>
          <div className='flex flex-col -mt-5'>
            <div className='flex flex-row'><div className='text-3xl text-green-800'>{<FaWhatsapp />}</div><div className='font-extrabold ml-2 font-sans text-lg'>{process.env.REACT_APP_PHONE}</div></div>
            <div className='flex flex-row mt-2'><div className='text-3xl text-red-800'>{<IoMail />}</div><div className='font-extrabold ml-2 font-mono '>{process.env.REACT_APP_EMAIL}</div></div>
          </div>
        </div>
        {/* Bank details */}
        <div className=' h-54 mt-1 w-full  text-white font-bold font-mono col-span-4 bg-gradient-to-r from-purple-900 to-green-800 shadow-lg  rounded-xl'>
          <div className='flex justify-between  mb-2 mt-2'>
            <button className=' h-14 rounded-lg bg-blue-700 hover:bg-blue-900 p-2 italic' onClick={() => { handleToggleBank("first") }}>safehaven Bank</button>
            <button className=' h-14 rounded-lg bg-green-600 text-md p-2 italic' onClick={() => { handleToggleBank("second") }}>Paga Bank</button>
            <button className=' h-14 rounded-lg bg-yellow-700 p-2 italic' onClick={() => { handleToggleBank("third") }}>providus Bank</button>

          </div>
          {<SecondBank/>}

        </div>

      </section>

      {/* Account Details */}
      <section className='bg-gray-200  h-250 mt-8 mb-96 mx-auto text-black  '>

        <section className='grid grid-cols-2 md:grid-cols-3 justify-center gap-4'>
          <div className='m-5 p-4 flex flex-col justify-center items-center bg-white shadow-4xl  h-34 rounded-xl'>
            <Link to='/user/data'>
              <div><img src={mobile_data} width={100} height={100} /></div>
              <div className='text-extrabold text-xl font-mono text-center'>Data</div>
            </Link>
          </div>
          <div className='m-5 p-4 flex flex-col justify-center items-center bg-white shadow-4xl  h-34 rounded-xl'>
            <Link to='/user/airtime'>
              <div><img src={airtime} width={100} height={100} /></div>
              <div className='text-extrabold text-xl font-mono'>Airtime</div>
            </Link>
          </div>
          <div className='m-5 p-4 flex flex-col justify-center items-center bg-white shadow-4xl  h-34 rounded-xl'>
            <Link to='/user/cable'>
              <div><img src={cable} width={100} height={100} alt='cableTV' /></div>
              <div className='text-extrabold text-xl font-mono'>Cable Tv</div>
            </Link>
          </div>
          <div className='m-5 p-4 flex flex-col justify-center items-center bg-white shadow-4xl  h-34  rounded-xl'>
            <Link to='/user/bill' className='flex flex-col justify-center items-center'>
              <div><img src={utility} width={100} height={100} /></div>
              <div className='text-extrabold text-xl text-center font-mono'>Electricity Bill</div>
            </Link>
          </div>
          <div className='m-5 p-4 flex flex-col justify-center items-center bg-white shadow-4xl  h-34 rounded-xl'>
            <Link to='/user/sms'>
              <div><img src={sms} width={100} height={100} /></div>
              <div className='text-extrabold text-xl text-center font-mono'>Bulk Sms</div>
            </Link>
          </div>
          <div className='m-5 p-4 flex flex-col justify-center items-center bg-white shadow-4xl  h-34  rounded-xl'>
            <Link to='/user/education' className='flex flex-col justify-center items-center'>
              <div><img src={result} width={100} height={100} /></div>
              <div className='text-extrabold text-xl text-center font-mono'>Result Checker</div>
            </Link>
          </div>


          <section className=' bg-white col-span-2 md:col-span-3 h-120  flex justify-center items-center mb-8 flex-col-reverse md:flex-row md:justify-around'>

            <div className='mt-8 mb-12'>
              <BarChart data={data} labels={labels} description="Total volume of data Sold in Gigabyte" />
            </div>
            <div className='h-40 md:20  flex flex-col items-center justify-center'>
              <div className='font-mono text-lg mt-16 md:mt-0'>Sold Data Statistics</div>
              <div className='mt-8 w-full flex  justify-center '>
                <select className='bg-white shadow-2xl text-center  w-full h-14 rounded-2xl border border-gray-900 placeholder:text-center outline-none font-mono text-md font-semibold' onChange={(e) => handleVolumeChange(e.target.value)}>
                  <option defaultValue="1">Today</option>
                  <option value="2" select>1 Week ago</option>
                  <option value="3" select>1 Month ago</option>
                </select>
              </div>

            </div>

          </section>
          <section className='bg-white col-span-2 md:col-span-3 h-150 -mb-48 flex justify-center items-center flex-col-reverse md:flex-row md:justify-around'>

            <div className='mt-8'>
              <PieChart data={data2} labels={labels2} />
            </div>
            <div className='h-40 md:20  flex flex-col items-center justify-center'>
              <div className='font-mono text-lg mt-16 md:mt-0'>All Services Statistics</div>
              <div className='mt-8 w-full flex  justify-center '>
                <select className='bg-white shadow-2xl text-center  w-full h-14 rounded-2xl border border-gray-900 placeholder:text-center outline-none font-mono text-md font-semibold ' onChange={(e) => handleServiceChange(e.target.value)}>
                  <option defaultValue="1">Today</option>
                  <option value="2" select>1 Week ago</option>
                  <option value="3" select>1 Month ago</option>
                </select>
              </div>

            </div>
          </section>

        </section>



      </section>
      {/* statistics */}



      {/* end of first section */}

    </section>

  )
}
