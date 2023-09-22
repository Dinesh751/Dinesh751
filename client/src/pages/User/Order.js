import React, { useEffect } from "react";
import Layout from "../../component/Layouts/Layout";
import UserMenu from "./UserMenu";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, [auth.token]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/products/user/orders",
        {
          headers: {
            authorization: auth.token,
          },
        }
      );

      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error("something went wrong....");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <div className="container m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="row m-5">
              {/* {
            orders && 
            orders?.map((item)=>(
              
              <div
            className="col-md-12"
            style={{ border: "1px solid lightGrey", borderRadius: "6px" }}
          >
            <div className="d-flex">
              {
                item.products.map((productId)=>
                   (
                    <div className="col-md-3 " >
                    <img
                      src={`http://localhost:5000/products/product-photo/${productId}`}
                      className="card-img-top"
                      alt={item.name}
                      
                      style={{
                        display:"flex",
                        flexDirection:"row"
                      }}
                    />
                  </div>
                   
                  )
                )
              }
            
          {item.status}
          </div>
          </div>

            
              
            )) */}
              {/* } */}

              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Orders</th>
                    <th scope="col"> Name</th>
                    <th scope="col"> Ordered On</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders &&
                    orders?.map((items) => (
                      <tr>
                        <td>
                          {items.products.map((item) => (
                            <div className="col-md-4  m-2">
                              <img
                                src={`http://localhost:5000/products/product-photo/${item._id}`}
                                className="card-img-top"
                                alt={items.name}
                                onClick={() => {
                                  navigate(
                                    `/products/${item.slug}/${item._id}`
                                  );
                                }}
                              />
                            </div>
                          ))}
                        </td>

                        <td>
                          {items.products.length > 1
                            ? "Ordered Items"
                            : items.products[0].name}
                        </td>
                        <td>{items.updatedAt}</td>
                        <td>{items.payment.transaction?.amount}</td>
                        <td>{items.status}</td>
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

export default Order;