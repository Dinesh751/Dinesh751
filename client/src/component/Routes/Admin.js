import React from 'react'
import {useState,useEffect} from "react"
import { useAuth } from '../../context/auth';
import axios from "axios"
import { Outlet } from 'react-router-dom';
import Spinner from '../Spinner';
import  toast  from 'react-hot-toast';

const Admin = () => {
  

    const [ok,setOk]=useState(false);
    const [auth]=useAuth()

   
     
      
     
        try{
          useEffect(()=>{
          const authCheck=async ()=>{
            const admin=await axios.get("http://localhost:5000/auth/admin-auth",{
          headers:{
            authorization:auth?.token
          }
          })

         if(admin.data.ok){
          setOk(true)
         }else{
          setOk(false)
         }
        }
        if(auth?.token){
          authCheck();
        }
      },[auth?.token])
      }catch(err){
        toast.error(err)

      }

        
         
      


  return ok?<Outlet/>:<Spinner path=""/>

  

   
}

export default Admin