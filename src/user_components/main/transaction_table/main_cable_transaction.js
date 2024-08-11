import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyDataGrid = () => {
  // Sample columns data
  const columns = [
    { field: 'id', headerName: 'user_id', width: 300 },
    { field: 'message', headerName: 'Message', width: 400 },
    { field: 'cable_name', headerName: 'cableName', width: 150 },
    { field: 'iuc_number', headerName: 'iucNumber', width: 200 },
    { field: 'customer_name', headerName: 'customerName', width: 150 },
    { field: 'amount', headerName: 'Price', width:150 },
    { field: 'status', headerName: 'Status', width:150 },
    { field: 'date', headerName: 'Date', width:150 },
    // Add more columns as needed
  ];  

  const [rows, setData]=useState([])

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

  
  useEffect(() => {

    // Fetch form data from MongoDB
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getrequestuser/cableHistory`,{withCredentials:true})
      .then(response => {
        setData(response.data)
        //console.log(response.data)
       // console.log(response.data);
      })
      .catch(error => console.error(error))
  },[])

  
  return (
    <div style={{ height: 400, width: '100%' }}>
      <div className='text-center mt-6 mb-4 text-2xl'>Cable Tv History</div>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5,10,25]}
        pagination
        initialState={{
          pagination:{
            paginationModel:{
              pageSize:5,
            }
          }
        }}
      
      />
    </div>
  );
};

export default MyDataGrid;
