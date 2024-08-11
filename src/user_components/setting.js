import React from "react";
import Header from "./header";
import Footer from "./footer";
import {useState} from 'react';
import Sidebar from "./sidebar";
import Main_education from "./main/main_setting";

const Bill=()=>{
  const [childData,setChildData]=useState(null);

  const toggleSidebar=(value)=>{
      setChildData(value)
  }
    
    return(
      <>
      {<Header  props={toggleSidebar}/>}
      <section className='flex mt-2 gap-1 '>
        {childData && (<Sidebar/>)}
        {<Main_education/>}
      </section>
      {<Footer/>}
      </>
    )
  }
  export default Bill;