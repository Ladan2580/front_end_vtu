import React from "react";
import axios from "axios";
import Header from "./header";
import Footer from "./footer";
import {useState,useEffect} from 'react';
import Sidebar from "./sidebar";

import Main_manage_users from "./main/transaction_table/main_manage_users.js";

const Manage_users=()=>{
  const [childData,setChildData]=useState(null);

  const toggleSidebar=(value)=>{
      setChildData(value)
  }
   
    return(
      <>
      {<Header  props={toggleSidebar}/>}
      <section className='flex-1 mt-2 gap-1 '>
        {childData && (<Sidebar/>)}
        {<Main_manage_users/>}
      </section>
      {<Footer/>}
      </>
    )
  }
  export default Manage_users;