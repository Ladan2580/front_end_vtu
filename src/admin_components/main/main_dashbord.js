import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { TbCurrencyNaira } from 'react-icons/tb';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import { FaGreaterThan } from 'react-icons/fa';
import { FaUsers, FaMoneyBillTrendUp } from 'react-icons/fa6';
import { SiCashapp } from 'react-icons/si';
import { FaWallet, FaWhatsapp } from 'react-icons/fa';
import BarChart from './statistics/barchat'; // Adjust the import path accordingly
import PieChart from './statistics/piechart'; // Adjust the import path accordingly
import { useNavigate,Link } from 'react-router-dom';
import Swal from 'sweetalert2'

export default function Main_dashbord() {
  //statistics data for barchart


  const [users, setUsers] = useState({})
  const [transaction, setTransaction] = useState({})
  const [data, setData] = useState(null)
  const [data2, setData2] = useState(null)
  const [labels, setLabel] = useState(null)
  const [wallet, setWallet] = useState({ wallet: 0 })

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



  const handleVolumeChange = (val) => {

    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getrequest/volume${val}`)
      .then(response => {
        setData(response.data)
        //console.log(response.data)
      })
      .catch(error => console.error(error))


  }

  const handleProfitChange = (val) => {

    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getrequest/profit${val}`)
      .then(response => {
        setData2(response.data)
        //console.log(response.data)
      })
      .catch(error => console.error(error))


  }
  const handleServiceChange = (val) => {

    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getrequest/general_service${val}`)
      .then(response => {
        setData3(response.data)
        //console.log(response.data)
      })
      .catch(error => console.error(error))


  }


  useEffect(() => {

    // Fetch form data from MongoDB
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getrequest/label`)
      .then(response => {
        setLabel(response.data)
        //console.log(response.data)
      }).catch(error => console.error(error))

    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getrequest/profit1`)
      .then(response => {
        setData2(response.data)
        //console.log(response.data)
      }).catch(error => console.error(error))

    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getrequest/wallet`)
      .then(response => {
        setWallet(response.data)
        //console.log(response.data)
      }).catch(error => console.error(error))

    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getrequest/totalusers`)
      .then(response => {
        setUsers(response.data)
        //console.log(response.data)
      }).catch(error => console.error(error))

    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getrequest/totaltransaction`)
      .then(response => {
        setTransaction(response.data)
        //console.log(response.data)
      }).catch(error => console.error(error))

    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getrequest/general_service1`)
      .then(response => {
        setData3(response.data)
        //console.log(response.data)
      }).catch(error => console.error(error))

      axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getrequest/volume1`)
      .then(response => {
        setData(response.data)
        //console.log(response.data)
      })
      .catch(error => console.error(error))

  }, [])

  //for piechart
  const [data3, setData3] = useState(null)
  const labels3 = ['Data', 'Airtime', 'Electricity Bill', 'Cable Tv', 'Exam Pin', 'Bulk SMS'];

  const [toggleEye, setToggleEye] = useState(false);

  const handleToggleEye = () => {
    setToggleEye(!toggleEye);
  }

  // first Bank

  return (
    <section className=' mx-auto m- flex-1 cursor-pointer  font-serif rounded-lg text-justify container h-screen' >
      {/* Wallet Balance */}
      <section className='grid gap-8 grid-cols-4 justify-center m-4'>
        <div className='m-4 h-34 p-4 w-full md:w-3/4  mx-auto col-span-4 md:col-span-2 -mb-4 md:mb-0  bg-slate-800 shadow-2xl text-white rounded-2xl md:px-0'>
          <div className='flex justify-between'>
            <div className='flex flex-col justify-start'>
              <div className='font-mono ml-1 flex flex-row px-2'> API1 Balance <p className='mt-1 ml-2' onClick={handleToggleEye}>{toggleEye ? <FaEyeSlash /> : <FaEye />}</p></div>
              <div className='text-3xl flex flex-row font-bold px-2'>{<TbCurrencyNaira />}<p className='-mt-1 font-sans'>{toggleEye ? '****' : '0'}</p> </div>
            </div>
            <div className='text-4xl mr-2 opacity-50  '>{<FaWallet />}</div>
          </div>
          <div className='mt-4 flex justify-between'>
            <div className='font-mono ml-1 flex flex-row text-md px-2'> <div className='font-mono ml-1 flex flex-row text-md px-2'>
            <Link to='/auth/wallet_history'> Transactions</Link><p className='mt-1 ml-1 '>
                <Link to='/user/wallet_history'>
                {<FaGreaterThan />}
                </Link>
                </p></div></div>
            <div><button className='w-18 h-8 p-1 mr-2 italic  bg-blue-600 hover:bg-blue-800 hover:scale-110 rounded-lg text-sm '>Fund..</button></div>
          </div>
        </div>

        {/* wallet balance 2 */}
        <div className='m-4 h-34 p-4 w-full md:w-3/4  mx-auto col-span-4 md:col-span-2 -mb-4 md:mb-0  bg-slate-800 shadow-2xl text-white rounded-2xl md:px-0'>
          <div className='flex justify-between'>
            <div className='flex flex-col justify-start'>
              <div className='font-mono ml-1 flex flex-row px-2'> API2 Balance <p className='mt-1 ml-2' onClick={handleToggleEye}>{toggleEye ? <FaEyeSlash /> : <FaEye />}</p></div>
              <div className='text-3xl flex flex-row font-bold px-2'>{<TbCurrencyNaira />}<p className='-mt-1 font-sans'>{toggleEye ? '****' : '0'}</p> </div>
            </div>
            <div className='text-4xl mr-2 opacity-50  '>{<FaWallet />}</div>
          </div>
          <div className='mt-4 flex justify-between'>
            <div className='font-mono ml-1 flex flex-row text-md px-2'>
            <div className='font-mono ml-1 flex flex-row text-md px-2'>
            <Link to='/auth/wallet_history'> Transactions</Link><p className='mt-1 ml-1 '>
                <Link to='/auth/wallet_history'>
                {<FaGreaterThan />}
                </Link>
                </p></div>
              </div>
            <div><button className='w-18 h-8 p-1 mr-2  bg-blue-600 hover:bg-blue-800 hover:scale-110 rounded-lg text-sm italic'>Fund..</button></div>
          </div>
        </div>
        {/* wallet balance 3 */}
        <div className='m-4 h-34 p-4 w-full md:w-3/4  mx-auto col-span-4 md:col-span-2 -mb-4 md:mb-0  bg-slate-800 shadow-2xl text-white rounded-2xl md:px-0'>
          <div className='flex justify-between'>
            <div className='flex flex-col justify-start'>
              <div className='font-mono ml-1 flex flex-row px-2'> API3 Balance <p className='mt-1 ml-2' onClick={handleToggleEye}>{toggleEye ? <FaEyeSlash /> : <FaEye />}</p></div>
              <div className='text-3xl flex flex-row font-bold px-2'>{<TbCurrencyNaira />}<p className='-mt-1 font-sans'>{toggleEye ? '****' : 0}</p> </div>
            </div>
            <div className='text-4xl mr-2 opacity-50  '>{<FaWallet />}</div>
          </div>
          <div className='mt-4 flex justify-between'>
            <div className='font-mono ml-1 flex flex-row text-md px-2'>
            <div className='font-mono ml-1 flex flex-row text-md px-2'>
            <Link to='/user/wallet_history'> Transactions</Link><p className='mt-1 ml-1 '>
                <Link to='/auth/wallet_history'>
                {<FaGreaterThan />}
                </Link>
                </p></div>
              </div>
            <div><button className='w-18 h-8 p-1 mr-2 italic  bg-blue-600 hover:bg-blue-800 hover:scale-110 rounded-lg text-sm '>Fund..</button></div>
          </div>
        </div>
        {/* Contact infomation */}

        <div className='m-4 h-34 p-4 w-full md:w-3/4 -mb-4 md:mb-0  mx-auto text-white col-span-4 md:col-span-2 bg-slate-800 shadow-2xl  rounded-2xl '>
          <div className='flex justify-between'>
            <div className='font-mono font-extrabold text-justify '>All Users Balance</div>
            <div className='text-5xl mr-2 opacity-50'>{<SiCashapp />}</div>
          </div>

          <div className='flex flex-col'>
            <div className='flex flex-row'><div className='text-4xl'>{<TbCurrencyNaira />}</div><div className='font-extrabold text-3xl font-sans'>{wallet.wallet.toLocaleString()}</div></div>
            {/* <div className='flex flex-row'><div className='text-3xl text-red-800'>{<IoMail/>}</div><div className='font-extrabold ml-2'>admin@greenvtu.com.ng</div></div> */}

          </div>
        </div>


        <div className='m-4 h-34 p-4 w-full md:w-3/4 -mb-4 md:mb-0  mx-auto text-white col-span-4 md:col-span-2 bg-slate-800 shadow-2xl  rounded-2xl'>
          <div className='flex justify-between'>
            <div className='font-mono font-extrabold'>Total Users</div>
            <div className='text-5xl mr-2 opacity-50'>{<FaUsers />}</div>
          </div>

          <div className='flex flex-col '>
            <div className='flex flex-row'><div className='font-extrabold ml-2 text-3xl font-sans'>{users.totalUsers}</div></div>
            {/* <div className='flex flex-row'><div className='text-3xl text-red-800'>{<IoMail/>}</div><div className='font-extrabold ml-2'>admin@greenvtu.com.ng</div></div> */}

          </div>
        </div>

        <div className='m-4 h-34 p-4 w-full md:w-3/4 mx-auto -mb-4 md:mb-0  text-white col-span-4 md:col-span-2 bg-slate-800 shadow-2xl  rounded-2xl'>
          <div className='flex justify-between'>
            <div className='font-mono font-extrabold'>Total Transactions</div>
            <div className='text-5xl mr-2 mt-2 opacity-50'>{<FaMoneyBillTrendUp />}</div>
          </div>

          <div className='flex flex-col'>
            <div className='flex flex-row'><div className='font-extrabold ml-2 font-sans text-3xl'>{transaction.total}</div></div>
            {/* <div className='flex flex-row'><div className='text-3xl text-red-800'>{<IoMail/>}</div><div className='font-extrabold ml-2'>admin@greenvtu.com.ng</div></div> */}

          </div>
        </div>
        {/* Bank details */}


      </section>

      {/* Account Details */}
      <section className=' mt-12 mb-96 mx-auto text-black  '>

        <section className='grid grid-cols-2 md:grid-cols-3 justify-center  gap-4'>

          {/* <div className='flex flex-col justify-center items-center bg-white shadow-2xl  h-30 rounded-xl'>
        <div><img src={cash} width={100} height={100}/></div>
        <div className='text-extrabold text-2xl text-center font-mono'>Airtime2Cah</div>
      </div> */}

          <section className=' col-span-2 md:col-span-3 flex justify-center items-center flex-col-reverse md:flex-row md:justify-around mb-10 p-6'>

            <div className=''>
              <BarChart data={data} labels={labels} description="Total volume of data sold in gigabyte" />
            </div>
            <div className='h-40 md:h-20 flex flex-col items-center justify-center'>
              <div className='font-mono text-lg'>Sold Data Statistics</div>
              <div className='mt-8 w-full flex  justify-center '>
                <select className='bg-white shadow-2xl text-center  w-full h-14 rounded-2xl border border-gray-900 placeholder:text-center outline-none font-mono text-md font-semibold ' onChange={(e) => handleVolumeChange(e.target.value)}>
                  <option value="1" selected>Today</option>
                  <option value="2" select>1 Week ago</option>
                  <option value="3" select>1 Month ago</option>
                </select>
              </div>

            </div>
          </section>

          <section className=' col-span-2 md:col-span-3 flex justify-center items-center flex-col-reverse md:flex-row md:justify-around mb-10 p-6'>

            <div>
              <BarChart data={data2} labels={labels} description="Total profit earned" />
            </div>
            <div className='h-40 md:h-20  flex flex-col items-center justify-center'>
              <div className='font-mono text-lg '>Earned Profit Statistics</div>
              <div className='mt-8 w-full flex  justify-center '>
                <select className='bg-white shadow-2xl text-center  w-full h-14 rounded-2xl border border-gray-900 placeholder:text-center outline-none font-mono text-md font-semibold ' onChange={(e) => handleProfitChange(e.target.value)}>
                  <option value="1" selected>Today</option>
                  <option value="2" select>1 Week ago</option>
                  <option value="3" select>1 Month ago</option>
                </select>
              </div>

            </div>
          </section>
          <section className='  col-span-2 md:col-span-3 h-30 p-6 flex justify-center items-center flex-col-reverse md:flex-row md:justify-around -mb-48'>

            <div>
              <PieChart data={data3} labels={labels3} />
            </div>
            <div className='h-40 md:h-20  flex flex-col items-center justify-center'>
              <div className='font-mono text-lg'>All Services Statistics</div>
              <div className='mt-8 w-full flex  justify-center '>
                <select className='bg-white shadow-2xl text-center  w-full h-14 rounded-2xl border border-gray-900 placeholder:text-center outline-none font-mono text-md font-semibold ' onChange={(e) => handleServiceChange(e.target.value)}>
                  <option value="1" selected>Today</option>
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
