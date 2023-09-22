import React from "react";
import Layout from "../../component/Layouts/Layout";
import AdminMenu from "./AdminMenu";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";

const AllUser = () => {
  const [users, setUsers] = useState([]);
  const [auth] = useAuth();

  useEffect(() => {
    getAllUsers();
     // eslint-disable-next-line 
  }, [auth.token]);

  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/auth/admin/all-users",
        {
          headers: {
            Authorization: auth.token,
          },
        }
      );
      if (data.success) {
        setUsers(data.allUsers);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const myArray = (address) => {
    const array = address.split(",");
    return array[0];
  };
  return (
    <Layout>
      <div className=" m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-100 p-3">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Id</th>
                    <th scope="col">Contact Details</th>

                    <th scope="col">Address</th>
                  </tr>
                </thead>
                <tbody className="overflow-auto">
                  {users &&
                    users.map((user, i) => (
                      <tr key={user._id}>
                        <th scope="row">{i + 1}</th>
                        <td>{user.name}</td>
                        <td>{user._id}</td>
                        <td>{user.phone}</td>

                        <td>{myArray(user.address)}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllUser;