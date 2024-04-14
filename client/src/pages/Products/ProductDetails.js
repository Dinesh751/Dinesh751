import React, { useState, useEffect } from "react";
import Layout from "../../component/Layouts/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/Cart";
import toast from "react-hot-toast"

const ProductDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { slug, id } = params;
  const [product, setProduct] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [cart, setCart] = useCart();

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line
  }, [id]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/products/get-single-product/${slug}/${id}`
      );
      setProduct(data.product);
      getSimilarProducts(data.product.category._id, data.product._id);
    } catch (err) {
      console.log(err);
    }
  };

  const getSimilarProducts = async (cid, pid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/products/similar-product/${cid}/${pid}`
      );
      setSimilarProducts(data.similarProducts);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div
            className="col-md-6"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "80vh",
            }}
          >
            <img
              src={`http://localhost:5000/products/product-photo/${id}`}
              className="card-img-top"
              alt={slug}
              style={{ height: "75%" }}
            />
          </div>
          <div className="col-md-6">
            <h2 className="text-center m-2">Product Details</h2>

            <div
              className="card m-2"
              key={product._id}
              style={{ border: "none" }}
            >
              <div className="card-body">
                <h5 className="card-title">Name: <b>{product?.name}</b> </h5>
                <p className="card-text">Price: <b>${product?.price}</b></p>
                <p className="card-text">Category: <b>{product?.category?.name}</b></p>
                <p className="card-text">
                  Description: 
                </p>
                {product?.description}
              </div>
            </div>
            <div className="text-center  ">
              <button
                className="btn btn-warning m-1"
                onClick={() => {
                  setCart([...cart, product]);
                }}
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <h3>similar Products</h3>
          <div className="text-center">
            {similarProducts.length < 1 ? "No similar product found" : ""}
          </div>
          <div
            className="d-flex flex-wrap"
            style={{ justifyContent: "center" }}
          >
            {similarProducts?.map((e) => (
              <div className="card m-2" style={{ width: "18rem" }} key={e._id}>
                <img
                  src={`http://localhost:5000/products/product-photo/${e._id}`}
                  className="card-img-top"
                  alt={e.name}
                />
                <div className="card-body">
                  <h5 className="card-title">Name: <b>{e.name}</b></h5>
                  <p className="card-text">Price: <b>{e.price}</b></p>
                  <p className="card-text">
                    Description:
                  </p>
                  {e.description.substring(0, 60)}....
                </div>
                <div className="d-flex flex-column ">
                  <button
                    className="btn btn-secondary m-1"
                    onClick={() => {
                      navigate(`/products/${e.slug}/${e._id}`);
                    }}
                  >
                    More Details
                  </button>
                  <button
                    className="btn btn-warning m-1"
                    onClick={() => {
                      setCart([...cart, e]);

                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, e])
                      );

                      toast.success("Item added successfully");
                    }}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;