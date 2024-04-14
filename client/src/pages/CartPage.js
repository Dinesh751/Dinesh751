import React, { useEffect, useState } from "react";
import Layout from "../component/Layouts/Layout";
import { useAuth } from "../context/auth";
import { useCart } from "../context/Cart";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";

const CartPage = () => {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getClientToken();
  }, []);

  const removeItem = (id) => {
    try {
      let myCart = [...cart];
      let myIndex = myCart.findIndex((item) => item._id === id);
      myCart.splice(myIndex, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (err) {
      console.log(err);
    }
  };

  const totalPrice = () => {
    try {
      let price = 0;
      cart.map((item) => {
        return (price = price + item.price);
      });
      return price.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (err) {
      console.log(err);
    }
  };

  // get client token

  const getClientToken = async () => {
    try {
      const token = await axios.get(
        "http://localhost:5000/products/braintree/client_token"
      );
      setClientToken(token.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePayment = async () => {
    try {
      setLoading(true);

      const { nonce } = await instance.requestPaymentMethod();
    

      const  {data} = await axios.post(
        "http://localhost:5000/products/braintree/payment",
        {
          cart,
          nonce
        },
        {
          headers: {
            authorization: auth.token,
          },
        }
      );
      setLoading(false);
      if (data.success) {
        navigate("/dashboard/user/orders");
        setCart([])
        localStorage.removeItem("cart")
        toast.success("Order Placed")
      }
      
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="text-center m-3">
          <h2>Hello - <b>{auth.token ? `${auth?.user?.name}` : "User"}</b></h2>
        </div>
        <div className="text-center m-2">
          {`Your Cart Has  ${cart.length} Products`}
        </div>
      </div>

      {cart.length > 0 && (
        <div className="row m-5">
          <div
            className="col-md-7"
            style={{ border: "1px solid lightGrey", borderRadius: "6px" }}
          >
            {cart?.map((e) => (
              <div className="row m-2">
                <div className="col-md-3">
                  <img
                    src={`http://localhost:5000/products/product-photo/${e._id}`}
                    className="card-img-top"
                    alt={e.name}
                    style={{ padding: "5%" }}
                  />
                </div>
                <div className="col-md-5 p-3">
                  <p><b>{e.name}</b></p>
                  <p><b>${e.price}</b> </p>
                  <p>{e.description.substring(0, 60)}...</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      removeItem(e._id);
                    }}
                  >
                    Remove Item
                  </button>
                </div>

                <hr />
              </div>
            ))}
          </div>
          <div
            className="col-md-4 "
            style={{
              border: "1px solid lightGrey",
              borderRadius: "6px",
              marginLeft: "4px",
              padding: "8px",
            }}
          >
            <div className="text-center">
              <h2>Cart Summary</h2>
              <p>Total | CheckOut | Payment</p>

              <hr />
               <h4> Total : <b>{totalPrice()}</b></h4>
               <br/>
              <h5>Current Address</h5>
              <p><b>{auth?.token ? auth.user.address : ""}</b></p>
              {auth?.token ? (
                <>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => {
                      navigate("/dashboard/user/profile");
                    }}
                  >
                    Edit Address
                  </button>

                  <div className="mt-2">
                    {clientToken && (
                      <DropIn
                        options={{
                          authorization: clientToken,
                          paypal: {
                            flow: "vault",
                          },
                        }}
                        onInstance={(instance) => {
                          setInstance(instance);
                        }}
                      />
                    )}

                    <button
                      className="btn btn-outline-warning"
                      disabled={!clientToken || !instance}
                      onClick={handlePayment}
                    >
                      {loading ? "Processing..." : "Make Payment"}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-outline-success"
                    onClick={() => {
                      navigate("/login", { state: "/cart" });
                    }}
                  >
                    Login
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default CartPage;
