import React from "react";
import Layout from "../../component/Layouts/Layout";
import { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from "axios";
import {useAuth} from "../../context/auth"

export default function Login (){
  const navigate=useNavigate();
  const location=useLocation()

  const [auth,setAuth]=useAuth()

  const [credentials, setCredentials] = useState({
   
    email: "",
    password: "",
   
  });

  const Onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const Onsubmit = async(e) => {
    try{
      
      
      e.preventDefault();
      const res= await axios.post("http://localhost:5000/auth/login",{
        
        email:credentials.email,
        password:credentials.password

      })
     
      
      if(res && res.data.success){
        setTimeout(()=>{
          toast.success(res.data && res.data.message)
        },500)

        localStorage.setItem("auth",JSON.stringify(res.data))
        
        setAuth({
          ...auth,
        user:res.data.user,
        token:res.data.token
        })
        
        navigate(location.state || "/")
        
      }else{
        toast.error(res.data.message)
      }

    }catch(err){
      console.log(err);
      toast.error("something went wrong...!")

    }
    
    
  };

  return (
    <Layout>
      <div className="form-container">
        <form>
          <h3 className="form title">Login form</h3>
        
          <div className="form-group ">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Your Email"
              name="email"
              value={credentials.email}
              onChange={Onchange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              name="password"
              value={credentials.password}
              onChange={Onchange}
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-primary button"
              onClick={Onsubmit}
              
            >
              Login
            </button>
          </div>

          <div className="text-center">
            <button
              className="btn btn-primary button"
              onClick={()=>{navigate("/forgot-password")}}
              
            >
              Forgot password
            </button>
          </div>
        
         
        </form>
      </div>
    </Layout>
  );
};
