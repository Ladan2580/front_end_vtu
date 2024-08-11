import React from 'react'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { FaCopy } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


export default function Main_data() {

    const showAlert = (data) => {
        Swal.fire({
            title: data.subject,
            text: data.message,
            icon: data.success,
            confirmButtonText: 'OK'
        })
    }

    const navigator = useNavigate();

    useEffect(() => {

        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getrequestuser/user_session`, { withCredentials: true })
            .then(response => {
                const mydata = response.data
                if (!mydata.session) {
                    navigator("/")
                }

            })

    }, [])

    const [token, setToken]=useState({token:""})

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/authorization`, { withCredentials: true })
        .then(response => {
            setToken(response.data)
        })
        .catch(error => console.error(error));
    }, []);

    const myref = useRef(null);
    
    const [toggler1, setToggler1] = useState(false)

    const handleToggler1 = () => {
        setToggler1(!toggler1)

    }
    const [toggler, setToggler] = useState(false)

    const handleToggler = () => {
        setToggler(!toggler)

    }

    

    const forgotPin = (e) => {

        handleToggler()

        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/forgot_pin`, { withCredentials: true })
            .then(response => {
                console.log(response.data)
                showAlert(response.data)
                setToggler(false)
            })
            .catch(error => console.error(error));
    }

    const webhook_updater = (e) => {

        handleToggler1()
        const url = myref.current.value;
        const body = { url }
        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/update_webhook`, body, { withCredentials: true })
            .then(response => {
                //console.log(response.data)
                showAlert(response.data)
                setToggler1(false)
            })
            .catch(error => console.error(error));
    }

    return (

        <section className='container flex flex-1 justify-center  items-center rounded-2xl mb-10 '>

            <div className='bg-white  shadow-2xl w-5/6 md:w-3/6 flex justify-center rounded-2xl text-black mt-12 '>

                <form className=' flex justify-center w-full flex-col'>
                    <div className='text-center bg-green-400 h-12 rounded text-white font-mono text-xl p-2'>General setting</div>
                    <div className='flex flex-col'>
                        <div className='mt-5 ml-5 font-mono font-bold'>Authorization Token:</div>
                        <div className='mt-2 w-full flex justify-center items-center '>
                            <input  value={token.token} className='text-center  border border-gray-800 w-4/5 h-16 rounded-2xl placeholder:text-center appearance-none outline-none font-mono text-lg ' type='text' />
                            <div className='cursor-pointer ml-2' >{<FaCopy />}</div>
                        </div>

                    </div>

                    {/*  */}
                    <div className='flex flex-col'>
                        <div className='mt-5 w-full ml-5 font-mono font-bold'>Update Webhook url:</div>
                        <div className='mt-2 w-full flex flex-col justify-center items-center '>
                            <input ref={myref} placeholder='Update Your Webhook url' className='text-center  border border-gray-800 w-5/6 h-16 rounded-2xl placeholder:text-center appearance-none outline-none font-mono text-lg ' type='text' />
                            <div className='cursor-pointer mt-4'> <button disabled={toggler1} onClick={webhook_updater} type='button' className='text-center text-lg bg-slate-800 rounded-2xl w-48 h-16 hover:bg-slate-500 text-white'>{toggler1 ? "Please Wait..." : "Update Url"}</button></div>
                        </div>

                    </div>


                    <div className='mt-4 w-full flex justify-center  mb-8'>
                        <button disabled={toggler} onClick={forgotPin} type='button' className=' flex justify-center items-center text-center bg-red-800 hover:bg-red-500 rounded-2xl h-14 w-4/5 text-white'>{toggler ? "Please Wait..." : "reset transaction pin va email"}</button>
                    </div>
                    {/* Forgot Your transaction Pin? click here to reset via email */}
                </form>

            </div>
        </section>

    )
}
