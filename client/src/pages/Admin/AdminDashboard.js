import React from "react";
import Layout from "../../component/Layouts/Layout"
import AdminMenu from "./AdminMenu"
import {useAuth} from "../../context/auth"

const AdminDashboard = () => {
  const [auth]=useAuth();
  return (
    <Layout>

       < div className="container m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu/>
          </div>
          <div className="col-md-9">
          <div className="card w-100 p-3">
            <h3> Name:{auth?.user.name}</h3>
            <h3>Email:{auth?.user.email}</h3>
            <h3>Address:{auth?.user.address}</h3>

           </div>
          </div>
        </div>
      

      </div>
     
    </Layout>
  );
};

export default AdminDashboard;
