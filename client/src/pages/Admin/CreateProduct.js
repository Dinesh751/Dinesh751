import React from "react";
import Layout from "../../component/Layouts/Layout";
import AdminMenu from "./AdminMenu";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const [auth]=useAuth()
  const navigate=useNavigate()
  const [categories, setCategories] = useState([]);
  const [productDetails, setProductDetails] = useState({
    category: "",
    name: "",
    quantity: "",
    price: "",
    description: "",
    shipping: "",
  });
  const [photo, setPhoto] = useState("");


  useEffect(() => {
    getAllCategory();
  }, []);

  // get All categories

  const getAllCategory = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/category/get-category"
      );
      if (res.data.success) {
        setCategories(res.data.allCategory);
      }
    } catch (err) {
      toast.error("something went wrong getting all categories");
    }
  };

  // handleOnchange

  const handleOnchange = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };



  // handleSubmit

  const handleSubmit = async(e) => {
    e.preventDefault();

    
   
   try{

    const productData= new FormData();

    productData.append("name",productDetails.name)
    productData.append("category",productDetails.category)
    productData.append("description",productDetails.description)
    productData.append("price",productDetails.price)
    productData.append("quantity",productDetails.quantity)
    productData.append("shipping",productDetails.shipping)
    productData.append("photo",photo)

    const res=await axios.post("http://localhost:5000/products/create-product",
    productData,{
      headers:{
        "authorization":auth.token
      }
    })


    if(res.data.success){
      toast.success(res.data.message)
      navigate("/dashboard/admin/products")
    }else{
      toast.error(res.data.message)
    }
    
    
   }catch(err){
    toast.error("something went wrong while creating a product")
   }
  
  };

  return (
    <Layout>
      <div className="container m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="container  w-65">
              <h2 className="form-group">Create a Product</h2>
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Enter Product Name"
                    name="name"
                    value={productDetails.name}
                    onChange={handleOnchange}
                  />
                </div>
                <div className="form-group">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="category"
                    value={productDetails.category}
                    onChange={handleOnchange}
                  >
                    <option selected value="">
                      Select Category
                    </option>
                    {categories?.map((e) => (
                      <>
                        <option key={e._id} value={e._id}>
                          {e.name}
                        </option>
                      </>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label
                    htmlFor="photo"
                    className="btn btn-outline-secondary col-md-12"
                  >
                    {photo ? photo.name : "Upload Photo"}
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      id="photo"
                      onChange={(e) => setPhoto(e.target.files[0])}
                      hidden
                    />
                  </label>
                </div>
                <div className="form-group">
                  {photo && (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="product_photo"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    placeholder="please enter the product description"
                    name="description"
                    value={productDetails.description}
                    onChange={handleOnchange}
                  ></textarea>
                </div>

                <div className="form-group">
                  <input
                    type="number"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Enter Product Price"
                    name="price"
                    value={productDetails.price}
                    onChange={handleOnchange}
                  />
                </div>

                <div className="form-group">
                  <input
                    type="number"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Enter Product Quantity"
                    name="quantity"
                    value={productDetails.quantity}
                    onChange={handleOnchange}
                  />
                </div>

                <div className="form-group">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="shipping"
                    value={productDetails.shipping}
                    onChange={handleOnchange}
                  >
                    <option selected value="">
                      Shipping
                    </option>
                    <option selected value="0">
                      No
                    </option>
                    <option selected value="1">
                      Yes
                    </option>
                  </select>
                </div>

                <div className="text-center m-10">
                  <button className="btn btn-primary" onClick={handleSubmit}>
                    Create Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;