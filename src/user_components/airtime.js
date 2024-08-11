import React from "react";
import Header from "./header";
import Footer from "./footer";
import {useState} from 'react';
import Sidebar from "./sidebar";
import Main_cable from "./main/main_airtime";
import Main_cableValidator from "./main/main_airtimeValidator";

const Cable=()=>{
  const [childData,setChildData]=useState(null);
  const [details,setDetails]=useState({});
  const [details2,setDetails2]=useState({});

  const handleDetails=(params)=>{
    setDetails(params)  
  }
  const handleDetails2=(params)=>{
    setDetails2(params)  
  }

  const toggleSidebar=(value)=>{
      setChildData(value)
  }
  const [validator,setValidator]=useState(false);

  const toggleValidator=(value)=>{
      setValidator(value)
  }
   
    return(
      <>
      {<Header  props={toggleSidebar}/>}
      <section className='flex mt-2 gap-1 '>
        {childData && (<Sidebar/>)}
        {validator ? (<Main_cableValidator details={details} details2={details2} toggleValidator={toggleValidator}/>):(<Main_cable toggleValidator={toggleValidator} handleDetails={handleDetails} handleDetails2={handleDetails2} />)}
      </section>
      {<Footer/>}
      </>
    )
  }
  export default Cable;