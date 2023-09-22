import React, { useState } from "react";
import UserMenu from "./UserMenu";
import Layout from "../../component/Layouts/Layout";
import { useAuth } from "../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";

const Profile = () => {
 

  const [auth] = useAuth();

  const [credentials, setCredentials] = useState({
    name: auth.user.name,
    email: auth.user.email,
    password: "",
    phone: auth.user.phone,
    address: auth.user.address,
  });

  const Onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const Onsubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.put(
        "http://localhost:5000/auth/profile/update-profile",
        {
          name: credentials.name,
          phone: credentials.phone,
          address: credentials.address,
          password: credentials.password,
        },
        {
          headers: {
            authorization: auth.token,
          },
        }
      );
      if (res.data.success) {
        localStorage.setItem("auth", JSON.stringify(res.data));
      }

      if (res && res.data.success) {
        setTimeout(() => {
          toast.success(res.data && res.data.message);
        }, 500);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("something went wrong");
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
            <div className="form-container">
              <form>
                <h3 className="form title">Profile</h3>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter Your Name"
                    name="name"
                    value={credentials.name}
                    onChange={Onchange}
                    required
                  />
                </div>
                <div className="form-group ">
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Your Email"
                    name="email"
                    value={credentials.email}
                    onChange={Onchange}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    name="password"
                    value={credentials.password}
                    onChange={Onchange}
                    
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter Your Number"
                    name="phone"
                    value={credentials.phone}
                    onChange={Onchange}
                   
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter Your Address"
                    name="address"
                    value={credentials.address}
                    onChange={Onchange}
                   
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary button"
                    onClick={Onsubmit}
                  >
                    Update Profile
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

export default Profile;