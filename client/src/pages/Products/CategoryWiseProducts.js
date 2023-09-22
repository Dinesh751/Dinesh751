import React, { useState, useEffect } from "react";
import Layout from "../../component/Layouts/Layout";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../../context/Cart";
import toast from "react-hot-toast"

const CategoryWiseProducts = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useCart();

  useEffect(() => {
    getProductCategoryWise();
    // eslint-disable-next-line
  }, [params.id, params.slug]);

  const getProductCategoryWise = async () => {
    try {
      const { slug, cid } = params;

      const { data } = await axios.get(
        `http://localhost:5000/products/category/${slug}/${cid}`
      );
      setProducts(data.products);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="text-center m-3">
          <h3>Category-{params.slug}</h3>
        </div>
        <div className="text-center">
          {products.length < 1 ? "No products on this category" : ""}
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex flex-wrap">
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
                  />
                  <div className="card-body">
                    <h5 className="card-title">Name:{e.name}</h5>
                    <p className="card-text">Price:{e.price}</p>
                    <p className="card-text">
                      Description:{e.description.substring(0, 60)}....
                    </p>
                  </div>
                  <div className="d-flex  ">
                    <button
                      className="btn btn-primary m-1"
                      onClick={() => {
                        navigate(`/products/${e.slug}/${e._id}`);
                      }}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-secondary m-1"
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
      </div>
    </Layout>
  );
};

export default CategoryWiseProducts;