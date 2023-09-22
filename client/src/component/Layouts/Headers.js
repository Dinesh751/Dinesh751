import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { useAuth } from "../../context/auth";
import token from "react-hot-toast";
import axios from "axios";
import { useSearch } from "../../context/SearchProducts";
import { useCart } from "../../context/Cart";

const Header = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useSearch();
  const [auth, setAuth] = useAuth();
  const [categories, setCategories] = useState([]);
  const [cart]=useCart()

  useEffect(() => {
    getAllCategories();
    // eslint-disable-next-line
  }, []);

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    setTimeout(() => {
      token.success("Logout successfully...");
    }, 500);
  };

  const handleSearch = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/products/search/${search.keyword}`
      );

      setSearch({ ...search, results: data.products });
      navigate(`/products/search/${search.keyword}`);
    } catch (err) {
      console.log(err);
    }
  };

  // get All categories

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/category/get-category"
      );
      setCategories(data.allCategory);
    } catch (err) {
      console.log("something went wrong in getAllCategories", err);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand" to="/">
              {" "}
              <TiShoppingCart /> E-commerce App
            </Link>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <form className="d-flex mx-2" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search.keyword}
                  onChange={(e) => {
                    setSearch({ ...search, keyword: e.target.value });
                  }}
                />
                <button
                  className="btn btn-outline-success"
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSearch();
                  }}
                >
                  Search
                </button>
              </form>
              <li className="nav-item">
                <NavLink className="nav-link " aria-current="page" to="/">
                  Home
                </NavLink>
              </li>

              <li className="nav-item dropdown ">
                    <NavLink
                      className="nav-link dropdown-toggle "
                      to="/category"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                     categories
                    </NavLink>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    > <li>
                    <NavLink
                      className="dropdown-item"
                      to="/"
                    >
                     All Categories
                    </NavLink>
                   </li> 
                      {categories?.map((e)=>(
                           <li>
                           <NavLink
                             className="dropdown-item"
                             to={`/category/${
                               e.slug
                             }/${e._id}`}
                           >
                             {e.name}
                           </NavLink>
                          </li> 
                      ))}
                     
                     
                    </ul>
                  </li>
             
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown ">
                    <NavLink
                      className="nav-link dropdown-toggle "
                      to={`/dashboard/${
                        auth?.user.role === 1 ? "admin" : "user"
                      }`}
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {auth?.user.name}
                    </NavLink>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to={`/dashboard/${
                            auth?.user.role === 1 ? "admin" : "user"
                          }`}
                        >
                          dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item"
                          onClick={handleLogout}
                          to="/login"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item">
                <NavLink className="nav-link" to="/cart">
                  Cart({`${cart.length}`})
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;