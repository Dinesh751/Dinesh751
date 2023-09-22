import React from "react";
import Layout from "../component/Layouts/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { prices } from "../component/Price";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart";
import toast  from "react-hot-toast";


const HomePage = () => {

const navigate=useNavigate()

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radioCheck, setRadioCheck] = useState([]);
  const [cart,setCart]=useCart()


  
  useEffect(() => {
    
    if (checked.length || radioCheck.length) {
      filterProducts();
      
    } else{
      getAllProducts()

    }
    // eslint-disable-next-line
  }, [checked, radioCheck]);

  useEffect(()=>{
    getAllCategories();
  
   
   
    // eslint-disable-next-line
    
  },[])


  // get All products

  const getAllProducts = async () => {
    try {
      
      const { data } = await axios.get(
        "http://localhost:5000/products/get-all-products"
      );
      
      setProducts([...data?.products]);
      
    } catch (err) {
      console.log("something went wrong in getAllProducts" + err);
    }
  };

  // get All categories

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/category/get-category", 
      );
      setCategories(data.allCategory);
    } catch (err) {
      console.log("something went wrong in getAllCategories", err);
    }
  };

  // handle check for filter

  const handleCheck = (value, id) => {
    let all = [...checked];

    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // handle Radio check

  const handleRadioCheck = (value) => {
    setRadioCheck(value);
  };

  // filter products

  const filterProducts = async () => {
    try {
      console.log("it is triggered");

      const { data } = await axios.post(
        "http://localhost:5000/products/filter-products",
        { checked, radioCheck }
      );

      if (data.success) {
        setProducts(data.products);
      }
    } catch (err) {
      console.log("something went wrong in filtering product" + err);
    }
  };



 

  return (
    <Layout>
      <div className="container m-3">
        <div className="row ">
          <div className="col-md-3">
            <h4 className=" m-2">Filter By Category</h4>
            <div className="d-flex flex-column m-4">
              {categories.length<1?"No categories added":categories?.map((c) => (
                <div className="form-check" key={c._id}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    onChange={(e) => handleCheck(e.target.checked, c._id)}
                    id="flexCheckChecked"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckChecked"
                  >
                    {c.name}
                  </label>
                </div>
              ))}
            </div>

            <h4 className=" m-2">Filter By Price</h4>
            <div className="d-flex flex-column m-4">
              {prices?.map((p) => (
                <div className="form-check" key={p._id}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    onChange={(e) => {
                      handleRadioCheck(p.array);
                    }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    {p.name}
                  </label>
                </div>
              ))}
            </div>
            <div className="text-center">
              <button
                className="btn btn-danger"
                onClick={() => {
                  window.location.reload();
                }}
              >
                RESET FILTER
              </button>
            </div>
          </div>
          <div className="col-md-9">
             
            {/* {JSON.stringify(radioCheck, null, 4)} */}
            <div className="d-flex flex-wrap">
              {products.length===0?(
                <>
                <div className="text-center" style={{margin:"10%"}}>Sorry... We don't have any products</div>
                </>
              ):(
                <>
                 {products?.map((e) => (
                <div
                  className="card m-2"
                  style={{ width: "18rem" }}
                  key={e._id}
                >
                  <img
                    src={`http://localhost:5000/products/product-photo/${e._id}`}
                    className="card-img-top"
                    alt={e.name}
                    style={{
                      height:"200px"
                    }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">Name:{e.name}</h5>
                    <p className="card-text">Price: ${e.price}</p>
                    <p className="card-text">
                      Description:{e.description.substring(0, 60)}....
                    </p>
                    
                   
                  </div>
                  <div className="d-flex  ">
                    <button className="btn btn-primary m-1" onClick={()=>{
                      navigate(`/products/${e.slug}/${e._id}`)
                    }}>
                      More Details
                    </button>
                    <button className="btn btn-secondary m-1"
                      onClick={()=>{
                        setCart([...cart,e])
                        
                       
                          localStorage.setItem("cart",JSON.stringify([...cart,e]))
                        
                       toast.success("Item added successfully")
                       
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              ))}
                
                </>
              )}
             
            </div>
            
              

              
           
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;