import React,{useState} from 'react'
import Layout from "../../component/Layouts/Layout"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from "react-hot-toast"




const ForgotPassword = () => 
    {
        const navigate=useNavigate();
      
        const [credentials, setCredentials] = useState({
         
          email: "",
          newPassword: "",
          answer:""
         
        });
      
        const Onchange = (e) => {
          setCredentials({ ...credentials, [e.target.name]: e.target.value });
        };
      
        const Onsubmit = async(e) => {
          try{
            
            e.preventDefault();
            const res= await axios.post(`${process.env.LOCALHOST}/auth/forgot-password`,{
              
              email:credentials.email,
              answer:credentials.answer,
              newPassword:credentials.newPassword

            })
            console.log(res)
            
            if(res && res.data.success){
              setTimeout(()=>{
                toast.success(res.data && res.data.message)
              },500)
      
            
              
              navigate("/login")
              
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
          <h4 className="form title"> Reset password</h4>
        
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

          <div className="form-group ">
            <input
              type="text"
              className="form-control"
              id="exampleInput"
              aria-describedby="emailHelp"
              placeholder="Enter Your Favorite Sport "
              name="answer"
              value={credentials.answer}
              onChange={Onchange}
            />
          </div>


          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter The New Password"
              name="newPassword"
              value={credentials.newPassword}
              onChange={Onchange}
            />
          </div>

         
        
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-primary button"
              onClick={Onsubmit}
              
            >
              reset password
            </button>
          </div>
        </form>
      </div>
    </Layout>
    
  )
}

export default ForgotPassword