import React from "react";
import Layout from "../../component/Layouts/Layout";
import AdminMenu from "./AdminMenu";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  // get all products

  const getAllProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/products/get-all-products"
      );

      if (res.data.success) {
        setProducts(res.data.products);
      }
    } catch (err) {
      toast.error("something went wrong in getting all products..");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="container m-1">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 ">
            <h3 className="text-center">All Products List</h3>
            <div className="d-flex flex-wrap">
              {products?.map((e) => (
                <Link
                  key={e._id}
                  className="product-link"
                  to={`/dashboard/admin/products/${e.slug}/${e._id}`}
                >
                  <div className="card m-2" style={{ width: "16rem", height:"400px" }}>
                    <img
                      src={`http://localhost:5000/products/product-photo/${e._id}`}
                      className="img-responsive"
                      alt={e.name}
                     
                    />
                    <div className="card-body">
                      <h6 className="card-title">Name: <b>{e.name.substring(0, 10)}</b></h6>
                      <p className="card-text">Description:</p>
                      
                      {e.description.substring(0, 60)}...
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
