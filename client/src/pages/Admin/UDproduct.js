import React from "react";
import Layout from "../../component/Layouts/Layout";
import AdminMenu from "./AdminMenu";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";



const Updateproduct = () => {


  const navigate=useNavigate()
  const params=useParams()


  const [auth]=useAuth()
  const [categories, setCategories] = useState([]);
  const [productDetails, setProductDetails] = useState({
    category: "",
    name: "",
    quantity: "",
    price: "",
    description: "",
    shipping: "",
  });
  
  const [updatePhoto,setUpdatePhoto]=useState("")


  useEffect(() => {
    getProductDetails();
    getAllCategory();
    
    // eslint-disable-next-line
  }, [navigate]);



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





  //get product details


  const getProductDetails=async ()=>{
    const id=params.id;
    const slug=params.slug;

    const {data}=await axios.get(`http://localhost:5000/products/get-single-product/${slug}/${id}`)

    console.log(data)
    if(data.success){
      setProductDetails({
         category:data.product.category._id,
         name:data.product.name,
         quantity:data.product.quantity,
         price:data.product.price,
         description:data.product.description,
         shipping:data.product.shipping

      })
      
      
    }
  }








  
  // handleUpdate

  const handleUpadte = async(e) => {
    e.preventDefault();

   
   
   try{

    const productData= new FormData();

    productData.append("name",productDetails.name)
    productData.append("category",productDetails.category)
    productData.append("description",productDetails.description)
    productData.append("price",productDetails.price)
    productData.append("quantity",productDetails.quantity)
    productData.append("shipping",productDetails.shipping)
    productData.append("photo",updatePhoto)

    const {data}=await axios.put(`http://localhost:5000/products/update-product/${params.slug}/${params.id}`,
     productData,{
     headers:{
      "authorization":auth.token
     }
    })


    

  console.log(data)

    if(data.success){
      toast.success(data.message)
      
        navigate("/dashboard/admin/products")
     
      
    }else{
      toast.error(data.message)
    }
    
    
   }catch(err){
    toast.error("something went wrong while updating a product")
   }
  
  };




  //handleDelete


 const handleDelete = async(e) => {
    e.preventDefault();

   
   
   try{
  
     let answer=window.prompt("Do you want to delete product (yes/no)")
   if(answer==="yes"){
    const {data}=await axios.delete(`http://localhost:5000/products/delete-product/${params.slug}/${params.id}`,
    {
    headers:{
     "authorization":auth.token
    }
   })


   

 console.log(data)

   if(data.success){
     toast.success(data.message)
     navigate("/dashboard/admin/products")
   }else{
     toast.error(data.message)
   }
   
   
   }else{
   
   }

   
    
   }catch(err){
    toast.error("something went wrong while deleting a product")
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
            <h2 className="form-group">Update Product</h2>
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
                  {updatePhoto ? updatePhoto.name : "update photo"}
                  <input
                    type="file"
                    name="updatePhoto"
                    accept="image/*"
                    id="photo"
                    onChange={(e) => setUpdatePhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="form-group">
                {updatePhoto? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(updatePhoto)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ):(
                  <div className="text-center">
                  <img
                    src={`http://localhost:5000/products/product-photo/${params.id}`}
                    alt="product_photo"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>

                )
                }
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
                 
                  <option selected value={false}>
                    No
                  </option>
                  <option selected value={true}>
                    Yes
                  </option>
                </select>
              </div>

              <div className="text-center m-10">
                <button className="btn btn-primary m-1" onClick={handleUpadte}>
                  Update Product
                </button>
                <button className="btn btn-danger m-1" onClick={handleDelete}>
                  Delete Product
                </button>
                
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </Layout>
  )
};

export default Updateproduct;