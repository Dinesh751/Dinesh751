import React from "react";
import Layout from "../../component/Layouts/Layout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    answer: "",
  });

  const Onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const Onsubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post("http://localhost:5000/auth/register", {
        name: credentials.name,
        email: credentials.email,
        phone: credentials.phone,
        address: credentials.address,
        password: credentials.password,
        answer: credentials.answer,
      });
      console.log(res);

      if (res && res.data.success) {
        setTimeout(() => {
          toast.success(res.data && res.data.message);
        }, 500);

        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("something went wrong");
    }
  };

  return (
    <>
      <Layout>
        <div className="form-container">
          <form>
            <h3 className="form title">Register form</h3>
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
                required
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
                required
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
                required
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
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter Your favorite sport"
                name="answer"
                value={credentials.answer}
                onChange={Onchange}
                required
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary button"
                onClick={Onsubmit}
                disabled={
                  credentials.name === "" ||
                  credentials.email === "" ||
                  credentials.phone === "" ||
                  credentials.address === "" ||
                  credentials.password === "" ||
                  credentials.answer === ""
                }
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Register;
