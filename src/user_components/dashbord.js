import React from "react";
import Header from "./header";
import Footer from "./footer";
import {useState,useEffect} from 'react';
import Sidebar from "./sidebar";
import Maindashbord from "./main/main_dashbord";

const Dashboard=()=>{
  const [childData,setChildData]=useState(null);

  const toggleSidebar=(value)=>{
      setChildData(value)
  }
   
    return(
      <>
      {<Header  props={toggleSidebar}/>}
      <section className='flex mt-2 gap-1 '>
        {childData && (<Sidebar/>)}
        {<Maindashbord/>}
      </section>
      {<Footer/>}
      </>
    )
  }
  export default Dashboard;