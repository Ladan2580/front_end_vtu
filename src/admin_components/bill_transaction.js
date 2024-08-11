import React from "react";
import axios from "axios";
import Header from "./header";
import Footer from "./footer";
import {useState,useEffect} from 'react';
import Sidebar from "./sidebar";

import Main_bill_transaction from "./main/transaction_table/main_bill_transaction.js";

const Bill_transaction=()=>{
  const [childData,setChildData]=useState(null);

  const toggleSidebar=(value)=>{
      setChildData(value)
  }
    
    return(
      <>
      {<Header  props={toggleSidebar}/>}
      <section className='flex-1 mt-2 gap-1 '>
        {childData && (<Sidebar/>)}
        {<Main_bill_transaction/>}
      </section>
      {<Footer/>}
      </>
    )
  }
  export default Bill_transaction;