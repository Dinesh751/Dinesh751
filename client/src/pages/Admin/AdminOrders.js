
import React from "react";
import Layout from "../../component/Layouts/Layout";
import AdminMenu from "./AdminMenu";
import { useState } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const [itemStatus]=useState(["Not Process","Processing","Shipped","Delivered","cancelled" ])
 

  useEffect(() => {
    getAllOrders();
    // eslint-disable-next-line
  }, [auth.token]);



  const getAllOrders = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/products/admin/orders",
        {
          headers: {
            Authorization: auth.token,
          },
        }
      );
      console.log(data);
      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const myArray=(address)=>{
      const array=address.split(",")
      return array[0]
  }

  const changeStatus=async (status,id)=>{
      try{

        const {data}= await axios.put(`http://localhost:5000/products/admin/orders/${id}`,{
          status
        },{
          headers:{
            Authorization:auth.token
          }
        })

        if(data.success){
          toast.success(data.message)
        }

      }catch(err){
        toast.error(err.message)
      }
  }

  return (
    <Layout>
      <div className=" m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-100 p-3">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Status</th>
                    <th scope="col">Order Id</th>
                    <th scope="col">Buyer's Name</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Address</th>
                  </tr>
                </thead>
                <tbody className="overflow-auto">
                  {orders &&
                    orders.map((items, i) => (
                      <tr key={items._id}>
                        <th scope="row">{i + 1}</th>
                        <td>
                        
                          <select
                            class="form-select"
                            aria-label="Default select example"
                           
                            onChange={(e)=>{changeStatus(e.target.value,items._id)}}
                            
                          >
                            <option selected  disabled>{items.status}</option>
                            {
                              
                              itemStatus.map((status,i)=>(
                                <>
                                   
                                   <option key={i}  >{status}</option>
                                   </>
                              ))

                            }
                            
                            
                            
                          </select>

                        
                          
                        </td>
                        <td>{items._id}</td>
                        <td>{items.buyer.name}</td>
                        <td>{items.payment.transaction?.amount}</td>
                        <td>{ myArray(items.buyer.address)}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
