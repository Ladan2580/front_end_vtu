import React from "react";
import Header from "./header";
import Footer from "./footer";
import {useState,useEffect} from 'react';
import Sidebar from "./sidebar";
import Main_cable from "./main/main_cable";
import Main_cableValidator from "./main/main_cableValidator";

const Cable=()=>{
  const [childData,setChildData]=useState(null);
  const [details,setDetails]=useState({});
  const handleDetails=(params)=>{
    setDetails(params)  
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
        {validator ? (<Main_cableValidator details={details} toggleValidator={toggleValidator}/>):(<Main_cable handleDetails={handleDetails} toggleValidator={toggleValidator}/>)}
      </section>
      {<Footer/>}
      </>
    )
  }
  export default Cable;